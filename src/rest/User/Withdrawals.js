
const Http = require('../../lib/http');

/**
 * @name getWithdrawalsList
 * @description Get Withdrawals List.
 * @param {Object}
 *  - {string} currency - [Optional] Currency
 *  - {string} status - [Optional] Status. Available value: PROCESSING, WALLET_PROCESSING, SUCCESS, and FAILURE
 *  - {number} startAt - [Optional] Start time (milisecond)
 *  - {number} endAt - [Optional] End time (milisecond)
 * @return {Object} { code, success, data }
 */
exports.getWithdrawalsList = async function getWithdrawalsList({
  currency,
  status,
  startAt,
  endAt,
} = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "currentPage": 1,
      "pageSize": 10,
      "totalNum": 1,
      "totalPage": 1,
        "items": [{
          "id": "5c2dc64e03aa675aa263f1ac",
            "address": "0x5bedb060b8eb8d823e2414d82acce78d38be7fe9",
            "memo": "",
            "currency": "ETH",
            "amount": 1.0000000,
            "fee": 0.0100000,
            "walletTxId": "3e2414d82acce78d38be7fe9",
            "isInner": false,
            "status": "FAILURE",
            "remark": "test",
            "createdAt": 1546503758000,
            "updatedAt": 1546504603000
        }]
    }
  }
  */
  return await Http().GET('/api/v1/withdrawals', {
    currency,
    status,
    startAt,
    endAt,
  });
};


/**
 * @name getV1HistoricalWithdrawalsList
 * @description Get V1 Historical Withdrawals List.
 * @param {Object}
 *  - {number} currentPage - [Optional] The current page.
 *  - {number} pageSize - [Optional] Number of entries per page.
 *  - {string} currency - [Optional] Currency
 *  - {string} status - [Optional] Status. Available value: PROCESSING, SUCCESS, and FAILURE
 *  - {number} startAt - [Optional] Start time (milisecond)
 *  - {number} endAt - [Optional] End time (milisecond)
 * @return {Object} { code, success, data }
 */
exports.getV1HistoricalWithdrawalsList = async function getV1HistoricalWithdrawalsList({
  currentPage,
  pageSize,
  currency,
  status,
  startAt,
  endAt,
} = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "currentPage": 1,
      "pageSize": 1,
      "totalNum": 2,
      "totalPage": 2,
      "items": [{
        "currency": "BTC",
        "createAt": 1526723468,
        "amount": "0.534",
        "address": "33xW37ZSW4tQvg443Pc7NLCAs167Yc2XUV",
        "walletTxId": "aeacea864c020acf58e51606169240e96774838dcd4f7ce48acf38e3651323f4",
        "isInner": false,
        "status": "SUCCESS"
      }]
    }
  }
  */
  return await Http().GET('/api/v1/hist-withdrawals', {
    currentPage,
    pageSize,
    currency,
    status,
    startAt,
    endAt,
  });
};


/**
 * @name getWithdrawalQuotas
 * @description Get Withdrawal Quotas.
 * @param {string} currency - currency. e.g. BTC
 * @param {Object}
 *  - {string} chain - [Optional] The chain name of currency, e.g. The available value for USDT are OMNI, ERC20, TRC20, default is ERC20. This only apply for multi-chain currency, and there is no need for single chain currency.
 * @return {Object} { code, success, data }
 */
exports.getWithdrawalQuotas = async function getWithdrawalQuotas(currency, {
  chain,
} = {}) {
  /*
  {
    "code": "200000",     
    "data": {
        "currency": "KCS",
        "limitBTCAmount": "2.0",
        "usedBTCAmount": "0",
        "limitAmount": "75.67567568",
        "remainAmount": "75.67567568",
        "availableAmount": "9697.41991348",
        "withdrawMinFee": "0.93000000",
        "innerWithdrawMinFee": "0.00000000",
        "withdrawMinSize": "1.4",
        "isWithdrawEnabled": true,
        "precision": 8,   //withdrawal precision
        "chain": "OMNI"
    }
  }
  */
  return await Http().GET('/api/v1/withdrawals/quotas', {
    currency,
    chain,
  });
};

/**
 * @name applyWithdraw
 * @description Apply Withdraw.
 * @param {string} currency - Currency
 * @param {string} address - Withdrawal address
 * @param {number} amount - Withdrawal amount, a positive number which is a multiple of the amount precision (fees excluded)
 * @param {Object}
 *  - {string} memo - [Optional] Address remark. If there’s no remark, it is empty. When you withdraw from other platforms to the KuCoin, you need to fill in memo(tag). If you do not fill memo (tag), your deposit may not be available, please be cautious.
 *  - {boolean} isInner - [Optional] Internal withdrawal or not. Default setup: false
 *  - {string} remark - [Optional] Remark
 *  - {string} chain - [Optional] The chain name of currency, e.g. The available value for USDT are OMNI, ERC20, TRC20, default is ERC20. This only apply for multi-chain currency, and there is no need for single chain currency.
 * @return {Object} { code, success, data }
 */
exports.applyWithdraw = async function applyWithdraw(currency, address, amount, {
  memo,
  isInner,
  remark,
  chain,
} = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "withdrawalId": "5bffb63303aa675e8bbe18f9"
    }
  }
  */
  return await Http().POST('/api/v1/withdrawals', {
    currency,
    address,
    amount,
    memo,
    isInner,
    remark,
    chain,
  });
};

/**
 * @name cancelWithdrawal
 * @description Cancel Withdrawal. Only withdrawals requests of PROCESSING status could be canceled.
 * @param {string} withdrawalId - Path parameter, a unique ID for a withdrawal order
 * @return {Object} { code, success, data }
 */
exports.cancelWithdrawal = async function cancelWithdrawal(withdrawalId) {
  /*
  {
    "code": "200000",
  }
  */
  return await Http().DEL(`/api/v1/withdrawals/${withdrawalId}`);
};
