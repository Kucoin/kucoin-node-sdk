
const Http = require('../../lib/http');

/**
 * @name getMarkPrice
 * @description Request via this endpoint to get the index price of the specified symbol.
 * @param {string} symbol - symbol
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

/**
 * @name postMarginOrder
 * @description Post Margin Order. This endpoint requires the "Trade" permission.
 * @updateTime 07/05/22
 * @param params https://docs.kucoin.cc/#place-a-margin-order
 *   Parameters
 *    - {string} clientOid - Unique order id created by users to identify their orders, e.g. UUID.
 *    - {string} side - buy or sell
 *    - {string} symbol - a valid trading symbol code. e.g. ETH-BTC
 *    - {string} type - [Optional] limit or market (default is limit)
 *    - {string} remark - [Optional] remark for the order, length cannot exceed 100 utf8 characters
 *    - {string} stp - [Optional] self trade prevention , CN, CO, CB or DC
 *    - {string} marginMode - [Optional] The type of trading, including cross (cross mode) and isolated (isolated mode). It is set at cross by default. The isolated mode will be released soon, so stay tuned!
 *    - {boolean} autoBorrow - [Optional] Auto-borrow to place order. The system will first borrow you funds at the optimal interest rate and then place an order for you.
 *   LIMIT ORDER PARAMETERS
 *    - {string} price - price per base currency
 *    - {string} size - amount of base currency to buy or sell
 *    - {string} timeInForce - [Optional] GTC, GTT, IOC, or FOK (default is GTC).
 *    - {long} cancelAfter - [Optional] cancel after n seconds, requires timeInForce to be GTT
 *    - {boolean} postOnly - [Optional] Post only flag, invalid when timeInForce is IOC or FOK
 *    - {boolean} hidden - [Optional] Order will not be displayed in the order book
 *    - {boolean} iceberg - [Optional] Only aportion of the order is displayed in the order book
 *    - {string} visibleSize - [Optional] The maximum visible size of an iceberg order
 *   LIMIT ORDER PARAMETERS
 *    - {string} size - [Optional] Desired amount in base currency
 *    - {string} funds - [Optional] The desired amount of quote currency to use
 * @return {Object} { code, success, data }
 */
exports.postMarginOrder = async function postMarginOrder(params = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "orderId": "5bd6e9286d99522a52e458de",
      "borrowSize":10.2,
      "loanApplyId":"600656d9a33ac90009de4f6f"
    }
  }
  */
  return await Http().POST('/api/v1/margin/order', { ...params });
};

/**
 * @description Request via this endpoint to get the cross/isolated margin risk limit.
 * @param {string} marginModel - marginModel
 * @returns {Object} { code, success, data }
 */
exports.getMarginPriceStrategy = async function getMarginPriceStrategy({ marginModel } = {}) {
  /*
    {
      "code": "200000",
      "data": {
        [
          {
            "currency": "BTC",
            "borrowMaxAmount": "50",
            "buyMaxAmount": "50",
            "precision": 8
          }
        ]
      }
    }
    */
  return await Http().GET('/api/v1/risk/limit/strategy', {marginModel});
};

/**
* @name getMarginCurrencies
* @description Get margin currencies
* @updateTime 01/12/24
* @param {Boolean} isIsolated - true for isolated, false for cross; default is false (Mandatory)
* @param {String} symbol - Symbol, required for isolated margin accounts (Optional)
* @param {String} currency - Currency (Optional)
* @return {Object} { code, success, data }
*/
exports.getMarginCurrencies = async function getMarginCurrencies({isIsolated, symbol, currency}) {  
  return await Http().GET('/api/v3/margin/currencies', {isIsolated, symbol, currency});
}

/**
* @name getEtfInfo
* @description Get ETF information
* @updateTime 02/03/23
* @param {String} currency - Currency, if empty query all currencies (Optional)
* @return {Object} { code, success, data }
*/
exports.getEtfInfo = async function getEtfInfo({currency}) {  
  return await Http().GET('/api/v3/etf/info', {currency});
}

/**
* @name getMarginAccounts
* @description Get margin accounts
* @updateTime 01/12/24
* @param {String} quoteCurrency - Quote currency, currently only supports USDT, KCS, BTC, USDT as default (Optional)
* @param {String} queryType - Query account type (default MARGIN), MARGIN - only query low frequency cross margin account, MARGIN_V2-only query high frequency cross margin account, ALL - consistent aggregate query with the web side (Optional)
* @return {Object} { code, success, data } Returns the margin accounts data
*/
exports.getMarginAccounts = async function getMarginAccounts({
  quoteCurrency = 'USDT',
  queryType = 'MARGIN',
}) {
  return await Http().GET("/api/v3/margin/accounts", {
    quoteCurrency,
    queryType,
  });
};

/**
* @name getIsolatedAccounts
* @description Get the info of the isolated margin account
* @updateTime 01/12/24
* @param {String} symbol - For isolated trading pairs, query all without passing (Optional)
* @param {String} quoteCurrency - Quote currency, currently only supports USDT, KCS, BTC, default is USDT (Optional)
* @param {String} queryType - Query account type (default MARGIN), ISOLATED - only query low frequency isolated margin account, ISOLATED_V2-only query high frequency isolated margin account, ALL - consistent aggregate query with the web side (Optional)
* @return {Object} { code, success, data } Returns the isolated margin accounts data
*/
exports.getIsolatedAccounts = async function getIsolatedAccounts({
  symbol,
  quoteCurrency = 'USDT',
  queryType = 'MARGIN',
}) {
  return await Http().GET("/api/v3/isolated/accounts", {
    symbol,
    quoteCurrency,
    queryType,
  });
};

/**
* @name postMarginOrderTest
* @description Place a margin order with the specified parameters
* @updateTime 05/30/24
* @param {String} clientOid - Client Order Id, a unique identifier created by the client (recommended to use UUID)
* @param {String} side - buy (for buying) or sell (for selling)
* @param {String} symbol - Trading pair, e.g., ETH-BTC
* @param {String} type - Order type: limit or market (default is limit)
* @param {String} remark - Order description (Optional, maximum length is 50 characters, encoding supports ASCII)
* @param {String} stp - Self-trade prevention strategy: CN, CO, CB, DC (Optional)
* @param {String} marginModel - Margin trading mode: cross (cross margin) or isolated (isolated margin) (default is cross)
* @param {boolean} autoBorrow - Automatically borrow coins for the order (Optional, only supported for cross margin)
* @param {boolean} autoRepay - Automatically repay borrowed coins after order execution (Optional, only supported for cross margin)
* @param {String} price - Price for limit orders (Mandatory for limit orders)
* @param {String} size - Quantity for limit orders (Mandatory for limit orders)
* @param {String} timeInForce - Order time-in-force strategy: GTC, GTT, IOC, FOK (default is GTC) (Optional)
* @param {long} cancelAfter - Cancel after n seconds, applicable when timeInForce is GTT (Optional)
* @param {boolean} postOnly - Flag for post-only orders, invalid when timeInForce is IOC or FOK (Optional)
* @param {boolean} hidden - Whether to hide the order (not displayed in the order book) (Optional)
* @param {boolean} iceberg - Whether to display only the visible part of the iceberg order (Optional)
* @param {String} visibleSize - Maximum display quantity for iceberg orders (Optional)
* @param {String} funds - Funds for market orders (Optional, either size or funds must be specified)
* @return {Object} { orderId, borrowSize, loanApplyId }
*/
exports.postMarginOrderTest = async function postMarginOrderTest({
  clientOid,
  side,
  symbol,
  type,
  remark,
  stp,
  marginModel,
  autoBorrow,
  autoRepay,
  price,
  size,
  timeInForce,
  cancelAfter,
  postOnly,
  hidden,
  iceberg,
  visibleSize,
  funds
}) {
  // Implementation logic for placing a margin order goes here
  // ...
  return await Http().POST('/api/v1/margin/order/test', {
    clientOid,
    side,
    symbol,
    type,
    remark,
    stp,
    marginModel,
    autoBorrow,
    autoRepay,
    price,
    size,
    timeInForce,
    cancelAfter,
    postOnly,
    hidden,
    iceberg,
    visibleSize,
    funds
  });
}