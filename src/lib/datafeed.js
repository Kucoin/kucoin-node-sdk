const _ = require('lodash');
const Http = require('./http');
const WebSocket = require('ws');
const EventEmitter = require('event-emitter');
const EventAllOff = require('event-emitter/all-off');

const loop = () => {};
const generateId = () => '_e_' + Date.now() + (Math.random() * 365).toString(16).slice(4,14) + 'kc';
const getTopicPrefix = topic => topic.split(':')[0];
// const log = (...args) => {
//   console.log(...args);
// };
const log = loop;

/*
// DEMO:

const datafeed = new Datafeed();
datafeed.connectSocket();
datafeed.onClose(() => {
  log('ws closed, status ', datafeed.trustConnected);
});

const topic = `/market/ticker:BTC-USDT`;
datafeed.subscribe(topic, (message) => {
  if (message.topic === topic) {
    log(message.data);
  }
});
*/

/**
 * Datafeed connect/subscribe manager
 */
class Datafeed {
  constructor(privateBullet = false) {
    /** public */
    // use private bullet link
    this.privateBullet = !!privateBullet;
    // real connected status
    this.trustConnected = false;
    // ws client instance
    this.client = null;
    // data emitter
    this.emitter = new EventEmitter();
    // topic state record
    this.topicState = [];
    // topic listener record
    this.topicListener = {
      // topicPrefix => [...hooks],
    };
    // subscribed id, auto inc
    this.incrementSubscribeId = 0;
    // ping delay ms
    this.ping = 0;

    /** private */
    // is connecting
    this._connecting = false;
    // on close callback record
    this._onClose = [];
    // max client id
    this._maxId = 0;
    // ping ts record
    this._pingTs = null;

    /** bind function */
    this.connectSocket = this.connectSocket.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.onClose = this.onClose.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._distribute = this._distribute.bind(this);
    this._handleAfterConnect = this._handleAfterConnect.bind(this);
    this._connect = this._connect.bind(this);
    this._getBulletToken = this._getBulletToken.bind(this);
    this._sub = this._sub.bind(this);
    this._unsub = this._unsub.bind(this);
    this._clearPing = this._clearPing.bind(this);
    this._ping = this._ping.bind(this);
  }

  async connectSocket() {
    if (this.trustConnected) {
      log('ws conn status: ', this.trustConnected);
      return;
    }
    if (this._connecting) {
      log('ws is connecting, return');
      return;
    }
    this._connecting = true;
    this._clearPing();

    // clear all event
    EventAllOff(this.emitter);

    const config = await this._getBulletToken();
    if (!config) {
      log('getPubToken config invalid');

      // try to reconnect
      _.delay(() => {
        this._connecting = false;
        this.connectSocket();
      }, 3000);
      return;
    }
    // log('getPubToken config: ', config);
    log('getPubToken config');

    const connectId = generateId();
    log('generate connectId: ', connectId);

    this.emitter.on(`welcome_${connectId}`, this._handleAfterConnect);
    log('waiting welcome ack...');

    const cl = await this._connect({
      server: config.data,
      connectId,
    });

    cl.onopen = () => {
      // ws.send('foo');
      log('socket connect opend', this._maxId, cl._maxId);
      this.client = cl;
    };

    cl.onmessage = (evt) => {
      if (!evt.data) {
        log('invalid message');
        return;
      }
      let message = null;
      try {
        log('parse: ', evt.data, this._maxId, cl._maxId);
        message = JSON.parse(evt.data);
      } catch (e) {
        log('parse message error');
        console.error(e);
      }
      if (!message) {
        return;
      }

      const { id, type } = message;
      switch(type) {
        case 'welcome':
        case 'ack':
        case 'pong':
          // log(`emit: welcome_${id}`);
          this.emitter.emit(`${type}_${id}`);
          break;
        case 'message':
          // message recieve
          this._distribute(message);
          break;
        case 'ping':
        default:
          log('unhandle message', evt.data);
          break;
      }
    };

    cl.onerror = (e) => {
      log('socket connect onerror', this._maxId, cl._maxId, e.message);
    }

    cl.onclose = () => {
      log('socket connect closed', this._maxId, cl._maxId);
      this._handleClose();

      // try to reconnect
      _.delay(() => {
        this._connecting = false;
        this.connectSocket();
      }, 3000);
    };
  }

  _handleClose() {
    this.trustConnected = false;
    this.ping = 0;

    // on close
    _.each(this._onClose, (fn) => {
      if (typeof fn === 'function') {
        fn();
      }
    });
  }

  /**
   * @name onClose
   * @description register close callback
   * @param {function} callback onClose callback function
   */
  onClose(callback) {
    if (typeof callback === 'function') {
      this._onClose.push(callback);
    }
    return this;
  };

  /**
   * @name subscribe
   * @description subscribe topic and register data callback
   * @param {string} topic 
   * @param {function} hook data callback
   * @param {boolean} _private is topic push private data
   * @returns {string} hookId is subscribed listener id
   */
  subscribe(topic, hook = loop, _private = false) {
    this.incrementSubscribeId += 1;
    if (this.incrementSubscribeId > 1e8) {
      this.incrementSubscribeId = 0;
    }

    const hookId = this.incrementSubscribeId;
    const listener = { hook, id: hookId };
    const prefix = getTopicPrefix(topic);
    if (this.topicListener[prefix]) {
      this.topicListener[prefix].push(listener);
    } else {
      this.topicListener[prefix] = [listener];
    }
    log('subscribed listener');

    const find = this.topicState.filter(item => item[0] === topic);
    if (find.length === 0) {
      log(`topic new subscribe: ${topic}`);
      this.topicState.push([topic, _private]);
      this._sub(topic, _private);
    } else {
      log(`topic already subscribed: ${topic}`);
    }

    log('subscribed listener id ', hookId);
    return hookId;
  }

  /**
   * @name unsubscribe
   * @description unsubscribe an topic by hookId
   * @param {string} topic
   * @param {string} hookId subscribed listener id
   * @param {boolean} _private is close topic that push private data
   */
  unsubscribe(topic, hookId, _private = false) {
    const prefix = getTopicPrefix(topic);
    if (this.topicListener[prefix]) {
      const deleted = this.topicListener[prefix].filter(item => item.id !== hookId);
      if (deleted.length === 0) {
        delete this.topicListener[prefix];
      } else {
        this.topicListener[prefix] = deleted;
      }
    }
    log('unsubscribed listener id ', hookId);

    this.topicState = this.topicState.filter(record => record[0] !== topic);
    this._unsub(topic, _private);
  }

  _distribute(message) {
    const { topic } = message;
    if (topic) {
      const prefix = getTopicPrefix(topic);
      const listeners = this.topicListener[prefix];
      if (listeners) {
        _.each(listeners, ({ hook }) => {
          if (typeof hook === 'function') {
            hook(message);
          }
        });
      }
    }
  }

  _handleAfterConnect() {
    log('recieved connect welcome ack');
    this.trustConnected = true;
    this._connecting = false;

    // resub
    _.each(this.topicState, ([topic, _private]) => {
      this._sub(topic, _private);
    });

    // restart ping
    this._ping();
  }

  async _connect(config) {
    const server = config.server;
    const connectId = config.connectId;
    const {
      instanceServers,
      token,
    } = server;
    // acceptUserMessage is false, don't auto subscribe private topic
    const url = `${instanceServers[0].endpoint}?token=${token}&acceptUserMessage=false&connectId=${connectId}`;
    this._maxId += 1;
    if (this._maxId > 1e8) {
      this._maxId = 0;
    }
    const client = new WebSocket(url, {
      handshakeTimeout: 30000,
    });
    client._maxId = this._maxId;
    return client;
  }

  async _getBulletToken() {
    let res = false;
    try {
      res = await Http().POST(
        this.privateBullet ?
            '/api/v1/bullet-private' :
            '/api/v1/bullet-public'
      );
    } catch (e) {
      log('get bullet error', e);
    }
    return res;
  }

  _sub(topic, _private = false) {
    if (!this.trustConnected) {
      log('client not connected');
      return;
    }

    const id = generateId();
    this.emitter.once(`ack_${id}`, () => {
      log(`topic: ${topic} subscribed`, id);
    });

    this.client.send(JSON.stringify({
      id,
      type: 'subscribe',
      topic,
      private: _private,
      privateChannel: _private,
      response: true
    }));
    log(`topic subscribe: ${topic}, send`, id);
  }

  _unsub(topic, _private = false) {
    if (!this.trustConnected) {
      log('client not connected');
      return;
    }

    const id = generateId();
    this.emitter.once(`ack_${id}`, () => {
      log(`topic: ${topic} unsubscribed`, id);
    });

    this.client.send(JSON.stringify({
      id,
      type: 'unsubscribe',
      topic,
      private: _private,
      privateChannel: _private,
    }));
    log(`topic unsubscribe: ${topic}, send`, id);
  }

  _clearPing() {
    if (this._pingTs) {
      clearInterval(this._pingTs);
      this._pingTs = null;
    }
  }

  _ping() {
    this._clearPing();

    this._pingTs = setInterval(() => {
      if (!this.trustConnected) {
        log('client not connected');
        return;
      }
      const id = generateId();

      // ping timeout
      const timer = setTimeout(() => {
        log('ping wait pong timeout');
        this._clearPing();

        if (this.client) {
          this.client.terminate();
          this.client = null;
        }
      }, 5000);

      // calc ping ms
      const pingPerform = Date.now(); 
      this.emitter.once(`pong_${id}`, () => {
        this.ping = Date.now() - pingPerform;
        log('ping get pong');
        clearTimeout(timer);
      });

      this.client.send(JSON.stringify({
        id,
        type: 'ping',
      }));
      log('ping, send');
    }, 10000);
  }
}

module.exports = Datafeed;
