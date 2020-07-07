const _ = require('lodash');
const Datafeed = require('../lib/datafeed');
const Http = require('../lib/http');
const delay = require('../lib/delay');
const {
  checkL2BufferContinue,
  mapArr,
  arrMap,
} = require('../lib/utils');
const OrderBook = require('../rest/Market/OrderBook');

let log = (...args) => { console.log(...args); };
const changeTypes = ['asks', 'bids'];

class Level2 {
  constructor(symbol, datafeed) {
    this.buffer = [];
    this.fullSnapshot = {
      dirty: true,
      sequence: 0,
      asks: {},
      bids: {},
    };
    this.messageEventCallback = null;

    this.symbol = symbol;
    if (datafeed instanceof Datafeed) {
      this.datafeed = datafeed;
    } else {
      this.datafeed = new Datafeed();
    }

    /** private */
    this._rebuilding = false;

    /** bind functions */
    this.bufferMessage = this.bufferMessage.bind(this);
    this.getFilteredBuffer = this.getFilteredBuffer.bind(this);
    this.rebuild = this.rebuild.bind(this);
    this.fetch = this.fetch.bind(this);
    this.updateFullByMessage = this.updateFullByMessage.bind(this);
    this.listen = this.listen.bind(this);
    this.handleMessageEvent = this.handleMessageEvent.bind(this);
    this.getOrderBook = this.getOrderBook.bind(this);
  }

  /**
   * @name setLogger
   * @description set level2 mod log
   * @param {function} fn 
   */
  static setLogger(fn) {
    if (typeof fn === 'function') {
      log = fn;
    }
  }

  bufferMessage(message) {
    const { sequenceStart, sequenceEnd, changes } = message || {};
    if (sequenceStart && sequenceEnd && changes) {
      const lastSeq = this.fullSnapshot.sequence;
      // log('check', sequenceStart, lastSeq);
      if (this.fullSnapshot.dirty === false && sequenceStart === lastSeq + 1) {
        // update
        this.updateFullByMessage(message);
      } else {
        this.buffer.push(message);
        // rebuild
        this.rebuild();
      }
    }
  }

  getFilteredBuffer(lastSeq) {
    const seq = lastSeq + 1;
    const buffer = this.buffer.filter((message) => {
      const { sequenceStart, sequenceEnd, changes } = message || {};
      return (sequenceStart <= seq && sequenceEnd >= seq) || sequenceStart >= seq;
    });
    // console.log(buffer);

    // check changes seq
    if(buffer[0]) {
      const { sequenceStart, sequenceEnd, symbol, changes } = buffer[0];
      const { asks, bids } = changes;

      const fAsks = asks.filter(item => +item[2] == seq);
      const fBids = bids.filter(item => +item[2] == seq);
      if (!fAsks[0] && !fBids[0]) {
        return [];
      }

      buffer[0] = {
        sequenceStart: seq,
        sequenceEnd,
        symbol,
        changes: {
          asks: asks.filter(item => +item[2] >= seq),
          bids: bids.filter(item => +item[2] >= seq),
        },
      }
    }

    return buffer;
  }

  async rebuild() {
    if (this._rebuilding) {
      log('rebuilding dirty level2, return',
          this.fullSnapshot.sequence,
          this.buffer.length && this.buffer[this.buffer.length - 1].sequenceEnd,
      );
      return;
    }
    log('build dirty level2');
    this._rebuilding = true;
    this.fullSnapshot.dirty = true;

    await delay(5000);
    const fetchSuccess = await this.fetch();
    const lastSeq = this.fullSnapshot.sequence;

    if (fetchSuccess && this.datafeed.trustConnected) {
      const bufferArr = this.getFilteredBuffer(lastSeq);
      // if (bufferArr.length === 0 && this.buffer.length > 0) {
      //   console.log('snapshot before', lastSeq, this.buffer[this.buffer.length - 1].sequenceEnd);
      // }

      if (bufferArr.length > 0 ||
        (bufferArr.length === 0 && this.buffer.length === 0) ||
        (bufferArr.length === 0 && (lastSeq === this.buffer[this.buffer.length - 1].sequenceEnd))
      ) {
        const continu = checkL2BufferContinue(bufferArr, lastSeq);
        if (continu) {
          log('lastSeq & len', this.fullSnapshot.sequence, bufferArr.length, this.buffer.length);
          _.each(bufferArr, (item) => {
            // update
            this.updateFullByMessage(item);
          });
          this.fullSnapshot.dirty = false;
          this.buffer = [];
          log('level2 checked');
        } else {
          log('level2 buffer is not continue with snapshot');
        }
      }
    }
    this._rebuilding = false;
  }

  async fetch() {
    /*
    {
      code: '200000',
      data: {
        sequence: 75017803,
        asks: [],
        bids: [],
      }
    }
    */
    let fetchSuccess = false;
    try {
      const result = await OrderBook.getLevel2_full(this.symbol);
      // console.log(result);
      if (result.code === '200000' && result.data) {
        const { sequence, asks, bids } = result.data;

        this.fullSnapshot.dirty = true;
        this.fullSnapshot.sequence = +sequence;
        this.fullSnapshot.asks = mapArr(asks);
        this.fullSnapshot.bids = mapArr(bids);
        fetchSuccess = true;
      }
    } catch (e) {
      log('fetch level2 error', e);
    }
    return fetchSuccess;
  }

  updateFullByMessage(message) {
    const { sequenceStart, sequenceEnd, changes } = message || {};
    // const [sequence, price, type, size] = message;
    
    _.each(changes, (arr, targetType) => {
      if (_.indexOf(changeTypes, targetType) > -1) {
        _.each(arr, (item) => {
          const [price, size, sequence] = item;
          if (size == 0) {
            delete this.fullSnapshot[targetType][price];
          } else {
            this.fullSnapshot[targetType][price] = size;
          }
          this.fullSnapshot.sequence = +sequence;
        });
      }
    });
    this.fullSnapshot.sequence = +sequenceEnd;
    
    // callback message
    if (typeof this.messageEventCallback === 'function') {
      this.messageEventCallback(message);
    }
  }

  /** public */
  listen() {
    this.datafeed.connectSocket();
    this.datafeed.onClose(() => {
      log('ws closed, status ', this.datafeed.trustConnected);
      this.rebuild();
    });

    const topic = `/market/level2:${this.symbol}`;
    this.datafeed.subscribe(topic, (message) => {
      if (message.topic === topic) {
        // log(message.data);
        this.bufferMessage(message.data);
      }
    });
    this.rebuild();
  }

  // message event handler
  handleMessageEvent(callback) {
    if (typeof callback === 'function') {
      this.messageEventCallback = callback;
    }
  }

  getOrderBook(limit = 10) {
    const dirty = this.fullSnapshot.dirty;
    const sequence = this.fullSnapshot.sequence;
    const asks = arrMap(this.fullSnapshot.asks, 'asc').slice(0, limit);
    const bids = arrMap(this.fullSnapshot.bids, 'desc').slice(0, limit);
    const ping = this.datafeed.ping;

    return {
      dirty,
      sequence,
      asks,
      bids,
      ping,
    };
  }
}

module.exports = Level2;
