
const Http = require('../../lib/http');

/**
 * @name getSymbolsList
 * @description Get Symbols List
 * @param {string} market - [Optional] The trading market.
 * @return {Object} { code, success, data }
 */
exports.getSymbolsList = async function getSymbolsList(market) {
  /*
  {
    "code": "200000",     
    "data": [
      {
        "symbol": "BTC-USDT",
        "name": "BTC-USDT",
        "baseCurrency": "BTC",
        "quoteCurrency": "USDT",
        "baseMinSize": "0.00000001",
        "quoteMinSize": "0.01",
        "baseMaxSize": "10000",
        "quoteMaxSize": "100000",
        "baseIncrement": "0.00000001",
        "quoteIncrement": "0.01",
        "priceIncrement": "0.00000001",
        "feeCurrency": "USDT",
        "enableTrading": true,
        "isMarginEnabled": true,
        "priceLimitRate": "0.1"
      }
    ]
  }
  */
  return await Http().GET('/api/v1/symbols', { market });
};

/**
 * @name getTicker
 * @description Get Ticker
 * @param {string} symbol - symbol
 * @return {Object} { code, success, data }
 */
exports.getTicker = async function getTicker(symbol) {
  /*
  {
    "code": "200000",     
    "data": {
      "sequence": "1550467636704",
      "bestAsk": "0.03715004",
      "size": "0.17",
      "price": "0.03715005",
      "bestBidSize": "3.803",
      "bestBid": "0.03710768",
      "bestAskSize": "1.788",
      "time": 1550653727731
    }
  }
  */
  return await Http().GET('/api/v1/market/orderbook/level1', { symbol });
};

/**
 * @name getAllTickers
 * @description Get All Tickers
 * @return {Object} { code, success, data }
 */
exports.getAllTickers = async function getAllTickers() {
  /*
  {
    "code": "200000",     
    "data": {
      "time": 1550653727731,
      "ticker": [
        {
          "time": 1602832092060,  // time
          "symbol": "BTC-USDT",   // symbol
          "symbolName":"BTC-USDT", // Name of trading pairs, it would change after renaming
          "buy": "11328.9",   // bestAsk
          "sell": "11329",    // bestBid
          "changeRate": "-0.0055",    // 24h change rate
          "changePrice": "-63.6", // 24h change price
          "high": "11610",    // 24h highest price
          "low": "11200", // 24h lowest price
          "vol": "2282.70993217", // 24h volume，the aggregated trading volume in BTC
          "volValue": "25984946.157790431",   // 24h total, the trading volume in quote currency of last 24 hours
          "last": "11328.9",  // last price
          "averagePrice": "11360.66065903",   // 24h average transaction price yesterday
          "takerFeeRate": "0.001",    // Basic Taker Fee
          "makerFeeRate": "0.001",    // Basic Maker Fee
          "takerCoefficient": "1",    // Taker Fee Coefficient
          "makerCoefficient": "1" // Maker Fee Coefficient
        },
      ]
    }
  }
  */
  return await Http().GET('/api/v1/market/allTickers');
};

/**
 * @name get24hrStats
 * @description Get 24hr Stats
 * @param {string} symbol - symbol
 * @return {Object} { code, success, data }
 */
exports.get24hrStats = async function get24hrStats(symbol) {
  /*
  {
    "code": "200000",     
    "data": {
      "time": 1602832092060,  // time
      "symbol": "BTC-USDT",   // symbol
      "buy": "11328.9",   // bestAsk
      "sell": "11329",    // bestBid
      "changeRate": "-0.0055",    // 24h change rate
      "changePrice": "-63.6", // 24h change price
      "high": "11610",    // 24h highest price
      "low": "11200", // 24h lowest price
      "vol": "2282.70993217", // 24h volume，the aggregated trading volume in BTC
      "volValue": "25984946.157790431",   // 24h total, the trading volume in quote currency of last 24 hours
      "last": "11328.9",  // last price
      "averagePrice": "11360.66065903",   // 24h average transaction price yesterday
      "takerFeeRate": "0.001",    // Basic Taker Fee
      "makerFeeRate": "0.001",    // Basic Maker Fee
      "takerCoefficient": "1",    // Taker Fee Coefficient
      "makerCoefficient": "1" // Maker Fee Coefficient
    }
  }
  */
  return await Http().GET('/api/v1/market/stats', { symbol });
};

/**
 * @name getMarketList
 * @description Get Market List
 * @return {Object} { code, success, data }
 */
exports.getMarketList = async function getMarketList() {
  /*
  {
    "code": "200000",     
    "data":[
      "BTC",
      "KCS",
      "USDS",  //SC has been changed to USDS
      "ALTS" //ALTS market includes ETH, NEO, TRX
    ]
  }
  */
  return await Http().GET('/api/v1/markets');
};
