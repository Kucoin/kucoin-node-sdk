
const Http = require('../../lib/http');

/**
 * @name createDepositAddress
 * @description Create Deposit Address.
 * @param {string} currency - Currency
 * @param {Object}
 *   - {string} chain - [Optional] The chain name of currency, e.g. The available value for USDT are OMNI, ERC20, TRC20, default is ERC20. This only apply for multi-chain currency, and there is no need for single chain currency.
 * @return {Object} { code, success, data }
 */
exports.createDepositAddress = async function createDepositAddress(currency, { chain } = {}) {
  /*
  {
    "code": "200000",     
    "data": {
        "address": "0x78d3ad1c0aa1bf068e19c94a2d7b16c9c0fcd8b1",
        "memo": "5c247c8a03aa677cea2a251d",   //tag
        "chain": "OMNI"
    }
  }
  */
  return await Http().POST('/api/v1/deposit-addresses', {
    currency,
    chain,
  });
};

/**
 * @name getDepositAddress
 * @description Get Deposit Address.
 * @param {string} currency - Currency
 * @param {Object}
 *   - {string} chain - [Optional] The chain name of currency, e.g. The available value for USDT are OMNI, ERC20, TRC20, default is ERC20. This only apply for multi-chain currency, and there is no need for single chain currency.
 * @return {Object} { code, success, data }
 */
exports.getDepositAddress = async function getDepositAddress(currency, { chain } = {}) {
  /*
  {
    "code": "200000",     
    "data": {
        "address": "0x78d3ad1c0aa1bf068e19c94a2d7b16c9c0fcd8b1",
        "memo": "5c247c8a03aa677cea2a251d",        //tag
        "chain": "OMNI"
    }
  }
  */
  return await Http().GET('/api/v1/deposit-addresses', {
    currency,
    chain,
  });
};

/**
 * @name getDepositAddressV2
 * @description Get Deposit Address V2.
 * @param {string} currency - Currency
 * @return {Object} { code, data }
 */
 exports.getDepositAddressV2 = async function getDepositAddressV2(currency) {
  /*
  {
    "code": "200000",
    "data": [
      {
        "address": "0x78d3ad1c0aa1bf068e19c94a2d7b16c9c0fcd8b1",
        "memo": "5c247c8a03aa677cea2a251d", // tag
        "chain": "OMNI",
        "contractAddress": ""  // The token contract address.
      }
    ]
  }
  */
  return await Http().GET('/api/v2/deposit-addresses', {
    currency,
  });
};

/**
 * @name getDepositList
 * @description Get Deposit List.
 * @param {Object}
 *   - {string} currency - [Optional] Currency
 *   - {number} startAt - [Optional] Start time (milisecond)
 *   - {number} endAt - [Optional] End time (milisecond)
 *   - {string} status - [Optional] Status. Available value: PROCESSING, SUCCESS, and FAILURE
 * @return {Object} { code, success, data }
 */
exports.getDepositList = async function getDepositList({
  currency,
  startAt,
  endAt,
  status,
} = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "currentPage": 1,
      "pageSize": 5,
      "totalNum": 2,
      "totalPage": 1,
        "items": [{
            "address": "0x5f047b29041bcfdbf0e4478cdfa753a336ba6989",
            "memo": "5c247c8a03aa677cea2a251d",   
            "amount": 1,
            "fee": 0.0001,
            "currency": "KCS",
            "isInner": false,
            "walletTxId": "5bbb57386d99522d9f954c5a@test004",
            "status": "SUCCESS",
            "remark": "test",
            "createdAt": 1544178843000,
            "updatedAt": 1544178891000
        }, {
            "address": "0x5f047b29041bcfdbf0e4478cdfa753a336ba6989",
            "memo": "5c247c8a03aa677cea2a251d",
            "amount": 1,
            "fee": 0.0001,
            "currency": "KCS",
            "isInner": false,
            "walletTxId": "5bbb57386d99522d9f954c5a@test003",
            "status": "SUCCESS",
            "remark": "test",
            "createdAt": 1544177654000,
            "updatedAt": 1544178733000
        }]
    }
  }
  */
  return await Http().GET('/api/v1/deposits', {
    currency,
    startAt,
    endAt,
    status,
  });
};

/**
 * @name getV1HistoricalDepositsList
 * @description Get V1 Historical Deposits List
 * @param {Object}
 *   - {string} currency - [Optional] Currency
 *   - {number} startAt - [Optional] Start time (milisecond)
 *   - {number} endAt - [Optional] End time (milisecond)
 *   - {string} status - [Optional] Status. Available value: PROCESSING, SUCCESS, and FAILURE
 * @return {Object} { code, success, data }
 */
exports.getV1HistoricalDepositsList = async function getV1HistoricalDepositsList({
  currency,
  startAt,
  endAt,
  status,
} = {}) {
  /*
  {
    "code": "200000",     
    "data": {
        "currentPage": 1,
        "pageSize": 1,
        "totalNum": 9,
        "totalPage": 9,
        "items": [{
            "currency": "BTC",
            "createAt": 1528536998,
            "amount": "0.03266638",
            "walletTxId": "55c643bc2c68d6f17266383ac1be9e454038864b929ae7cee0bc408cc5c869e8@12ffGWmMMD1zA1WbFm7Ho3JZ1w6NYXjpFk@234",
            "isInner": false,
            "status": "SUCCESS"
        }]
    }
  }
  */
  return await Http().GET('/api/v1/hist-deposits', {
    currency,
    startAt,
    endAt,
    status,
  });
};
