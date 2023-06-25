const API = require('../src');
const { matchTopics }  = require('./constants')
API.init(require('./config'));

const datafeed = new API.websocket.Datafeed();

// close callback
datafeed.onClose(() => {
  console.log('ws closed, status ', datafeed.trustConnected);
});

// connect
datafeed.connectSocket();

/**
 * @name matchTopics.matchExecutionData ***
 * @description Subscribe to this topic to get the matching event data flow of Level 3.
 * @updateTime 
 * @return {Object} 
 * {
    "type":"message",
    "topic":"/market/match:BTC-USDT",
    "subject":"trade.l3match",
    "data":{
        "sequence":"1545896669145",
        "type":"match",
        "symbol":"BTC-USDT",
        "side":"buy",
        "price":"0.08200000000000000000",
        "size":"0.01022222000000000000",
        "tradeId":"5c24c5da03aa673885cd67aa",
        "takerOrderId":"5c24c5d903aa6772d55b371e",
        "makerOrderId":"5c2187d003aa677bd09d5c93",
        "time":"1545913818099033203"
    }
}
 */ 
const callbackId = datafeed.subscribe(matchTopics.matchExecutionData, (message) => {
  if (message.topic === matchTopics.matchExecutionData) {
    console.log(message.data);
  }
});


//////////////////////////////cancel subscribe//////////////////////////////////////
setTimeout(() => {
  // unsubscribe-matchExecutionData
  datafeed.unsubscribe(matchTopics.matchExecutionData, callbackId);
  console.log(`unsubscribed: ${matchTopics.matchExecutionData} ${callbackId}`);  
  
}, 5000);
