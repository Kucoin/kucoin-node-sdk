
const Http = require('../lib/http');

/**
 * @name getMarkPrice
 * @description Request via this endpoint to get the index price of the specified symbol.
 * @param symbol symbol
 * @return {Object} { code, success, data }
 */
exports.getMarkPrice = async function getMarkPrice(symbol) {
  /*
  {
    "code": "200000",     
    "data": {
      "symbol": "USDT-BTC",
      "granularity": 5000,
      "timePoint": 1568701710000,
      "value": 0.00009807
    }
  }
  */
  return await Http().GET(`/api/v1/mark-price/${symbol}/current`);
};

/**
 * @name getMarginConfigurationInfo
 * @description Request via this endpoint to get the configure info of the margin.
 * @return {Object} { code, success, data }
 */
exports.getMarginConfigurationInfo = async function getMarginConfigurationInfo() {
  /*
  {
    "code": "200000",     
    "data": {
      "currencyList": ["BTC","USDT","EOS"],
      "warningDebtRatio": "0.8",
      "liqDebtRatio": "0.9",
      "maxLeverage": "3"
    }
  }
  */
  return await Http().GET('/api/v1/margin/config');
};

/**
 * @name getMarginAccount
 * @description Request via this endpoint to get the fiat price of the currencies for the available trading pairs.
 * @return {Object} { code, success, data }
 */
exports.getMarginAccount = async function getMarginAccount() {
  /*
  {
    "code": "200000",     
    "data": {
      "accounts": [
        {
          "availableBalance": "990.11",
          "currency": "USDT",
          "holdBalance": "7.22",
          "liability": "66.66",
          "maxBorrowSize": "88.88",
          "totalBalance": "997.33"
        }
      ],
      "debtRatio": "0.33"
    }
  }
  */
  return await Http().GET('/api/v1/margin/account');
};
