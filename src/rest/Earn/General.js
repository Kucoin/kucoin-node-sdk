const Http = require("../../lib/http");

/**
 * @name subscribeToEarnFixedIncomeProducts
 * @description Subscribe to fixed income products
 * @updateTime 07/12/24
 * @param {String} productId - Product ID (Mandatory)
 * @param {String} amount - Subscription amount (Mandatory)
 * @param {String} accountType - Account type: MAIN (funding account), TRADE (trading account) (Mandatory)
 * @return {Object} - The response containing orderId and orderTxId
 */

exports.subscribeToEarnFixedIncomeProducts =
  async function subscribeToEarnFixedIncomeProducts({
    productId,
    amount,
    accountType,
  }) {
    const response = await Http().POST("/api/v1/earn/orders", {
      productId,

      amount,

      accountType,
    });

    return response.data;
  };

/**
 * @name redeemByEarnHoldingId
 * @description Initiate redemption by holding ID
 * @updateTime 07/12/24
 * @param {String} orderId - Holding ID (Mandatory)
 * @param {String} amount - Redemption amount (Mandatory)
 * @param {String} [fromAccountType] - Account type: MAIN (funding account), TRADE (spot trading account). This parameter is valid only when orderId=ETH2 (Optional)
 * @param {String} [confirmPunishRedeem] - Confirmation field for early redemption penalty: 1 (confirm early redemption, and the current holding will be fully redeemed). This parameter is valid only for fixed-term products (Optional)
 * @return {Object} - The response containing orderTxId, deliverTime, status, and amount
 */
exports.redeemByEarnHoldingId = async function redeemByEarnHoldingId({
  orderId,
  amount,
  fromAccountType,
  confirmPunishRedeem,
}) {
  const params = {
    orderId,
    amount,
    ...(fromAccountType && { fromAccountType }),
    ...(confirmPunishRedeem && { confirmPunishRedeem }),
  };

  const response = await Http().DEL("/api/v1/earn/orders", { params });

  return response.data;
};

/**

 * @name getEarnRedeemPreviewByHoldingId
 * @description Get redemption preview information by holding ID
 * @updateTime 07/12/24
 * @param {String} orderId - Holding ID (Mandatory)
 * @param {String} [fromAccountType] - Account type: MAIN (funding account), TRADE (spot trading account). This parameter is valid only when orderId=ETH2 (Optional)
 * @return {Object} - The response containing redemption preview information
 */

exports.getEarnRedeemPreviewByHoldingId =
  async function getEarnRedeemPreviewByHoldingId({ orderId, fromAccountType }) {
    const params = {
      orderId,
      ...(fromAccountType && { fromAccountType }),
    };

    const response = await Http().GET("/api/v1/earn/redeem-preview", {
      params,
    });

    return response.data;
  };
