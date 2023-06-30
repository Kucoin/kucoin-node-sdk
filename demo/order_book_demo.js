const API = require('../src');
const { orderBookTopics }  = require('./constants')
API.init(require('./config'));

const datafeed = new API.websocket.Datafeed();

// close callback
datafeed.onClose(() => {
  console.log('ws closed, status ', datafeed.trustConnected);
});

// connect
datafeed.connectSocket();

/**
 * @name orderBookTopics.orderBookChange
 * @description Subscribe to this topic to get the order book changes on margin trade.
 * @updateTime 
 * @return {Object} 
 * {
    "id": "5c24c5da03aa673885cd67ab",
      "type": "message",
      "topic": "/margin/fundingBook:BTC",
      "subject": "funding.update",
      "data": {

            "sequence": 1000000,       //Sequence number
            "currency": "BTC",         //Currency
            "dailyIntRate": "0.00007",   //Daily interest rate. e.g. 0.002 is 0.2%
            "annualIntRate": "0.12",     //Annual interest rate. e.g. 0.12 is 12%
            "term": 7,                 //Term (Unit: Day)    
            "size": "1017.5",            //Current total size. When this value is 0, remove this record from the order book.
            "side": "lend",            //Lend or borrow. Currently, only "Lend" is available
            "ts": 1553846081210004941  //Timestamp (nanosecond)
    }
}
 */ 
const callbackId = datafeed.subscribe(orderBookTopics.orderBookChange, (message) => {
  if (message.topic === orderBookTopics.orderBookChange) {
    console.log(message.data);
  }
});


//////////////////////////////cancel subscribe//////////////////////////////////////
setTimeout(() => {
  // unsubscribe-orderBookChange
  datafeed.unsubscribe(orderBookTopics.orderBookChange, callbackId);
  console.log(`unsubscribed: ${orderBookTopics.orderBookChange} ${callbackId}`);  
  
}, 5000);
