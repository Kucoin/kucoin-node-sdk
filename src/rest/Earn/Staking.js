/*
 * @Owner: gannicus.zhou@kupotech.com
 * @Date: 2024-07-10 11:40:45
 * @LastEditors: gannicus Gannicus.Zhou@kupotech.com
 * @LastEditTime: 2024-07-15 15:56:04
 * @FilePath: /kucoin-node-sdk/src/rest/Earn/Staking.js
 * @Description:
 */
const Http = require("../../lib/http");

/**
 * @name getKcsStakingProducts
 * @description Get KCS Staking products
 * @updateTime 07/12/24
 * @param {String} [currency] - Subscription currency (Optional)
 * @return {Object} - The response containing the list of KCS Staking products
 */
exports.getKcsStakingProducts = async function getKcsStakingProducts({
  currency,
}) {
  const params = currency ? { currency } : {};

  const response = await Http().GET("/api/v1/earn/kcs-staking/products", {
    params,
  });

  return response.data;
};

/**
 * @name getEarnStakingProducts
 * @description Get staking products
 * @updateTime 07/12/24
 * @param {String} [currency] - Subscription currency (Optional)
 * @return {Object} - The response containing the list of staking products
 */

exports.getEarnStakingProducts = async function getEarnStakingProducts({
  currency,
}) {
  const params = currency ? { currency } : {};

  const response = await Http().GET("/api/v1/earn/staking/products", {
    params,
  });

  return response.data;
};

/**

 * @name getEthStakingProducts
 * @description Get ETH Staking products
 * @updateTime 07/12/24
 * @return {Object} - The response containing the list of ETH Staking products
 */
exports.getEthStakingProducts = async function getEthStakingProducts() {
  const response = await Http().GET("/api/v1/earn/eth-staking/products");

  return response.data;
};
