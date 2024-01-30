const Http = require("../../lib/http");

/**
 * @name placeOrder
 * @description Place a new order
 * @updateTime 01/12/24
 * @param {String} symbol - Symbol, such as ETH-BTC (Mandatory)
 * @param {String} side - Buy or sell (Mandatory)
 * @param {String} price - Specify price for currency (Mandatory)
 * @param {String} size - Specify quantity for currency (Mandatory)
 * @param {String} stopPrice - Trigger price (Mandatory)
 * @param {String} limitPrice - The limit order price after take-profit and stop-loss are triggered (Mandatory)
 * @param {String} tradeType - Transaction Type, currently only supports TRADE (spot transactions), the default is TRADE (Optional)
 * @param {String} clientOid - Client Order Id, unique identifier created by the user, the use of UUID is recommended, e.g. UUID, with a maximum length of 128 bits (Mandatory)
 * @param {String} remark - Order placement remarks, length cannot exceed 100 characters (UTF-8) (Optional)
 * @return {Object} { code, success, data } orderId	An order Id is returned once an order is successfully placed.
 */
exports.placeOrder = async function placeOrder({
  symbol,
  side,
  price,
  size,
  stopPrice,
  limitPrice,
  tradeType,
  clientOid,
  remark,
}) {
  return await Http().POST("/api/v3/oco/order", {
    symbol,
    side,
    price,
    size,
    stopPrice,
    limitPrice,
    tradeType,
    clientOid,
    remark,
  });
};

/**
 * @name cancelOrder
 * @description Cancel an order by orderId
 * @updateTime 01/12/24
 * @param {String} orderId Path parameter, Order Id unique identifier (Mandatory)
 * @return {Object} { code, success, data }
 */
exports.cancelOrder = async function cancelOrder(orderId) {
  return await Http().DELETE(`/api/v3/oco/order/${orderId}`);
};

/**
 * @name cancelOrderByClientOid
 * @description Cancel an order by clientOid
 * @updateTime 01/12/24
 * @param {String} clientOid  Path parameter，Unique order id created by users to identify their orders (Mandatory)
 * @return {Object} { code, success, data }
 */
exports.cancelOrderByClientOid = async function cancelOrderByClientOid(
  clientOid
) {
  return await Http().DELETE(`/api/v3/oco/client-order/${clientOid}`);
};

/**
 * @name cancelAllOrders
 * @description Cancel all orders
 * @updateTime 02/03/23
 * @param {String} orderIds - Specify the order number, there can be multiple orders, separated by commas. If not passed, all oco orders will be canceled by default (Optional)
 * @param {String} symbol - Trading pair. If not passed, the oco orders of all symbols will be canceled by default (Optional)
 * @return {Object} { code, success, data }
 */
exports.cancelAllOrders = async function cancelAllOrders({ orderIds, symbol }) {
  return await Http().DELETE("/api/v3/oco/orders", { orderIds, symbol });
};

/**
 * @name getOrder
 * @description Get an order by orderId
 * @updateTime 01/12/24
 * @param {String} orderId  Path parameter, Order Id unique identifier  (Mandatory)
 * @return {Object} { code, success, data }
 */
exports.getOrder = async function getOrder(orderId) {
  return await Http().GET(`/api/v3/oco/order/${orderId}`);
};

/**
 * @name getOrderByClientOid
 * @description Get an order by clientOid
 * @updateTime 01/12/24
 * @param {String} clientOid Path parameter，Unique order id created by users to identify their orders   (Mandatory)
 * @return {Object} { code, success, data }
 */
exports.getOrderByClientOid = async function getOrderByClientOid(clientOid) {
  return await Http().GET(`/api/v3/oco/client-order/${clientOid}`);
};

/**
 * @name getOrders
 * @description Get all orders
 * @updateTime 01/12/24
 * @param {String} pageSize - Size per page, minimum value 10, maximum value 500 (Mandatory)
 * @param {String} currentPage - Page number, minimum value 1 (Mandatory)
 * @param {String} symbol - Only order information for the specified Symbol is returned (Optional)
 * @param {long} startAt - Start time (milliseconds) (Optional)
 * @param {long} endAt - End time (milliseconds) (Optional)
 * @param {String} orderIds - Specify orderId collection, up to 500 orders (Optional)
 * @return {Object} { code, success, data }
 */
exports.getOrders = async function getOrders({
  pageSize,
  currentPage,
  symbol,
  startAt,
  endAt,
  orderIds,
}) {
  return await Http().GET("/api/v3/oco/orders", {
    pageSize,
    currentPage,
    symbol,
    startAt,
    endAt,
    orderIds,
  });
};

/**
 * @name getOrderDetails
 * @description Get order details by orderId
 * @updateTime 01/12/24
 * @param {String} orderId Path parameter, Order Id unique identifier  (Mandatory)
 * @return {Object} { code, success, data }
 */
exports.getOrderDetails = async function getOrderDetails(orderId) {
  return await Http().GET(`/api/v3/oco/order/details/${orderId}`);
};
