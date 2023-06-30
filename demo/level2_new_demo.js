const API = require('../src');
const { level2NewTopics }  = require('./constants')
API.init(require('./config'));

const datafeed = new API.websocket.Datafeed();

// close callback
datafeed.onClose(() => {
  console.log('ws closed, status ', datafeed.trustConnected);
});

// connect
datafeed.connectSocket();

/**
 * @name level2NewTopics.level2MarketData
 * @description Subscribe to this topic to get Level2 order book data.
 * @updateTime 
 * @return {Object} 
 * {
    "type": "message",
    "topic": "/market/level2:BTC-USDT",
    "subject": "trade.l2update",
    "data": {
        "changes": {
            "asks": [
                [
                    "18906",//price
                    "0.00331",//size
                    "14103845"//sequence
                ],
                [
                    "18907.3",
                    "0.58751503",
                    "14103844"
                ]
            ],
            "bids": [
                [
                    "18891.9",
                    "0.15688",
                    "14103847"
                ]
            ]
        },
        "sequenceEnd": 14103847,
        "sequenceStart": 14103844,
        "symbol": "BTC-USDT",
        "time": 1663747970273//milliseconds
    }
}
 */ 
const callbackId = datafeed.subscribe(level2NewTopics.level2MarketData, (message) => {
  if (message.topic === level2NewTopics.level2MarketData) {
    console.log(message.data);
  }
});


/**
 * @name level2NewTopics.level2Depth5
 * @description The system will return the 5 best ask/bid orders data, which is the snapshot data of every 100 milliseconds (in other words, the 5 best ask/bid orders data returned every 100 milliseconds in real-time).
 * @updateTime 
 * @return {Object} 
 * {
    "type": "message",
    "topic": "/spotMarket/level2Depth5:BTC-USDT",
    "subject": "level2",
    "data": {
          "asks":[
            ["9989","8"],    //price, size
            ["9990","32"],
            ["9991","47"],
            ["9992","3"],
            ["9993","3"]
        ],
        "bids":[
            ["9988","56"],
            ["9987","15"],
            ["9986","100"],
            ["9985","10"],
            ["9984","10"]
        ],
        "timestamp": 1586948108193
    }
}
 */ 
const callbackId1 = datafeed.subscribe(level2NewTopics.level2Depth5, (message) => {
  if (message.topic === level2NewTopics.level2Depth5) {
    console.log(message.data);
  }
});


/**
 * @name level2NewTopics.level2Depth50
 * @description The system will return the 50 best ask/bid orders data, which is the snapshot data of every 100 milliseconds (in other words, the 50 best ask/bid orders data returned every 100 milliseconds in real-time).
 * @updateTime 
 * @return {Object} 
 * {
    "type": "message",
    "topic": "/spotMarket/level2Depth50:BTC-USDT",
    "subject": "level2",
    "data": {
          "asks":[
            ["9993","3"],     //price,size
            ["9992","3"],
            ["9991","47"],
            ["9990","32"],
            ["9989","8"]
        ],
        "bids":[
            ["9988","56"],
            ["9987","15"],
            ["9986","100"],
            ["9985","10"],
            ["9984","10"]
        ]
        "timestamp": 1586948108193
    }
}
 */ 
const callbackId2 = datafeed.subscribe(level2NewTopics.level2Depth50, (message) => {
  if (message.topic === level2NewTopics.level2Depth50) {
    console.log(message.data);
  }
});





//////////////////////////////cancel subscribe//////////////////////////////////////
setTimeout(() => {
  // unsubscribe-level2MarketData
  datafeed.unsubscribe(level2NewTopics.level2MarketData, callbackId);
  console.log(`unsubscribed: ${level2NewTopics.level2MarketData} ${callbackId}`);  

   // unsubscribe-level2Depth5
   datafeed.unsubscribe(level2NewTopics.level2Depth5, callbackId1);
   console.log(`unsubscribed: ${level2NewTopics.level2Depth5} ${callbackId1}`); 
   
    // unsubscribe-level2Depth50
    datafeed.unsubscribe(level2NewTopics.level2Depth50, callbackId2);
    console.log(`unsubscribed: ${level2NewTopics.level2Depth50} ${callbackId2}`); 
  
}, 5000);
