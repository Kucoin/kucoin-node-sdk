const API = require('../src');
const { klineTopics }  = require('./constants')
API.init(require('./config'));

const datafeed = new API.websocket.Datafeed();

// close callback
datafeed.onClose(() => {
  console.log('ws closed, status ', datafeed.trustConnected);
});

// connect
datafeed.connectSocket();

/**
 * @name klineTopics.klines
 * @description Subscribe to this topic to get K-Line data.
 * - {String} symbol symbol
 * - {String} type 1min, 3min, 15min, 30min, 1hour, 2hour, 4hour, 6hour, 8hour, 12hour, 1day, 1week
 * @updateTime 
 * @return {Object} 
 * {
    "type":"message",
    "topic":"/market/candles:BTC-USDT_1hour",
    "subject":"trade.candles.update",
    "data":{
        "symbol":"BTC-USDT",    // symbol
        "candles":[
            "1589968800",   // Start time of the candle cycle
            "9786.9",       // open price
            "9740.8",       // close price
            "9806.1",       // high price
            "9732",         // low price
            "27.45649579",  // Transaction volume
            "268280.09830877"   // Transaction amount
        ],
        "time":1589970010253893337  // now（us）
    }
}
 */ 
const callbackId = datafeed.subscribe(klineTopics.klines, (message) => {
  if (message.topic === klineTopics.klines) {
    console.log(message.data);
  }
});


//////////////////////////////cancel subscribe//////////////////////////////////////
setTimeout(() => {
  // unsubscribe-klines
  datafeed.unsubscribe(klineTopics.klines, callbackId);
  console.log(`unsubscribed: ${klineTopics.klines} ${callbackId}`);  
  
}, 5000);
