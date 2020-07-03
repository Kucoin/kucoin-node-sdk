
const Http = require('../lib/http');

/**
 * @name getSymbolsList
 * @description Get Symbols List
 * @param market [Optional] The trading market.
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
 * @param symbol symbol
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
          "symbol": "BTC-USDT",
          "symbolName": "BTC-USDT",
          "buy": "0.00001191",
          "sell": "0.00001206",
          "changeRate": "0.057",
          "changePrice": "0.00000065",
          "high": "0.0000123",
          "low": "0.00001109",
          "vol": "45161.5073",
          "volValue": "2127.28693026”, 
          "last": "0.00001204"
        },
        {
          "symbol": "BCD-BTC",
          "symbolName": "BCD-BTC",
          "buy": "0.00018564",
          "sell": "0.0002",
          "changeRate": "-0.0753",
          "changePrice": "-0.00001522",
          "high": "0.00021489",
          "low": "0.00018351",
          "vol": "72.99679763",
          "volValue": "2127.28693026”, 
          "last": "0.00018664"
        }
      ]
    }
  }
  */
  return await Http().GET('/api/v1/market/allTickers');
};

/**
 * @name get24hrStats
 * @description Get 24hr Stats
 * @param symbol symbol
 * @return {Object} { code, success, data }
 */
exports.get24hrStats = async function get24hrStats(symbol) {
  /*
  {
    "code": "200000",     
    "data": {
      "symbol": "ETH-BTC",    // symbol
      "high": "0.03736329",   // 24h highest price
      "vol": "2127.286930263025",  // 24h volume，the aggregated trading volume in ETH
      "volValue": "43.58567564",  // 24h total, the trading volume in quote currency of last 24 hours
      "last": "0.03713983",   // last price
      "low": "0.03651252",    // 24h lowest price
      "buy": "0.03712118",    // bestAsk
      "sell": "0.03713983",   // bestBid
      "changePrice": "0.00037224",  // 24h change price
      "averagePrice": "8699.24180977",//24h average transaction price yesterday
      "time": 1550847784668,  //time
      "changeRate": "0.0101" // 24h change rate
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
