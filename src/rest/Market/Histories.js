
const Http = require('../../lib/http');

/**
 * @name getMarketHistories
 * @description Get Trade Histories
 * @param {string} symbol - symbol
 * @return {Object} { code, success, data }
 */
exports.getMarketHistories = async function getMarketHistories(symbol) {
  /*
  {
    "code": "200000",     
    "data": [
      {
          "sequence": "1545896668571",
          "price": "0.07",                      //Filled price
          "size": "0.004",                      //Filled amount
          "side": "buy",                        //Filled side. The filled side is set to the taker by default.
          "time": 1545904567062140823           //Transaction time
      },
      {
          "sequence": "1545896668578",
          "price": "0.054",
          "size": "0.066",
          "side": "buy",
          "time": 1545904581619888405
      }
    ]
  }
  */
  return await Http().GET('/api/v1/market/histories', { symbol });
};

/**
 * @name getMarketCandles
 * @description Get Klines
 * @param {string} symbol - symbol
 * @param {string} type - Type of candlestick patterns: 1min, 3min, 5min, 15min, 30min, 1hour, 2hour, 4hour, 6hour, 8hour, 12hour, 1day, 1week
 * @param {Object}
 *   - {number} startAt - [Optional] Start time (second), default is 0
 *   - {number} endAt - [Optional] End time (second), default is 0
 * @return {Object} { code, success, data }
 */
exports.getMarketCandles = async function getMarketCandles(symbol, type, { startAt, endAt } = {}) {
  /*
  {
    "code": "200000",     
    "data": [
      [
          "1545904980",             //Start time of the candle cycle
          "0.058",                  //opening price
          "0.049",                  //closing price
          "0.058",                  //highest price
          "0.049",                  //lowest price
          "0.018",                  //Transaction amount
          "0.000945"                //Transaction volume
      ],
      [
          "1545904920",
          "0.058",
          "0.072",
          "0.072",
          "0.058",
          "0.103",
          "0.006986"
      ]
    ]
  }
  */
  return await Http().GET('/api/v1/market/candles', {
    symbol,
    type,
    startAt,
    endAt,
  });
};
