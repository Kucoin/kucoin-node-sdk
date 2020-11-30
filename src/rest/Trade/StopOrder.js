
const Http = require('../../lib/http');

/**
 * @name postStopOrder
 * @description Place a New Order. This endpoint requires the "Trade" permission. The maximum number of stop orders available for a single trading pair in one account is 20.
 * @param baseParams
 *   - {string} clientOid - Unique order id created by users to identify their orders, e.g. UUID.
 *   - {string} side - buy or sell
 *   - {string} symbol - a valid trading symbol code. e.g. ETH-BTC
 *   - {string} type - [Optional] limit or market (default is limit)
 *   - {string} remark - [Optional] remark for the order, length cannot exceed 100 utf8 characters
 *   - {string} stop - [Optional] Either loss or entry. Set as loss by defult
 *   - {string} stopPrice - Stop price
 *   - {string} stp - [Optional] self trade prevention, CN, CO, CB or DC. Do not support DC when type is market
 *   - {string} tradeType - [Optional] The type of trading : TRADE (Spot Trade), MARGIN_TRADE (Margin Trade). Set as TRADE by default
 * @param orderParams
 *   LIMIT ORDER PARAMETERS
 *   - {string} price - price per base currency
 *   - {string} size - amount of base currency to buy or sell
 *   - {string} timeInForce - [Optional] GTC, GTT, IOC, or FOK (default is GTC), read Time In Force.
 *   - {number} cancelAfter - [Optional] cancel after n seconds, requires timeInForce to be GTT
 *   - {boolean} postOnly - [Optional] Post only flag, invalid when timeInForce is IOC or FOK
 *   - {boolean} hidden - [Optional] Order will not be displayed in the order book
 *   - {boolean} iceberg - [Optional] Only aportion of the order is displayed in the order book
 *   - {string} visibleSize - [Optional] The maximum visible size of an iceberg order
 * 
 *   MARKET ORDER PARAMETERS / It is required that you use one of the two parameters, size or funds.
 *   - {string} size - [Optional] Desired amount in base currency
 *   - {string} funds - [Optional] The desired amount of quote currency to use
 * @return {Object} { code, success, data }
 */
exports.postStopOrder = async function postStopOrder(baseParams = {}, orderParams = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "orderId": "5bd6e9286d99522a52e458de"
    }
  }
  */
  return await Http().POST('/api/v1/stop-order', {
    ...baseParams,
    ...orderParams,
  });
};


/**
 * @name cancelOrder
 * @description Cancel an Order
 * @param {string} symbol - Path parameter, indicating trading pairs
 * @param {string} orderId - Path parameter, Order ID, unique ID of the order.
 * @return {Object} { code, success, data }
 */
exports.cancelOrder = async function cancelOrder(symbol, orderId) {
  /*
  {
    "code": "200000",     
    "data": {
      "cancelledOrderIds": [
        "5bd6e9286d99522a52e458de"
      ]
    }
  }
  */
  return await Http().DEL(`/api/v1/stop-order/${symbol}/${orderId}`);
};



/**
 * @name cancelMultiOrders
 * @description Cancel Bulk Orders
 * @param {string} symbol - [Optional] cancel open orders of the designated trading pair
 * @param {string} tradeType - [Optional] cancel open orders of the designated trading types (default is to cancel TRADE (spot trade) orders)
 * @param {string} orderIds - [Optional] designated order ID. You can specify multiple IDs and separate them with commas
 * @return {Object} { code, success, data }
 */
exports.cancelMultiOrders = async function cancelMultiOrders(symbol, tradeType, orderIds) {
  /*
  {
    "code": "200000",     
    "data": {
      "cancelledOrderIds": [
        "5bd6e9286d99522a52e458de"
      ]
    }
  }
  */
  return await Http().DEL('/api/v1/stop-order/cancel', {
    symbol,
    tradeType,
    orderIds,
  });
};


/**
 * @name getOrder
 * @description Get An Order
 * @param {string} symbol - Path parameter, indicating trading pairs
 * @param {string} orderId - Order ID, unique identifier of an order, obtained via the List orders.
 * @return {Object} { code, success, data }
 */
exports.getOrder = async function getOrder(symbol, orderId) {
  /*
  {
    "code": "200000",     
    "data": {
    }
  }
  */
  return await Http().GET(`/api/v1/stop-order/${symbol}/${orderId}`);
};


/**
 * @name getStopOrderList
 * @description Get Stop Order List
 * @param params
 *   - {string} symbol - [Optional] Only list orders for a specific symbol.
 *   - {string} side - [Optional] buy or sell
 *   - {string} type - [Optional] limit, market, limit_stop or market_stop
 *   - {string} tradeType - [Optional ] The type of trading : TRADE (Spot Trading), MARGIN_TRADE (Margin Trading).
 *   - {number} startAt - [Optional] Start time (milisecond)
 *   - {number} endAt - [Optional] End time (milisecond)
 *   - {number} currentPage - [Optional] Current Page
 *   - {string} orderIds - [Optional] List of order IDs, separated by commas
 *   - {number} pageSize - [Optional] Page Size
 * @return {Object} { code, success, data }
 */
exports.getStopOrderList = async function getStopOrderList(params = {}) {
  /*
  {
    "code": "200000",     
    "data": {
    }
  }
  */
  return await Http().GET('/api/v1/stop-order', {
    ...params,
  });
};


/**
 * @name getOrderByClientOid
 * @description Get details of a single order via clientOid.
 * @param {string} clientOid - user-entered order unique mark
 * @param {string} symbol - symbol
 * @return {Object} { code, success, data }
 */
exports.getOrderByClientOid = async function getOrderByClientOid(clientOid, symbol) {
  /*
  {
    "code": "200000",     
    "data": {
    }
  }
  */
  return await Http().GET('/api/v1/stop-order/queryOrderByClientOid', {
    clientOid,
    symbol,
  });
};


/**
 * @name cancelSingleOrderByClientOid
 * @description Request via this interface to cancel a stop order via the clientOid.
 * @param {string} clientOid - Unique order id created by users to identify their orders
 * @param {string} symbol - [Optional] Unique order id created by users to identify their orders
 * @return {Object} { code, success, data }
 */
exports.cancelSingleOrderByClientOid = async function cancelSingleOrderByClientOid(clientOid, symbol) {
  /*
  {
    "code": "200000",     
    "data": {
    }
  }
  */
  return await Http().DEL('/api/v1/stop-order/cancelOrderByClientOid', {
    clientOid,
    symbol,
  });
};
