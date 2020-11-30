
const Http = require('../../lib/http');

/**
 * @name createAccount
 * @description Create an Account.
 * @param {string} type - Account type: main, trade, margin
 * @param {string} currency - currency https://sandbox-docs.kucoin.com/#get-currencies
 * @return {Object} { code, success, data }
 */
exports.createAccount = async function createAccount(type, currency) {
  /*
  {
    "code": "200000",     
    "data": {
      "id": "5bd6e9286d99522a52e458de"  //accountId
    }
  }
  */
  return await Http().POST('/api/v1/accounts', {
    type,
    currency,
  });
};

/**
 * @name getAccountsList
 * @description List Accounts.
 * @param {Object}
 *   - {string} type - [Optional] Account type: main, trade, margin or pool
 *   - {string} currency - [Optional] currency https://sandbox-docs.kucoin.com/#get-currencies
 * @return {Object} { code, success, data }
 */
exports.getAccountsList = async function getAccountsList({ type, currency } = {}) {
  /*
  {
    "code": "200000",     
    "data": [{
        "id": "5bd6e9286d99522a52e458de",  //accountId
        "currency": "BTC",  //Currency
        "type": "main",     //Account type, including main and trade
        "balance": "237582.04299",  //Total assets of a currency
        "available": "237582.032",  //Available assets of a currency
        "holds": "0.01099". //Hold assets of a currency
    },
    {
        "id": "5bd6e9216d99522a52e458d6",
        "currency": "BTC",
        "type": "trade",
        "balance": "1234356",
        "available": "1234356",
        "holds": "0"
    }]
  }
  */
  return await Http().GET('/api/v1/accounts', {
    type,
    currency,
  });
};

/**
 * @name getAccountInformation
 * @description Get an Account.
 * @param {string} accountId - ID of the account
 * @return {Object} { code, success, data }
 */
exports.getAccountInformation = async function getAccountInformation(accountId) {
  /*
  {
    "code": "200000",     
    "data": {
        "currency": "KCS",  //Currency
        "balance": "1000000060.6299",  //Total assets of a currency
        "available": "1000000060.6299",  //Available assets of a currency
        "holds": "0". //Hold assets of a currency
    }
  }
  */
  return await Http().GET(`/api/v1/accounts/${accountId}`);
};

/**
 * @name getAccountLedgers
 * @description Get Account Ledgers.
 * @param {Object}
 *   - {string} currency - [Optional] Currency ( you can choose more than one currency). You can specify 10 currencies at most for one time. If not specified, all currencies will be inquired by default.
 *   - {string} direction - [Optional] Side: in - Receive, out - Send
 *   - {string} bizType - [Optional] Business type: DEPOSIT, WITHDRAW, TRANSFER, SUB_TRANSFER,TRADE_EXCHANGE, MARGIN_EXCHANGE, KUCOIN_BONUS.
 *   - {number} startAt - [Optional] Start time (milisecond)
 *   - {number} endAt - [Optional] End time (milisecond)
 * @return {Object} { code, success, data }
 */
exports.getAccountLedgers = async function getAccountLedgers(
  {
    currency,
    direction,
    bizType,
    startAt,
    endAt,
  } = {}
) {
  /*
  {
    "code": "200000",     
    "data": {
      "currentPage": 1,
      "pageSize": 10,
      "totalNum": 3,
      "totalPage": 1,
      "items": [
          {
              "id": "5bc7f080b39c5c03486eef8c",//unique key
              "currency": "KCS",  //Currency
              "amount": "0.0998", //Change amount of the funds
              "fee": "0",  //Deposit or withdrawal fee
              "balance": "0",  //Total assets of a currency
              "bizType": "Withdraw",  //business type
              "direction": "in",     //side, in or out
              "createdAt": 1540296039000,  //Creation time
              "context": {          //Business core parameters

                  "orderId": "5bc7f080b39c5c03286eef8a",
                  "txId": "bf848bfb6736780b930e12c68721ea57f8b0484a4af3f30db75c93ecf16905c9"
              }
          },
          {
              "id": "5bc7f080b39c5c03486def8c",//unique key
              "currency": "KCS",
              "amount": "0.0998",
              "fee": "0",
              "balance": "0",
              "bizType": "Deposit",
              "direction": "in",
              "createdAt": 1540296039000,
              "context": {

                  "orderId": "5bc7f080b39c5c03286eef8a",
                  "txId": "bf848bfb6736780b930e12c68721ea57f8b0484a4af3f30db75c93ecf16905c9"
              }
          },
          {
              "id": "5bc7f080b39c5c03486def8a",//unique key
              "currency": "KCS",
              "amount": "0.0998",
              "fee": "0",
              "balance": "0",
              "bizType": "trade exchange",
              "direction": "in",
              "createdAt": 1540296039000,
              "context": {

                  "tradeId": "5bc7f080b3949c03286eef8a",
                  "orderId": "5bc7f080b39c5c03286eef8e",
                  "symbol": "BTC-USD"
              }
          }
      ]
    }
  }
  */
  return await Http().GET(`/api/v1/accounts/ledgers`, {
    currency,
    direction,
    bizType,
    startAt,
    endAt,
  });
};

/**
 * @name getHolds
 * @description Get Holds.
 * @param {string} accountId - ID of the account.
 * @return {Object} { code, success, data }
 */
exports.getHolds = async function getHolds(accountId) {
  /*
  {
    "code": "200000",     
    "data": {
        "currentPage": 1,
        "pageSize": 10,
        "totalNum": 2,
        "totalPage": 1,
        "items": [
            {
                "currency": "ETH",  //Currency
                "holdAmount": "5083",  //Hold amount of a currency
                "bizType": "Withdraw",     //business type
                "orderId": "5bc7f080b39c5c03286eef8e", // ID of funds freezed order 
                "createdAt": 1545898567000, //Creation time
                "updatedAt": 1545898567000。//update time
            },
            {
                "currency": "ETH",
                "holdAmount": "1452",
                "bizType": "Withdraw",
                "orderId": "5bc7f518b39c5c033818d62d",
                "createdAt": 1545898567000,
                "updatedAt": 1545898567000
            }
        ]
    }
  }
  */
  return await Http().GET(`/api/v1/accounts/${accountId}/holds`);
};

/**
 * @name getBalanceOfSubAccount
 * @description Get Account Balance of a Sub-Account.
 * @param {string} subUserId - the user ID of a sub-account.
 * @return {Object} { code, success, data }
 */
exports.getBalanceOfSubAccount = async function getBalanceOfSubAccount(subUserId) {
  /*
  {
    "code": "200000",     
    "data": {
        "subUserId": "5caefba7d9575a0688f83c45", 
        "subName": "sdfgsdfgsfd",
        "mainAccounts": [{
            "currency": "BTC",
            "balance": "8",
            "available": "8",
            "holds": "0",
            "baseCurrency": "BTC",
            "baseCurrencyPrice": "1",
            "baseAmount": "1.1"
        }],
        "tradeAccounts": [{
            "currency": "BTC",
            "balance": "1000",
            "available": "1000",
            "holds": "0",
            "baseCurrency": "BTC",
            "baseCurrencyPrice": "1",
            "baseAmount": "1.1"
        }],
        "marginAccounts": [{
          "currency": "BTC",
          "balance": "1.1",
          "available": "1.1",
          "holds": "0",
          "baseCurrency": "BTC",
          "baseCurrencyPrice": "1",
          "baseAmount": "1.1"
        }]
    }
  }
  */
  return await Http().GET(`/api/v1/sub-accounts/${subUserId}`);
};

/**
 * @name getAggregatedBalanceOfAllSubAccounts
 * @description Get the Aggregated Balance of all Sub-Accounts.
 * @return {Object} { code, success, data }
 */
exports.getAggregatedBalanceOfAllSubAccounts = async function getAggregatedBalanceOfAllSubAccounts() {
  /*
  {
    "code": "200000",     
    "data": [
      {
            "subUserId": "5caefba7d9575a0688f83c45",
            "subName": "kucoin1",
            "mainAccounts": [{
                "currency": "BTC",
                "balance": "6",
                "available": "6",
                "holds": "0",
                "baseCurrency": "BTC",
                "baseCurrencyPrice": "1",
                "baseAmount": "1.1"
              }],
            "tradeAccounts": [{
                "currency": "BTC",
                "balance": "1000",
                "available": "1000",
                "holds": "0",
                "baseCurrency": "BTC",
                "baseCurrencyPrice": "1",
                "baseAmount": "1.1"
              }],
            "marginAccounts": [{
                "currency": "BTC",
                "balance": "1.1",
                "available": "1.1",
                "holds": "0",
                "baseCurrency": "BTC",
                "baseCurrencyPrice": "1",
                "baseAmount": "1.1"
            }]
      }
    ]
  }
  */
  return await Http().GET('/api/v1/sub-accounts');
};

/**
 * @name getTransferable
 * @description Get the Transferable.
 * @param {string} type - The account type: MAIN, TRADE, MARGIN or POOL
 * @param {string} currency - currency https://sandbox-docs.kucoin.com/#Get-Currencies
 * @return {Object} { code, success, data }
 */
exports.getTransferable = async function getTransferable(type, currency) {
  /*
  {
    "code": "200000",     
    "data":  {
        "currency": "KCS",
        "balance": "0",
        "available": "0",
        "holds": "0",
        "transferable": "0"
    }
  }
  */
  return await Http().GET('/api/v1/accounts/transferable', {
    currency,
    type,
  });
};

/**
 * @name transferBetweenMasterUserAndSubUser
 * @description Transfer between Master user and Sub-user.
 * @param {string} clientOid - Unique order id created by users to identify their orders, e.g. UUID.
 * @param {string} currency - currency https://sandbox-docs.kucoin.com/#Get-Currencies
 * @param {string} amount - Transfer amount, the amount is a positive integer multiple of the currency precision.
 * @param {string} direction - OUT — the master user to sub user, IN — the sub user to the master user.
 * @param {string} subUserId - the user ID of a sub-account.
 * @param {Object}
 *   - {string} accountType - [Optional] The account type of the master user: MAIN
 *   - {string} subAccountType - [Optional] The account type of the sub user: MAIN, TRADE or MARGIN, default is MAIN.
 * @return {Object} { code, success, data }
 */
exports.transferBetweenMasterUserAndSubUser = async function transferBetweenMasterUserAndSubUser(
  clientOid,
  currency,
  amount,
  direction,
  subUserId,
  {
    accountType,
    subAccountType,
  } = {}
) {
  /*
  {
    "code": "200000",     
    "data": {
        "orderId": "5cbd870fd9575a18e4438b9a"
    }
  }
  */
  return await Http().POST('/api/v2/accounts/sub-transfer', {
    clientOid,
    currency,
    amount,
    direction,
    accountType,
    subAccountType,
    subUserId,
  });
};

/**
 * @name innerTransfer
 * @description Inner Transfer
 * @param {string} clientOid - Unique order id created by users to identify their orders, e.g. UUID.
 * @param {string} currency - currency https://sandbox-docs.kucoin.com/#Get-Currencies
 * @param {string} from - Account type of payer: main, trade, margin or pool
 * @param {string} to - Account type of payee: main, trade, margin or pool
 * @param {string} amount - Transfer amount, the amount is a positive integer multiple of the currency precision.
 * @return {Object} { code, success, data }
 */
exports.innerTransfer = async function innerTransfer(
  clientOid,
  currency,
  from,
  to,
  amount,
) {
  /*
  {
    "code": "200000",     
    "data": {
        "orderId": "5bd6e9286d99522a52e458de"
    }
  }
  */
  return await Http().POST('/api/v2/accounts/inner-transfer', {
    clientOid,
    currency,
    from,
    to,
    amount,
  });
};
