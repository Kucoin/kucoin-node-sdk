
const Http = require('../../lib/http');

/**
 * @name getCurrencies
 * @description Get Currencies. Request via this endpoint to get the currency list.
 * @return {Object} { code, success, data }
 */
exports.getCurrencies = async function getCurrencies() {
  /*
  {
    "code": "200000",     
    "data": [{
        "currency": "BTC",
        "name": "BTC",
        "fullName": "Bitcoin",
        "precision": 8,
        "withdrawalMinSize": "0.002",
        "withdrawalMinFee": "0.0005",
        "isWithdrawEnabled": true,   
        "isDepositEnabled": true,
        "isMarginEnabled": true,
        "isDebitEnabled": true
    },
    {

        "currency": "ETH",
        "name": "ETH",
        "fullName": "Ethereum",
        "precision": 8,
        "withdrawalMinSize": "0.02",
        "withdrawalMinFee": "0.01",
        "isWithdrawEnabled": true,
        "isDepositEnabled": true,
        "isMarginEnabled": true,
        "isDebitEnabled": true

    }]
  }
  */
  return await Http().GET('/api/v1/currencies');
};

/**
 * @name getCurrencyDetail
 * @description Get Currency Detail
 * @param {string} currency - Path parameter. Currency
 * @param {string} chain - [Optional] Support for querying the chain of currency, e.g. The available value for USDT are OMNI, ERC20, TRC20. This only apply for multi-chain currency, and there is no need for single chain currency.
 * @return {Object} { code, success, data }
 */
exports.getCurrencyDetail = async function getCurrencyDetail(currency, chain) {
  /*
  {
    "code": "200000",     
    "data": {
      "currency": "BTC",
      "name": "BTC",
      "fullName": "Bitcoin",
      "precision": 8,
      "withdrawalMinSize": "0.002",
      "withdrawalMinFee": "0.0005",
      "isWithdrawEnabled": true,
      "isDepositEnabled": true,
      "isMarginEnabled": true,
      "isDebitEnabled": true
    }
  }
  */
  return await Http().GET(`/api/v1/currencies/${currency}`, { chain });
};

/**
 * @name getFiatPrice
 * @description Request via this endpoint to get the fiat price of the currencies for the available trading pairs.
 * @param params
 *   - {string} base - [Optional] Ticker symbol of a base currency,eg.USD,EUR. Default is USD
 *   - {string} currencies - [Optional] Comma-separated cryptocurrencies to be converted into fiat, e.g.: BTC,ETH, etc. Default to return the fiat price of all currencies.
 * @return {Object} { code, success, data }
 */
exports.getFiatPrice = async function getFiatPrice(params = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "BTC": "3911.28000000",
      "ETH": "144.55492453",
      "LTC": "48.45888179",
      "KCS": "0.45546856"
    }
  }
  */
  return await Http().GET('/api/v1/prices', { ...params });
};
