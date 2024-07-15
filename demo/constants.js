/*
 * @Owner: gannicus.zhou@kupotech.com
 * @Date: 2024-01-04 15:31:20
 * @LastEditors: gannicus Gannicus.Zhou@kupotech.com
 * @LastEditTime: 2024-07-12 09:52:24
 * @FilePath: /kucoin-node-sdk/demo/constants.js
 * @Description: 
 */
const tickerTopics = {
  'symbolTicker':"/market/ticker:BTC-USDT",
  'allSymbolsTicker':"/market/ticker:all",
}
const snapShotsTopics = {
  'symbolSnapshot':'/market/snapshot:BTC-USDT',
  'marketSnapshot':'/market/snapshot:BTC'
}
const level2NewTopics = {
  'level2MarketData':'/market/level2:BTC-USDT',
  'level2Depth5':'/spotMarket/level2Depth5:BTC-USDT',
  'level2Depth50':'/spotMarket/level2Depth50:BTC-USDT'
}
const klineTopics = {
  'klines':"/market/candles:BTC-USDT_1hour"
}
const matchTopics = {
  "matchExecutionData":"/market/match:BTC-USDT"
}
const priceTopics = {
 "indexPrice" :"/indicator/index:USDT-BTC",
 "markPrice" :"/indicator/markPrice:USDT-BTC"
}
//orderBookChange deprecated
const orderBookTopics = {
  "orderBookChange":"/margin/fundingBook:BTC" 
}
const isolatedTopics = {
  "isolatedPosition":"/margin/isolatedPosition:BTC-USDT"
}
module.exports = {
  tickerTopics,
  snapShotsTopics,
  level2NewTopics,
  klineTopics,
  matchTopics,
  priceTopics,
  orderBookTopics,
  isolatedTopics
}