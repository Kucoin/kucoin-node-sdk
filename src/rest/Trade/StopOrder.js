
const Http = require('../lib/http');

/**
 * @name postStopOrder
 * @description Place a New Order. This endpoint requires the "Trade" permission. The maximum number of stop orders available for a single trading pair in one account is 20.
 * @param baseParams
 *   - clientOid Unique order id created by users to identify their orders, e.g. UUID.
 *   - side	buy or sell
 *   - symbol a valid trading symbol code. e.g. ETH-BTC
 *   - type [Optional] limit or market (default is limit)
 *   - remark [Optional] remark for the order, length cannot exceed 100 utf8 characters
 *   - stop [Optional] Either loss or entry. Set as loss by defult
 *   - stopPrice Stop price
 *   - stp [Optional] self trade prevention, CN, CO, CB or DC. Do not support DC when type is market
 *   - tradeType [Optional] The type of trading : TRADE (Spot Trade), MARGIN_TRADE (Margin Trade). Set as TRADE by default
 * @param orderParams
 *   LIMIT ORDER PARAMETERS
 *   - price price per base currency
 *   - size amount of base currency to buy or sell
 *   - timeInForce [Optional] GTC, GTT, IOC, or FOK (default is GTC), read Time In Force.
 *   - cancelAfter [Optional] cancel after n seconds, requires timeInForce to be GTT
 *   - postOnly [Optional] Post only flag, invalid when timeInForce is IOC or FOK
 *   - hidden [Optional] Order will not be displayed in the order book
 *   - iceberg [Optional] Only aportion of the order is displayed in the order book
 *   - visibleSize [Optional] The maximum visible size of an iceberg order
 * 
 *   MARKET ORDER PARAMETERS / It is required that you use one of the two parameters, size or funds.
 *   - size [Optional] Desired amount in base currency
 *   - funds [Optional] The desired amount of quote currency to use
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
 * @param symbol Path parameter, indicating trading pairs
 * @param orderId Path parameter, Order ID, unique ID of the order.
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
 * @param symbol [Optional] cancel open orders of the designated trading pair
 * @param tradeType [Optional] cancel open orders of the designated trading types (default is to cancel TRADE (spot trade) orders)
 * @param orderIds [Optional] designated order ID. You can specify multiple IDs and separate them with commas
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
 * @param symbol Path parameter, indicating trading pairs
 * @param orderId Order ID, unique identifier of an order, obtained via the List orders.
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
 *   - symbol [Optional] Only list orders for a specific symbol.
 *   - side [Optional] buy or sell
 *   - type [Optional] limit, market, limit_stop or market_stop
 *   - tradeType [Optional ] The type of trading : TRADE (Spot Trading), MARGIN_TRADE (Margin Trading).
 *   - startAt [Optional] Start time (milisecond)
 *   - endAt [Optional] End time (milisecond)
 *   - currentPage [Optional] Current Page
 *   - orderIds [Optional] List of order IDs, separated by commas
 *   - pageSize [Optional] Page Size
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
 * @param clientOid user-entered order unique mark
 * @param symbol symbol
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
