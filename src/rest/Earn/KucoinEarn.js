const Http = require("../../lib/http");

/**
 * @name getEarnSavingsProducts
 * @description Get savings products
 * @updateTime 07/12/24
 * @param {String} [currency] - Subscription currency (Optional)
 * @return {Object} - The response containing the list of savings products
 */
exports.getEarnSavingsProducts = async function getEarnSavingsProducts({
  currency,
}) {
  const params = currency ? { currency } : {};

  const response = await Http().GET("/api/v1/earn/saving/products", { params });

  return response.data;
};

/**
 * @name getEarnFixedIncomeCurrentHoldings
 * @description Get current holding assets of fixed income products
 * @updateTime 07/12/24
 * @param {Number} [currentPage=1] - Page number (Optional, default is 1)
 * @param {Number} [pageSize=20] - Number of items per page (Optional, default is 20)
 * @param {String} [productId] - Product ID (Optional)
 * @param {String} [productCategory] - Product category (Optional)
 * @param {String} [currency] - Subscription currency (Optional)
 * @return {Object} - The response containing the list of current holdings
 */
exports.getEarnFixedIncomeCurrentHoldings =
  async function getEarnFixedIncomeCurrentHoldings({
    currentPage = 1,
    pageSize = 20,
    productId,
    productCategory,
    currency,
  }) {
    const params = {
      currentPage,

      pageSize,

      ...(productId && { productId }),

      ...(productCategory && { productCategory }),

      ...(currency && { currency }),
    };

    const response = await Http().GET("/api/v1/earn/hold-assets", { params });

    return response.data;
  };

/**
 * @name getEarnPromotionProducts
 * @description Get limited-time promotion products
 * @updateTime 07/12/24
 * @param {String} [currency] - Subscription currency (Optional)
 * @return {Object} - The response containing the list of promotion products
 */
exports.getEarnPromotionProducts = async function getEarnPromotionProducts({
  currency,
}) {
  const params = currency ? { currency } : {};

  const response = await Http().GET("/api/v1/earn/promotion/products", {
    params,
  });

  return response.data;
};
