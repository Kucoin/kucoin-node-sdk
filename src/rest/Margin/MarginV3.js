const Http = require("../../lib/http");
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

  // 对于逐仓账户，symbol 是必填的
  if (isIsolated && !symbol) {
    throw new Error("Symbol is required for isolated margin accounts.");
  }

  // 如果是逐仓模式，则需要添加 symbol 参数
  if (isIsolated) {
    payload.symbol = symbol;
  }

  try {
    // 发起 POST 请求
    return await Http().POST("/api/v3/margin/borrow", payload);
  } catch (error) {
    console.error("Error borrowing margin:", error);
    throw error;
  }
};


/**
* @name getBorrowHistory
* @description Request via this endpoint to retrieve the borrowing history for both isolated and cross-margin accounts.
* @updateTime 05/29/24
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
exports.getBorrowHistoryV3 = async function getBorrowHistoryV3({ currency, isIsolated, symbol, orderNo, startTime, endTime, currentPage, pageSize }) {
  return await Http().GET('/api/v3/margin/borrow', {
    currency, isIsolated, symbol, orderNo, startTime, endTime, currentPage, pageSize
  });
}

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
exports.repayMarginLoanV3 = async function repayMarginLoanV3({ isIsolated, isHf, symbol, currency, size }) {
  return await Http().POST('/api/v3/margin/repay', {
    isIsolated, isHf, symbol, currency, size
  });
}

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
exports.getRepayHistoryV3 = async function getRepayHistoryV3({ currency, isIsolated, symbol, orderNo, startTime, endTime, currentPage, pageSize }) {
  return await Http().GET('/api/v3/margin/repay', {
    currency, isIsolated, symbol, orderNo, startTime, endTime, currentPage, pageSize
  });
}

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
exports.getMarginInterestRecordsV3 = async function getMarginInterestRecordsV3({ isIsolated, symbol, currency, startTime, endTime, currentPage, pageSize }) {
  return await Http().GET('/api/v3/margin/interest', {
    isIsolated, symbol, currency, startTime, endTime, currentPage, pageSize
  });
}

/**
* @name getLendingCurrencyInfo
* @description Request via this endpoint to get information about lending currencies supported in the lending market.
* @updateTime 05/29/24
* @param {String} currency - Currency (Optional)
* @return {Object} { currency, purchaseEnable, redeemEnable, increment, minPurchaseSize, minInterestRate, maxInterestRate, interestIncrement, maxPurchaseSize, marketInterestRate, autoPurchaseEnable }
*/
exports.getLendingCurrencyInfoV3 = async function getLendingCurrencyInfoV3({ currency }) {
  return await Http().GET('/api/v3/project/list', {
    currency
  });
}

/**
* @name getMarketInterestRate
* @description Request via this endpoint to get the interest rates for the lending market over the last 7 days.
* @updateTime 05/29/24
* @param {String} currency - Currency (Mandatory)
* @return {Object[]} Array of { time, marketInterestRate }
*/
exports.getMarketInterestRateV3 = async function getMarketInterestRateV3({ currency }) {
  return await Http().GET('/api/v3/project/marketInterestRate', {
    currency
  });
}

/**
* @name initiatePurchase
* @description Request via this endpoint to initiate a subscription in the lending market.
* @updateTime 05/29/24
* @param {String} currency - Currency (Mandatory)
* @param {String} size - Subscription amount (Mandatory)
* @param {String} interestRate - Subscription interest rate (Mandatory)
* @return {Object} { orderNo }
*/
exports.initiatePurchaseV3 = async function initiatePurchaseV3({ currency, size, interestRate }) {
  return await Http().POST('/api/v3/purchase', {
    currency, size, interestRate
  });
}

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
exports.getPurchaseOrdersV3 = async function getPurchaseOrdersV3({ currency, status, currentPage, pageSize }) {
  return await Http().GET('/api/v3/purchase/orders', {
    currency, status, currentPage, pageSize
  });
}

/**
 * @name redeemMarket_V3
 * @description Initiates a redemption in the lending market
 * @updateTime 04/15/24
 * @param {String} currency - Currency (Mandatory)
 * @param {String} size - Redemption amount (Mandatory)
 * @param {String} purchaseOrderNo - Purchase order number (Mandatory)
 * @return {Object} { code, success, data }
 */
exports.redeemMarketV3 = async function redeemMarketV3({ currency, size, purchaseOrderNo }) {
  return await Http().POST('/api/v3/redeem', {
    currency,
    size,
    purchaseOrderNo
  });
}

/**
 * @name getRedemptionOrders_V3
 * @description Retrieve redemption orders from the lending market (paginated)
 * @updateTime 04/15/24
 * @param {String} currency - Currency (Mandatory)
 * @param {String} redeemOrderNo - Redemption order number (Optional)
 * @param {String} status - Status (Mandatory, values: DONE-已完結; PENDING-結算中)
 * @param {Int} currentPage - Current page (Optional, default: 1)
 * @param {Int} pageSize - Page size (Optional, default: 50, range: 1<=pageSize<=100)
 * @return {Object} { currency, purchaseOrderNo, redeemOrderNo, redeemSize, receiptSize, applyTime, status }
 */
exports.getRedemptionOrdersV3 = async function getRedemptionOrdersV3({ currency, redeemOrderNo, status, currentPage, pageSize }) {
  return await Http().GET('/api/v3/redeem/orders', {
    currency,
    redeemOrderNo,
    status,
    currentPage,
    pageSize
  });
}

/**
 * @name updatePurchaseOrderInterestRate_V3
 * @description Update the interest rate for a lending market purchase order (effective at the next whole hour)
 * @updateTime 04/15/24
 * @param {String} currency - Currency (Mandatory)
 * @param {String} purchaseOrderNo - Purchase order number (Mandatory)
 * @param {String} interestRate - Updated purchase interest rate (Mandatory)
 * @return {void}
 */
exports.updatePurchaseOrderInterestRateV3 = async function updatePurchaseOrderInterestRateV3({ currency, purchaseOrderNo, interestRate }) {
  await Http().POST('/api/v3/lend/purchase/update', {
    currency,
    purchaseOrderNo,
    interestRate
  });
}