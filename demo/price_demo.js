const API = require('../src');
const { priceTopics }  = require('./constants')
API.init(require('./config'));

const datafeed = new API.websocket.Datafeed();

// close callback
datafeed.onClose(() => {
  console.log('ws closed, status ', datafeed.trustConnected);
});

// connect
datafeed.connectSocket();

/**
 * @name priceTopics.indexPrice
 * @description Subscribe to this topic to get the index price for the margin trading.
 * @updateTime 
 * @return {Object} 
 * {
    "id":"5c24c5da03aa673885cd67a0",
    "type":"message",
    "topic":"/indicator/index:USDT-BTC",
    "subject":"tick",
    "data":{
        "symbol": "USDT-BTC",
        "granularity": 5000,
        "timestamp": 1551770400000,
        "value": 0.0001092
    }
}
 */ 
const callbackId = datafeed.subscribe(priceTopics.indexPrice, (message) => {
  if (message.topic === priceTopics.indexPrice) {
    console.log(message.data);
  }
});


/**
 * @name priceTopics.markPrice
 * @description Subscribe to this topic to get the mark price for margin trading.
 * @updateTime 
 * @return {Object} 
 * {
    "id":"5c24c5da03aa673885cd67aa",
    "type":"message",
    "topic":"/indicator/markPrice:USDT-BTC",
    "subject":"tick",
    "data":{
        "symbol": "USDT-BTC",
        "granularity": 5000,
        "timestamp": 1551770400000,
        "value": 0.0001093
    }
}
 */ 
const callbackId1 = datafeed.subscribe(priceTopics.markPrice, (message) => {
  if (message.topic === priceTopics.markPrice) {
    console.log(message.data);
  }
});


//////////////////////////////cancel subscribe//////////////////////////////////////
setTimeout(() => {
  // unsubscribe-indexPrice
  datafeed.unsubscribe(priceTopics.indexPrice, callbackId);
  console.log(`unsubscribed: ${priceTopics.indexPrice} ${callbackId}`);  

  // unsubscribe-markPrice
  datafeed.unsubscribe(priceTopics.markPrice, callbackId1);
  console.log(`unsubscribed: ${priceTopics.markPrice} ${callbackId1}`);  
  
}, 5000);
