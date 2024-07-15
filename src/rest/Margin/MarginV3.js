const Http = require('../../lib/http');
/**
 * @name marginBorrowV3
 * @description Initiates a margin borrow request for either cross-margin or isolated margin.
 * @param {boolean} [isIsolated=false] - Indicates whether to use isolated margin (true) or cross-margin (false).
 * @param {string} [symbol] - The trading pair, mandatory for isolated margin accounts.
 * @param {string} currency - The currency to borrow.
 * @param {BigDecimal} size - The amount to borrow.
 * @param {string} timeInForce - Order time in force policy, e.g., IOC, FOK.
 * @param {boolean} [isHf=false] - Indicates high frequency borrowing (true) or low frequency borrowing (false).
 * @return {Promise<Object>} A promise that resolves to the response with the borrowing details.
 */
exports.marginBorrowV3 = async function marginBorrowV3({
  isIsolated = false,
  symbol,
  currency,
  size,
  timeInForce,
  isHf = false,
}) {
  const payload = {
    isIsolated,
    currency,
    size,
    timeInForce,
    isHf,
  };

  if (isIsolated && !symbol) {
    throw new Error('Symbol is required for isolated margin accounts.');
  }

  if (isIsolated) {
    payload.symbol = symbol;
  }

  try {
    return await Http().POST('/api/v3/margin/borrow', payload);
  } catch (error) {
    console.error('Error borrowing margin:', error);
    throw error;
  }
};

/**
 * @name getBorrowHistory
 * @description Request via this endpoint to retrieve the borrowing history for both isolated and cross-margin accounts.
 * @updateTime 07/12/24
 * @param {String} currency - Currency (Mandatory)
 * @param {Boolean} isIsolated - true for isolated margin, false for cross-margin (Optional, default: false)
 * @param {String} symbol - Trading pair (required for isolated margin accounts)
 * @param {String} orderNo - Order ID (Optional)
 * @param {Long} startTime - Start time (Optional)
 * @param {Long} endTime - End time (Optional)
 * @param {Int} currentPage - Current page for query (starting from 1, default: 1)
 * @param {Int} pageSize - Records per page (default: 50, minimum: 10, maximum: 500)
 * @return {Object} { orderNo, symbol, currency, size, actualSize, status, createdTime }
 */
exports.getBorrowHistoryV3 = async function getBorrowHistoryV3({
  currency,
  isIsolated,
  symbol,
  orderNo,
  startTime,
  endTime,
  currentPage,
  pageSize,
}) {
  return await Http().GET('/api/v3/margin/borrow', {
    currency,
    isIsolated,
    symbol,
    orderNo,
    startTime,
    endTime,
    currentPage,
    pageSize,
  });
};

/**
 * @name repayMarginLoan
 * @description Request via this endpoint to initiate a repayment application for either cross-margin or isolated margin accounts.
 * @updateTime 05/29/24
 * @param {Boolean} isIsolated - true for isolated margin, false for cross-margin (Optional, default: false)
 * @param {Boolean} isHf - High-frequency repayment (true) or low-frequency repayment (false, default) (Optional)
 * @param {String} symbol - Trading pair (required for isolated margin accounts)
 * @param {String} currency - Currency (Mandatory)
 * @param {BigDecimal} size - Repayment amount (Mandatory)
 * @return {Object} { orderNo, actualSize }
 */
exports.repayMarginLoanV3 = async function repayMarginLoanV3({
  isIsolated,
  isHf,
  symbol,
  currency,
  size,
}) {
  return await Http().POST('/api/v3/margin/repay', {
    isIsolated,
    isHf,
    symbol,
    currency,
    size,
  });
};

/**
 * @name getRepayHistory
 * @description Request via this endpoint to query the repayment history for both cross-margin and isolated margin accounts.
 * @updateTime 05/29/24
 * @param {String} currency - Currency (Mandatory)
 * @param {Boolean} isIsolated - true for isolated margin, false for cross-margin (Optional, default: false)
 * @param {String} symbol - Trading pair (required for isolated margin accounts)
 * @param {String} orderNo - Order ID (Optional)
 * @param {Long} startTime - Start time (Optional)
 * @param {Long} endTime - End time (Optional)
 * @param {Int} currentPage - Current page for query (starting from 1, default: 1)
 * @param {Int} pageSize - Records per page (default: 50, minimum: 10, maximum: 500)
 * @return {Object} { orderNo, symbol, currency, size, principal, interest, status, createdTime }
 */
exports.getRepayHistoryV3 = async function getRepayHistoryV3({
  currency,
  isIsolated,
  symbol,
  orderNo,
  startTime,
  endTime,
  currentPage,
  pageSize,
}) {
  return await Http().GET('/api/v3/margin/repay', {
    currency,
    isIsolated,
    symbol,
    orderNo,
    startTime,
    endTime,
    currentPage,
    pageSize,
  });
};

/**
 * @name getMarginInterestRecords
 * @description Request via this endpoint to retrieve the borrowing interest records for both cross-margin and isolated margin accounts.
 * @updateTime 05/29/24
 * @param {Boolean} isIsolated - true for isolated margin, false for cross-margin (Optional, default: false)
 * @param {String} symbol - Trading pair (required for isolated margin accounts)
 * @param {String} currency - Currency (Optional)
 * @param {Long} startTime - Start timestamp (milliseconds) (Optional)
 * @param {Long} endTime - End timestamp (milliseconds) (Optional)
 * @param {Int} currentPage - Current page for query (starting from 1, default: 1)
 * @param {Int} pageSize - Records per page (default: 50, minimum: 10, maximum: 500)
 * @return {Object} { currency, dayRatio, interestAmount, createdTime }
 */
exports.getMarginInterestRecordsV3 = async function getMarginInterestRecordsV3({
  isIsolated,
  symbol,
  currency,
  startTime,
  endTime,
  currentPage,
  pageSize,
}) {
  return await Http().GET('/api/v3/margin/interest', {
    isIsolated,
    symbol,
    currency,
    startTime,
    endTime,
    currentPage,
    pageSize,
  });
};

/**
 * @name getLendingCurrencyInfo
 * @description Request via this endpoint to get information about lending currencies supported in the lending market.
 * @updateTime 05/29/24
 * @param {String} currency - Currency (Optional)
 * @return {Object} { currency, purchaseEnable, redeemEnable, increment, minPurchaseSize, minInterestRate, maxInterestRate, interestIncrement, maxPurchaseSize, marketInterestRate, autoPurchaseEnable }
 */
exports.getLendingCurrencyInfoV3 = async function getLendingCurrencyInfoV3({
  currency,
}) {
  return await Http().GET('/api/v3/project/list', {
    currency,
  });
};

/**
 * @name getMarketInterestRate
 * @description Request via this endpoint to get the interest rates for the lending market over the last 7 days.
 * @updateTime 05/29/24
 * @param {String} currency - Currency (Mandatory)
 * @return {Object[]} Array of { time, marketInterestRate }
 */
exports.getMarketInterestRateV3 = async function getMarketInterestRateV3({
  currency,
}) {
  return await Http().GET('/api/v3/project/marketInterestRate', {
    currency,
  });
};

/**
 * @name initiatePurchase
 * @description Request via this endpoint to initiate a subscription in the lending market.
 * @updateTime 05/29/24
 * @param {String} currency - Currency (Mandatory)
 * @param {String} size - Subscription amount (Mandatory)
 * @param {String} interestRate - Subscription interest rate (Mandatory)
 * @return {Object} { orderNo }
 */
exports.initiatePurchaseV3 = async function initiatePurchaseV3({
  currency,
  size,
  interestRate,
}) {
  return await Http().POST('/api/v3/purchase', {
    currency,
    size,
    interestRate,
  });
};

/**
 * @name getPurchaseOrders
 * @description Request via this endpoint to retrieve paginated purchase orders in the lending market.
 * @updateTime 05/29/24
 * @param {String} currency - Currency (Mandatory)
 * @param {String} status - DONE (completed) or PENDING (settling) (Mandatory)
 * @param {Int} currentPage - Current page number (Optional, default: 1)
 * @param {Int} pageSize - Records per page (Optional, default: 50, minimum: 1, maximum: 100)
 * @return {Object[]} Array of { currency, purchaseOrderNo, purchaseSize, matchSize, redeemSize, interestRate, incomeSize, applyTime, status }
 */
exports.getPurchaseOrdersV3 = async function getPurchaseOrdersV3({
  currency,
  status,
  currentPage,
  pageSize,
}) {
  return await Http().GET('/api/v3/purchase/orders', {
    currency,
    status,
    currentPage,
    pageSize,
  });
};

/**
 * @name redeemMarket_V3
 * @description Initiates a redemption in the lending market
 * @updateTime 05/29/24
 * @param {String} currency - Currency (Mandatory)
 * @param {String} size - Redemption amount (Mandatory)
 * @param {String} purchaseOrderNo - Purchase order number (Mandatory)
 * @return {Object} { code, success, data }
 */
exports.redeemMarketV3 = async function redeemMarketV3({
  currency,
  size,
  purchaseOrderNo,
}) {
  return await Http().POST('/api/v3/redeem', {
    currency,
    size,
    purchaseOrderNo,
  });
};

/**
 * @name getRedemptionOrders_V3
 * @description Retrieve redemption orders from the lending market (paginated)
 * @updateTime 05/29/24
 * @param {String} currency - Currency (Mandatory)
 * @param {String} redeemOrderNo - Redemption order number (Optional)
 * @param {String} status - Status (Mandatory, values: DONE; PENDING)
 * @param {Int} currentPage - Current page (Optional, default: 1)
 * @param {Int} pageSize - Page size (Optional, default: 50, range: 1<=pageSize<=100)
 * @return {Object} { currency, purchaseOrderNo, redeemOrderNo, redeemSize, receiptSize, applyTime, status }
 */
exports.getRedemptionOrdersV3 = async function getRedemptionOrdersV3({
  currency,
  redeemOrderNo,
  status,
  currentPage,
  pageSize,
}) {
  return await Http().GET('/api/v3/redeem/orders', {
    currency,
    redeemOrderNo,
    status,
    currentPage,
    pageSize,
  });
};

/**
 * @name updatePurchaseOrderInterestRate_V3
 * @description Update the interest rate for a lending market purchase order (effective at the next whole hour)
 * @updateTime 05/29/24
 * @param {String} currency - Currency (Mandatory)
 * @param {String} purchaseOrderNo - Purchase order number (Mandatory)
 * @param {String} interestRate - Updated purchase interest rate (Mandatory)
 * @return {void}
 */
exports.updatePurchaseOrderInterestRateV3 =
  async function updatePurchaseOrderInterestRateV3({
    currency,
    purchaseOrderNo,
    interestRate,
  }) {
    await Http().POST('/api/v3/lend/purchase/update', {
      currency,
      purchaseOrderNo,
      interestRate,
    });
  };

/**
 * @name getCrossMarginTradingPairs
 * @description Get the configuration of cross margin trading pairs
 * @updateTime 07/12/24
 * @param {String} [symbol] - Optional. If not provided, all cross margin trading pairs will be queried. If provided, only the specified trading pair will be queried.
 * @return {Object} The configuration of cross margin trading pairs
 */
exports.getCrossMarginTradingPairs = async function getCrossMarginTradingPairs(
  symbol
) {
  const params = symbol ? { symbol } : {};
  const response = await Http().GET('/api/v3/margin/symbols', { params });
  return response.data;
};

/**
 * @name updateLeverageMultiplier
 * @description Modify the leverage multiplier for cross margin or isolated margin
 * @updateTime 07/12/24
 * @param {String} leverage - New leverage multiplier (Mandatory)
 * @param {String} [symbol] - Trading pair. Leave empty for cross margin, or specify for isolated margin (Optional)
 * @param {boolean} [isIsolated=false] - Whether it is isolated margin. true: yes, false: cross margin. Default: false (Optional)
 * @return {void}
 */

exports.updateLeverageMultiplier = async function updateLeverageMultiplier({
  leverage,
  symbol,
  isIsolated = false,
}) {
  const payload = {
    leverage,

    symbol,

    isIsolated,
  };

  await Http().POST('/api/v3/position/update-user-leverage', payload);
};

/**
 * @name placeHfMarginOrder
 * @description Place a high-frequency margin trading order
 * @updateTime 07/12/24
 * @param {Object} orderDetails - The details of the order to be placed
 * @param {String} orderDetails.clientOid - Client Order Id, unique identifier created by the user
 * @param {String} orderDetails.side - Order side, either 'buy' or 'sell'
 * @param {String} orderDetails.symbol - Trading pair symbol
 * @param {String} [orderDetails.type='limit'] - Order type, either 'limit' or 'market'
 * @param {String} [orderDetails.stp] - Self trade prevention strategy
 * @param {boolean} [orderDetails.isIsolated=false] - Whether it is isolated margin, default is false (cross margin)
 * @param {boolean} [orderDetails.autoBorrow=false] - Whether to auto borrow if balance is insufficient
 * @param {boolean} [orderDetails.autoRepay=false] - Whether to auto repay when closing the position
 * @param {String} [orderDetails.price] - Price for limit orders
 * @param {String} [orderDetails.size] - Quantity for the order
 * @param {String} [orderDetails.timeInForce='GTC'] - Order timing strategy, default is 'GTC'
 * @param {long} [orderDetails.cancelAfter] - Cancel after n seconds, applicable for 'GTT' orders
 * @param {boolean} [orderDetails.postOnly=false] - Whether the order is a passive order
 * @param {boolean} [orderDetails.hidden=false] - Whether the order is hidden
 * @param {boolean} [orderDetails.iceberg=false] - Whether the order is an iceberg order
 * @param {String} [orderDetails.visibleSize] - Maximum visible quantity in iceberg orders
 * @param {String} [orderDetails.funds] - Funds for market orders
 * @return {Object} The response from the API
 */
exports.placeHfMarginOrder = async function placeHfMarginOrder(orderDetails) {
  const response = await Http().POST('/api/v3/hf/margin/order', orderDetails);

  return response.data;
};

/**
 * @name testHfMarginOrder
 * @description Test placing a high-frequency margin trading order
 * @updateTime 07/12/24
 * @param {Object} orderDetails - The details of the order to be tested
 * @param {String} orderDetails.clientOid - Client Order Id, unique identifier created by the user
 * @param {String} orderDetails.side - Order side, either 'buy' or 'sell'
 * @param {String} orderDetails.symbol - Trading pair symbol
 * @param {String} [orderDetails.type='limit'] - Order type, either 'limit' or 'market'
 * @param {String} [orderDetails.stp] - Self trade prevention strategy
 * @param {boolean} [orderDetails.isIsolated=false] - Whether it is isolated margin, default is false (cross margin)
 * @param {boolean} [orderDetails.autoBorrow=false] - Whether to auto borrow if balance is insufficient
 * @param {boolean} [orderDetails.autoRepay=false] - Whether to auto repay when closing the position
 * @param {String} [orderDetails.price] - Price for limit orders
 * @param {String} [orderDetails.size] - Quantity for the order
 * @param {String} [orderDetails.timeInForce='GTC'] - Order timing strategy, default is 'GTC'
 * @param {long} [orderDetails.cancelAfter] - Cancel after n seconds, applicable for 'GTT' orders
 * @param {boolean} [orderDetails.postOnly=false] - Whether the order is a passive order
 * @param {boolean} [orderDetails.hidden=false] - Whether the order is hidden
 * @param {boolean} [orderDetails.iceberg=false] - Whether the order is an iceberg order
 * @param {String} [orderDetails.visibleSize] - Maximum visible quantity in iceberg orders
 * @param {String} [orderDetails.funds] - Funds for market orders
 * @return {Object} The response from the API
 */
exports.testHfMarginOrder = async function testHfMarginOrder(orderDetails) {
  const response = await Http().POST(
    '/api/v3/hf/margin/order/test',
    orderDetails
  );

  return response.data;
};

/**
 * @name cancelHfMarginOrder
 * @description Cancel a high-frequency margin trading order by orderId
 * @updateTime 07/12/24
 * @param {String} orderId - The unique identifier of the order to be canceled
 * @param {String} symbol - The trading pair symbol
 * @return {Object} The response from the API
 */
exports.cancelHfMarginOrder = async function cancelHfMarginOrder(
  orderId,
  symbol
) {
  const response = await Http().DEL(`/api/v3/hf/margin/orders/${orderId}`, {
    params: { symbol },
  });

  return response.data;
};

/**
 * @name cancelHfMarginOrderByClientOid
 * @description Cancel a high-frequency margin trading order by clientOid
 * @updateTime 07/12/24
 * @param {String} clientOid - The unique identifier of the order created by the client
 * @param {String} symbol - The trading pair symbol
 * @return {Object} The response from the API
 */
exports.cancelHfMarginOrderByClientOid =
  async function cancelHfMarginOrderByClientOid(clientOid, symbol) {
    const response = await Http().DEL(
      `/api/v3/hf/margin/orders/client-order/${clientOid}`,
      { params: { symbol } }
    );

    return response.data;
  };

/**
 * @name cancelAllHfMarginOrdersBySymbol
 * @description Cancel all open high-frequency margin trading orders by symbol
 * @updateTime 07/12/24
 * @param {String} symbol - The trading pair symbol
 * @param {String} tradeType - Transaction type, either 'MARGIN_TRADE' for cross margin trade or 'MARGIN_ISOLATED_TRADE' for isolated margin trade
 * @return {Object} The response from the API
 */
exports.cancelAllHfMarginOrdersBySymbol =
  async function cancelAllHfMarginOrdersBySymbol(symbol, tradeType) {
    const response = await Http().DEL('/api/v3/hf/margin/orders', {
      params: { symbol, tradeType },
    });

    return response.data;
  };

/**
 * @name getActiveHfMarginOrders
 * @description Get the list of active high-frequency margin trading orders
 * @updateTime 07/12/24
 * @param {String} tradeType - Order type, either 'MARGIN_TRADE' for cross margin trading order or 'MARGIN_ISOLATED_TRADE' for isolated margin trading order
 * @param {String} symbol - The trading pair symbol
 * @return {Object} The response from the API
 */
exports.getActiveHfMarginOrders = async function getActiveHfMarginOrders(
  tradeType,
  symbol
) {
  const response = await Http().GET('/api/v3/hf/margin/orders/active', {
    params: { tradeType, symbol },
  });

  return response.data;
};

/**
 * @name getFilledHfMarginOrders
 * @description Get the list of filled high-frequency margin trading orders
 * @updateTime 07/12/24
 * @param {String} tradeType - Transaction type, either 'MARGIN_TRADE' for cross margin trade or 'MARGIN_ISOLATED_TRADE' for isolated margin trade
 * @param {String} symbol - The trading pair symbol
 * @param {String} [side] - Order side, either 'buy' or 'sell' (optional)
 * @param {String} [type] - Order type, either 'limit' or 'market' (optional)
 * @param {long} [startAt] - Start time in milliseconds (optional)
 * @param {long} [endAt] - End time in milliseconds (optional)
 * @param {long} [lastId] - The id of the last data item from the previous batch (optional)
 * @param {int} [limit=100] - Maximum number of items to return, default is 100, maximum is 200 (optional)
 * @return {Object} The response from the API
 */
exports.getFilledHfMarginOrders = async function getFilledHfMarginOrders({
  tradeType,
  symbol,
  side,
  type,
  startAt,
  endAt,
  lastId,
  limit = 100,
}) {
  const params = {
    tradeType,
    symbol,
    side,
    type,
    startAt,
    endAt,
    lastId,
    limit,
  };

  const response = await Http().GET('/api/v3/hf/margin/orders/done', {
    params,
  });

  return response.data;
};

/**
 * @name getHfOrderDetails
 * @description Get details of a margin HF order by order ID
 * @updateTime 07/12/24
 * @param {String} orderId - Order ID (Mandatory)
 * @param {String} symbol - Trading pair (Mandatory)
 * @return {Object} - The details of the margin HF order
 */
exports.getHfOrderDetails = async function getHfOrderDetails({
  orderId,
  symbol,
}) {
  if (!orderId || !symbol) {
    throw new Error('Both orderId and symbol are required parameters.');
  }

  const response = await Http().GET(`/api/v3/hf/margin/orders/${orderId}`, {
    params: { symbol },
  });

  return response.data;
};

/**
 * @name getHfOrderDetailsByClientOid
 * @description Get details of a margin HF order by clientOid
 * @updateTime 07/12/24
 * @param {String} clientOid - Client OID (Mandatory)
 * @param {String} symbol - Trading pair (Mandatory)
 * @return {Object} - The details of the margin HF order
 */
exports.getHfOrderDetailsByClientOid =
  async function getHfOrderDetailsByClientOid({ clientOid, symbol }) {
    if (!clientOid || !symbol) {
      throw new Error('Both clientOid and symbol are required parameters.');
    }

    const response = await Http().GET(
      `/api/v3/hf/margin/orders/client-order/${clientOid}`,
      { params: { symbol } }
    );

    return response.data;
  };

/**
 * @name getHfTransactionRecords
 * @description Get the latest margin HF transaction details
 * @updateTime 07/12/24
 * @param {Object} params - Query parameters
 * @param {String} params.symbol - Trading pair (Mandatory)
 * @param {String} [params.orderId] - Order ID (Optional)
 * @param {String} [params.tradeType] - Trade type: MARGIN_TRADE or MARGIN_ISOLATED_TRADE (Mandatory)
 * @param {String} [params.side] - Buy or sell (Optional)
 * @param {String} [params.type] - Order type: limit or market (Optional)
 * @param {Number} [params.startAt] - Start time in milliseconds (Optional)
 * @param {Number} [params.endAt] - End time in milliseconds (Optional)
 * @param {Number} [params.lastId] - The ID of the last data item from the previous batch (Optional)
 * @param {Number} [params.limit] - Number of records to return, default 100, maximum 200 (Optional)
 * @return {Object} - The details of the margin HF transaction records
 */
exports.getHfTransactionRecords = async function getHfTransactionRecords(
  params
) {
  if (!params.symbol || !params.tradeType) {
    throw new Error('Both symbol and tradeType are required parameters.');
  }

  const response = await Http().GET('/api/v3/hf/margin/fills', { params });

  return response.data;
};

/**
 * @name getActiveHfOrderSymbols
 * @description Get all trading pairs with active orders
 * @updateTime 07/12/24
 * @param {String} tradeType - Trade type: MARGIN_TRADE or MARGIN_ISOLATED_TRADE (Mandatory)
 * @return {Object} - The list of trading pairs with active orders
 */
exports.getActiveHfOrderSymbols = async function getActiveHfOrderSymbols({
  tradeType,
}) {
  if (!tradeType) {
    throw new Error('tradeType is a required parameter.');
  }

  const response = await Http().GET('/api/v3/hf/margin/order/active/symbols', {
    params: { tradeType },
  });

  return response.data;
};
