const API = require('../src');
const { tickerTopics }  = require('./constants')
API.init(require('./config'));

const datafeed = new API.websocket.Datafeed();

// close callback
datafeed.onClose(() => {
  console.log('ws closed, status ', datafeed.trustConnected);
});

// connect
datafeed.connectSocket();

/**
 * @name tickerTopics.symbolTicker
 * @description Subscribe to this topic to get the push of BBO changes.
 * @updateTime 
 * @return {Object} 
 * {
    "type":"message",
    "topic":"/market/ticker:BTC-USDT",
    "subject":"trade.ticker",
    "data":{
        "sequence":"1545896668986", // Sequence number
        "price":"0.08",             // Last traded price
        "size":"0.011",             //  Last traded amount
        "bestAsk":"0.08",          // Best ask price
        "bestAskSize":"0.18",      // Best ask size
        "bestBid":"0.049",         // Best bid price
        "bestBidSize":"0.036"     // Best bid size
    }
}
 */ 
const callbackId = datafeed.subscribe(tickerTopics.symbolTicker, (message) => {
  if (message.topic === tickerTopics.symbolTicker) {
    console.log(message.data);
  }
});

/**
 * @name tickerTopics.allSymbolsTicker
 * @description Subscribe to this topic to get the push of all market symbols BBO change.
 * @updateTime 
 * @return {Object} 
 * {
    "type":"message",
    "topic":"/market/ticker:all",
    "subject":"BTC-USDT",
    "data":{
        "sequence":"1545896668986",
        "bestAsk":"0.08",
        "size":"0.011",
        "bestBidSize":"0.036",
        "price":"0.08",
        "bestAskSize":"0.18",
        "bestBid":"0.049"
    }
}
 */ 
const callbackId1 = datafeed.subscribe(tickerTopics.allSymbolsTicker, (message) => {
  if (message.topic === tickerTopics.allSymbolsTicker) {
    console.log(message.data);
  }
});

console.log(`subscribe id: ${callbackId1}`);

//////////////////////////////cancel subscribe//////////////////////////////////////
setTimeout(() => {
  // unsubscribe-symbolTicker
  datafeed.unsubscribe(tickerTopics.symbolTicker, callbackId);
  console.log(`unsubscribed: ${tickerTopics.symbolTicker} ${callbackId}`);  
  // unsubscribe-allSymbolsTicker
  datafeed.unsubscribe(tickerTopics.allSymbolsTicker, callbackId1);
  console.log(`unsubscribed: ${tickerTopics.allSymbolsTicker} ${callbackId1}`);  
}, 5000);
