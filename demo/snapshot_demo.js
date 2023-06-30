const API = require('../src');
const { snapShotsTopics }  = require('./constants')
API.init(require('./config'));

// ws demo
const datafeed = new API.websocket.Datafeed();

// close callback
datafeed.onClose(() => {
  console.log('ws closed, status ', datafeed.trustConnected);
});

// connect
datafeed.connectSocket();

/**
 * @name snapShotsTopics.symbolSnapshot
 * @description Subscribe to get snapshot data for a single symbol.
 * @updateTime 
 * @return {Object} 
 * {
    "type": "message",
    "topic": "/market/snapshot:KCS-BTC",
    "subject": "trade.snapshot",
    "data": {
        "sequence": "1545896669291",
        "data": {
            "trading": true,
            "symbol": "KCS-BTC",
            "buy": 0.00011,
            "sell": 0.00012,
            "sort": 100,    //sorting number
            "volValue": 3.13851792584,   //total
            "baseCurrency": "KCS",
            "market": "BTC",
            "quoteCurrency": "BTC",
            "symbolCode": "KCS-BTC",
            "datetime": 1548388122031,
            "high": 0.00013,
            "vol": 27514.34842,
            "low": 0.0001,
            "changePrice": -1.0e-5,
            "changeRate": -0.0769,
            "lastTradedPrice": 0.00012,
            "board": 0,     //Trading pair partition： 0.primary partition 1.KuCoin Plus", example = "1"
            "mark": 0       //Trading Pair Mark： 0.default 1.ST. 2.NEW", example = "1"
        }
    }
}
 */ 
const callbackId = datafeed.subscribe(snapShotsTopics.symbolSnapshot, (message) => {
  if (message.topic === snapShotsTopics.symbolSnapshot) {
    console.log(message.data);
  }
});

/**
 * @name snapShots.marketSnapshot
 * @description Subscribe this topic to get the snapshot data of for the entire market.
 * @updateTime 
 * @return {Object} 
 * {
    "type": "message",
    "topic": "/market/snapshot:BTC",
    "subject": "trade.snapshot",
    "data": {
        "sequence": "1545896669291",
        "data": [
            {
                "trading": true,
                "symbol": "KCS-BTC",
                "buy": 0.00011,
                "sell": 0.00012,
                "sort": 100,    //sorting number
                "volValue": 3.13851792584,
                "baseCurrency": "KCS",
                "market": "BTC",
                "quoteCurrency": "BTC",
                "symbolCode": "KCS-BTC",
                "datetime": 1548388122031,
                "high": 0.00013,
                "vol": 27514.34842,
                "low": 0.0001,
                "changePrice": -1.0e-5,
                "changeRate": -0.0769,
                "lastTradedPrice": 0.00012,
                "board": 0,     //Trading pair partition： 0.primary partition 1.KuCoin Plus", example = "1"
                "mark": 0       //Trading Pair Mark： 0.default 1.ST. 2.NEW", example = "1"
          }
       ]
    }
}
 */ 
const callbackId1 = datafeed.subscribe(snapShotsTopics.marketSnapshot, (message) => {
  if (message.topic === snapShotsTopics.marketSnapshot) {
    console.log(message.data);
  }
});

//////////////////////////////cancel subscribe//////////////////////////////////////
setTimeout(() => {
  // unsubscribe-symbolSnapshot
  datafeed.unsubscribe(snapShotsTopics.symbolSnapshot, callbackId);
  console.log(`unsubscribed: ${snapShotsTopics.symbolSnapshot} ${callbackId}`);  

  // unsubscribe-marketSnapshot
  datafeed.unsubscribe(snapShotsTopics.marketSnapshot, callbackId1);
  console.log(`unsubscribed: ${snapShotsTopics.marketSnapshot} ${callbackId1}`);  
}, 5000);
