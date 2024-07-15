/*
 * @Owner: gannicus.zhou@kupotech.com
 * @Date: 2024-07-10 17:16:36
 * @LastEditors: gannicus Gannicus.Zhou@kupotech.com
 * @LastEditTime: 2024-07-12 17:47:19
 * @FilePath: /kucoin-node-sdk/demo/websocket/margin.js
 * @Description:
 */
const API = require("../../src");

const { isolatedTopics } = require("../constants");

API.init(require("../config"));

const datafeed = new API.websocket.Datafeed();

// close callback

datafeed.onClose(() => {
  console.log("ws closed, status ", datafeed.trustConnected);
});

// connect

datafeed.connectSocket();

/**
 * @name isolatedPositionTopic
 * @description Isoleted Margin Position Event
 * @updateTime
 * @return {Object}
 * {
 *   "topic": "/margin/isolatedPosition:BTC-USDT",
 *   "type": "message",
 *   "data": {
 *     "tag": "BTC-USDT",
 *     "status": "CLEAR", // Position status
 *     "accumulatedPrincipal": "9.9778022", // Accumulated principal
 *     "changeAssets": {
 *       "BTC": {
 *         "total": "0.00001", // Total assets
 *         "hold": "0", // Freeze assets
 *         "liabilityPrincipal": "0", // Liability principal
 *         "liabilityInterest": "0" // Debt interest
 *       },
 *       "USDT": {
 *         "total": "9", // Total assets
 *         "hold": "0", // Freeze assets
 *         "liabilityPrincipal": "0", // Liability principal
 *         "liabilityInterest": "0" // Debt interest
 *       }
 *     },
 *     "timestamp": 1714446276318 // Timestamp (milliseconds)
 *   },
 *   "subject": "positionChange",
 *   "channelType": "private"
 * }
 */

const isolatedPositionTopic = isolatedTopics.isolatedPosition;

const callbackId = datafeed.subscribe(isolatedPositionTopic, (message) => {
  if (message.topic === isolatedPositionTopic) {
    console.log(message.data);
  }
});

// cancel

setTimeout(() => {
  datafeed.unsubscribe(isolatedPositionTopic, callbackId);

  console.log(`unsubscribed: ${isolatedPositionTopic} ${callbackId}`);
}, 5000);
