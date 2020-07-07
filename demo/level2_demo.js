const _ = require('lodash');
const logUpdate = require('log-update');
const API = require('../src');

const config = require('./config');
API.init({
  ...config,
  baseUrl: 'https://api.kucoin.io',
});

// ws demo
const datafeed = new API.websocket.Datafeed();

/*
// close callback
datafeed.onClose(() => {
  console.log('ws closed, status ', datafeed.trustConnected);
});

// connect
datafeed.connectSocket();

// subscribe
const topic = `/market/level2:BTC-USDT`;
const callbackId = datafeed.subscribe(topic, (message) => {
  if (message.topic === topic) {
    console.log(JSON.stringify(message.data));
  }
});

console.log(`subscribe id: ${callbackId}`);
setTimeout(() => {
  // unsubscribe
  datafeed.unsubscribe(topic, callbackId);
  console.log(`unsubscribed: ${topic} ${callbackId}`);  
}, 5000);
*/

const { Level2 } = API.websocket;

Level2.setLogger(() => {});

const l2 = new Level2('BTC-USDT', datafeed);
l2.listen();

const interval = setInterval(async () => {
  // read orderbook
  const orderbook = l2.getOrderBook(5);

  // show Level2
  let asksStr = '';
  _.eachRight(orderbook.asks, ([price, size]) => {
    asksStr += `${price} -> ${size}\n`;
  });

  let bidsStr = '';
  _.each(orderbook.bids, ([price, size]) => {
    bidsStr += `${price} -> ${size}\n`;
  });

  logUpdate.clear();
  logUpdate(`------------------------\n` +
    `l2 ${orderbook.dirty ? 'Dirty Data' : 'Trust Data'}\n` +
    `l2 seq:  ${orderbook.sequence}\n` +
    `ping:    ${orderbook.ping} (ms)\n` +
    `------------------------\n` +
    `${asksStr}----------sep-----------\n` +
    `${bidsStr}------------------------`
  );
}, 200);
