const API = require("../src");

API.init(require("./config"));

const marginMain = async () => {
  const getTimestampRl = await API.rest.Others.getTimestamp();
  console.log(getTimestampRl.data);

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
  async function marginBorrowV3() {
    try {
      // Prepare the data to send along with the margin borrow request
      const requestData = {
        isIsolated: true, // We are assuming isolated margin
        symbol: "BTC-USDT", // The trading pair
        currency: "BTC", // The currency to borrow
        size: "0.01", // The amount to borrow
        timeInForce: "IOC", // Order time in force policy
        // Optionally, if high frequency borrowing is needed, set isHf to true
        // isHf: true
      };

      // Call the borrowMargin function with the requestData object
      const response = await API.rest.Margin.MarginV3.marginBorrowV3(requestData);

      // Log the response from the API
      console.log("Borrow Margin Response:", response);
    } catch (error) {
      // Log the error in case of a failure
      console.error("Error performing borrow margin:", error);
    }
  }
  marginBorrowV3();

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
  async function getBorrowHistoryV3() {
    try {
      const result = await API.rest.Margin.MarginV3.getBorrowHistoryV3({
        currency: "USDT",
        isIsolated: false,
        symbol: "BTC-USDT",
        currentPage: 1,
        pageSize: 10,
      });

      console.log("Borrow history:", result);
    } catch (error) {
      console.error("Error fetching borrow history:", error.message);
    }
  }
  getBorrowHistoryV3();

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
  async function repayMarginLoanV3() {
    try {
      const result = await API.rest.Margin.MarginV3.repayMarginLoanV3({
        currency: "USDT",
        size: 10,
      });

      console.log("Repayment order details:", result);
    } catch (error) {
      console.error("Error initiating repayment:", error.message);
    }
  }
  repayMarginLoanV3();

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
  async function getRepayHistoryV3() {
    try {
      const result = await API.rest.Margin.MarginV3.getRepayHistoryV3({
        currency: "USDT",
        currentPage: 1,
        pageSize: 10,
      });

      console.log("Repayment history:", result);
    } catch (error) {
      console.error("Error fetching repayment history:", error.message);
    }
  }
  getRepayHistoryV3();

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
  async function getMarginInterestRecordsV3() {
    try {
      const result = await API.rest.Margin.MarginV3.getMarginInterestRecordsV3({
        currency: "USDT",
        currentPage: 1,
        pageSize: 10,
      });

      console.log("Interest records:", result);
    } catch (error) {
      console.error("Error fetching interest records:", error.message);
    }
  }
  getMarginInterestRecordsV3();

  /**
   * @name getLendingCurrencyInfo
   * @description Request via this endpoint to get information about lending currencies supported in the lending market.
   * @updateTime 05/29/24
   * @param {String} currency - Currency (Optional)
   * @return {Object} { currency, purchaseEnable, redeemEnable, increment, minPurchaseSize, minInterestRate, maxInterestRate, interestIncrement, maxPurchaseSize, marketInterestRate, autoPurchaseEnable }
   */
  async function getLendingCurrencyInfoV3() {
    try {
      const result = await API.rest.Margin.MarginV3.getLendingCurrencyInfoV3({
        currency: "BTC",
      });

      console.log("Lending currency info:", result);
    } catch (error) {
      console.error("Error fetching lending currency info:", error.message);
    }
  }
  getLendingCurrencyInfoV3();

  /**
   * @name getMarketInterestRate
   * @description Request via this endpoint to get the interest rates for the lending market over the last 7 days.
   * @updateTime 05/29/24
   * @param {String} currency - Currency (Mandatory)
   * @return {Object[]} Array of { time, marketInterestRate }
   */
  async function getMarketInterestRateV3() {
    try {
      const result = await API.rest.Margin.MarginV3.getMarketInterestRateV3({
        currency: "BTC",
      });

      console.log("Market interest rates:", result);
    } catch (error) {
      console.error("Error fetching market interest rates:", error.message);
    }
  }
  getMarketInterestRateV3();

  /**
   * @name initiatePurchase
   * @description Request via this endpoint to initiate a subscription in the lending market.
   * @updateTime 05/29/24
   * @param {String} currency - Currency (Mandatory)
   * @param {String} size - Subscription amount (Mandatory)
   * @param {String} interestRate - Subscription interest rate (Mandatory)
   * @return {Object} { orderNo }
   */
  async function initiatePurchaseV3() {
    try {
      const result = await API.rest.Margin.MarginV3.initiatePurchaseV3({
        currency: "BTC",
        size: "1000",
        interestRate: "0.005",
      });

      console.log("Purchase order details:", result);
    } catch (error) {
      console.error("Error initiating purchase:", error.message);
    }
  }
  initiatePurchaseV3();

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
  async function getPurchaseOrdersV3() {
    try {
      const result = await API.rest.Margin.MarginV3.getPurchaseOrdersV3({
        currency: "BTC",
        status: "DONE",
        currentPage: 1,
        pageSize: 10,
      });

      console.log("Purchase orders:", result);
    } catch (error) {
      console.error("Error fetching purchase orders:", error.message);
    }
  }
  getPurchaseOrdersV3();

  /**
   * @name redeemMarket_V3
   * @description Initiates a redemption in the lending market
   * @updateTime 05/29/24
   * @param {String} currency - Currency (Mandatory)
   * @param {String} size - Redemption amount (Mandatory)
   * @param {String} purchaseOrderNo - Purchase order number (Mandatory)
   * @return {Object} { code, success, data }
   */
  async function redeemMarketV3() {
    try {
      const result = await API.rest.Margin.MarginV3.redeemMarketV3({
        currency: "USDT",
        size: "100",
        purchaseOrderNo: "5da6dba0f943c0c81f5d5db5",
      });
      console.log("Redemption order number:", result.data.orderNo);
    } catch (error) {
      console.error("Error fetching postRedeemMarketV3 orders:", error.message);
    }
  }
  redeemMarketV3();

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
  async function getRedemptionOrdersV3() {
    try {
      const result = await API.rest.Margin.MarginV3.getRedemptionOrdersV3({
        currency: "BTC",
        status: "PENDING",
        currentPage: 1,
        pageSize: 10,
      });
      console.log("Redemption order number:", result.data.orderNo);
    } catch (error) {
      console.error("Error fetching redemption orders:", error.message);
    }
  }
  getRedemptionOrdersV3();

  /**
   * @name updatePurchaseOrderInterestRateV3
   * @description Update the interest rate for a lending market purchase order (effective at the next whole hour)
   * @updateTime 05/29/24
   * @param {String} currency - Currency (Mandatory)
   * @param {String} purchaseOrderNo - Purchase order number (Mandatory)
   * @param {String} interestRate - Updated purchase interest rate (Mandatory)
   * @return {void}
   */
  async function getRedemptionOrdersV3() {
    try {
      const result = await API.rest.Margin.MarginV3.updatePurchaseOrderInterestRateV3({
        currency: "BTC",
        purchaseOrderNo: "5da6dba0f943c0c81f5d5db5",
        interestRate: "0.05", // Updated interest rate
      });
      console.log("purchaseOrderNo number:", result.data.purchaseOrderNo);
    } catch (error) {
      console.error("Error fetching purchaseOrderNo:", error.message);
    }
  }

  getRedemptionOrdersV3();
};

// run rest marginMain
marginMain();
