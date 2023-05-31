
const Http = require('../../lib/http');

/**
 * @name createAccount
 * @description Create an Account.
 * @updateTime 11/08/22
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
 * @updateTime 07/05/22
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
 * @updateTime 07/05/22
 * @param {string} clientOid - Unique order id created by users to identify their orders, e.g. UUID.
 * @param {string} currency - currency https://sandbox-docs.kucoin.com/#Get-Currencies
 * @param {string} from - Account type of payer: main, trade, margin or pool
 * @param {string} to - Account type of payee: main, trade, margin or pool
 * @param {string} amount - Transfer amount, the amount is a positive integer multiple of the currency precision.
//  * @param {string} fromTag [Optional] Trading pair, required when the payment account type is isolated, e.g.: BTC-USDT
//  * @param {string} toTag [Optional] Trading pair, required when the receiving account type is isolated, e.g.: BTC-USDT
 * @return {Object} { code, success, data }
 */
exports.innerTransfer = async function innerTransfer(
  clientOid,
  currency,
  from,
  to,
  amount
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
    amount
  });
};

// owen.guo@kupotech.com update api

/**
 * @name getAccountSummaryInfo
 * @description Get Account Summary Info(V2)
 * @updateTime 08/04/23
 * @return {Object} { code, success, data }
 */
exports.getAccountSummaryInfo = async function getAccountSummaryInfo() {
  return await Http().GET('/api/v2/user-info');
}

/**
 * @name createSubAccount
 * @description Create Sub-Account(V2)
 * @updateTime 08/04/23
 * @param {Object}
 * - {String} password Password(7-24 characters, must contain letters and numbers, cannot only contain numbers or include special characters)
 * - {String} remarks [Optional] Remarks(1~24 characters)
 * - {String} subName Sub-account name(must contain 7-32 characters, at least one number and one letter. Cannot contain any spaces.)
 * - {String} access Permission (types include Spot, Futures, Margin permissions, which can be used alone or in combination).
 * @return {Object} { code, success, data }
 */
exports.createSubAccount = async function createSubAccount({password,remarks,subName,access}) {
  return await Http().POST('/api/v2/sub/user/created',{
    password,remarks,subName,access
  });
}

/**
 * @name getSubAccountSpotApiList
 * @description Get Sub-Account Spot API List
 * @updateTime 08/24/22
 * @param {Object}
 * - {String} apiKey [Optional] API-Key.
 * - {String} subName Sub-account name.
 * @return {Object} { code, success, data }
 */
exports.getSubAccountSpotApiList = async function getSubAccountSpotApiList({apiKey,subName}) {
  return await Http().GET('/api/v1/sub/api-key',{
    apiKey,subName
  });
}

/**
 * @name createSpotAPIsForSubAccount
 * @description Create Spot APIs for Sub-Account
 * @updateTime 08/24/22
 * @param {Object}
 * - {String} subName Sub-account name, create sub account name of API Key.
 * - {String} passphrase Password(Must contain 7-32 characters. Cannot contain any spaces.)
 * - {String} remark Remarks(1~24 characters)
 * - {String} permission [Optional] Permissions(Only "General" and "Trade" permissions can be set, such as "General, Trade". The default is "General")
 * - {String} ipWhitelist [Optional] IP whitelist(You may add up to 20 IPs. Use a halfwidth comma to each IP)
 * - {String} expire [Optional] API expiration time; Never expire(default)-1，30Day30，90Day90，180Day180，360Day360
 * @return {Object} { code, success, data }
 */
exports.createSpotAPIsForSubAccount = async function createSpotAPIsForSubAccount({subName,passphrase,remark,permission,ipWhitelist,expire}) {
  return await Http().POST('/api/v1/sub/api-key',{
    subName,passphrase,remark,permission,ipWhitelist,expire
  });
}

/**
 * @name updateSubAccountSpotApis
 * @description Modify Sub-Account Spot APIs
 * @updateTime 08/24/22
 * @param {Object}
 * - {String} subName Sub-account name, create sub account name of API Key.
 * - {String} apiKey API-Key(Sub-account APIKey)
 * - {String} passphrase Password of API key
 * - {String} permission [Optional] Permission list.If modified, permissions will be reset.
 * - {String} ipWhitelist [Optional] IP whitelist(you may add up to 20 IPs. Use a halfwidth comma to each IP.If modified, the IP will be reset.)
 * - {String} expire [Optional] API expiration time; Never expire(default)-1，30Day30，90Day90，180Day180，360Day360
 * @return {Object} { code, success, data }
 */
exports.updateSubAccountSpotApis = async function updateSubAccountSpotApis({subName,apiKey,passphrase,permission,ipWhitelist,expire}) {
  return await Http().POST('/api/v1/sub/api-key/update',{
    subName,apiKey,passphrase,permission,ipWhitelist,expire
  });
}

/**
 * @name deleteSubAccountSpotApis
 * @description Delete Sub-Account Spot APIs
 * @updateTime 09/22/22
 * @param {Object}
 * - {String} apiKey API-Key(API key to be deleted)
 * - {String} passphrase Password(Password of the API key)
 * - {String} subName Sub-account name(The sub-account name corresponding to the API key)
 * @return {Object} { code, success, data }
 */

exports.deleteSubAccountSpotApis = async function deleteSubAccountSpotApis({apiKey,passphrase,subName}) {
  return await Http().DEL('/api/v1/sub/api-key',{
    apiKey,passphrase,subName
  });
}

/**
 * @name getPaginatedSubAccountInformation
 * @description Get Paginated Sub-Account Information.
 * @param {Object}
 * - {Int} currentPage [Optional] Current request page. Default is 1
 * - {Int} pageSize [Optional] Number of results per request. Minimum is 1, maximum is 100, default is 10.
 * @return {Object} { code, success, data }
 */
exports.getPaginatedSubAccountInformation = async function getPaginatedSubAccountInformation({currentPage,pageSize}) {
  return await Http().GET('/api/v2/sub-accounts',{
    currentPage,pageSize
  });
}

/**
 * @name transferToHFAccount
 * @description transferToHFAccount
 * @param {Object}
 * - {string} clientOid - Unique order id created by users to identify their orders, e.g. UUID.
 * - {string} type - The account type: MAIN, TRADE, MARGIN or POOL
 * - {string} currency - currency https://sandbox-docs.kucoin.com/#Get-Currencies
 * - {string} from - Account type of payer: main, trade, margin or pool
 * - {string} to - Account type of payee: main, trade, margin or pool
 * - {string} amount - Transfer amount, the amount is a positive integer multiple of the currency precision.
 * @return {Object} { code, success, data }
 */


exports.transferToHFAccount = async function transferToHFAccount({
  clientOid,
  currency,
  from,
  to,
  amount,
  type
}){
  try{
    const innerTransferResult = await this.innerTransfer(clientOid, currency,from,to,amount)
    // console.log(innerTransferResult,"innerTransferResult---")
    const getTransferableResult = await this.getTransferable(type,currency)
    // console.log(getTransferableResult,'getTransferableResult---')
    if(innerTransferResult?.code==='200000'){
      return getTransferableResult;
    } else {
      return {
        msg:innerTransferResult?.msg || 'transferToHFAccount-error',
        code:innerTransferResult?.code || '400000',
        data: {
          currency: 'USDT',
          balance: '0',
          available: '0',
          holds: '0',
          transferable: '0'
        }
      }
    }

  } catch(e){
    console.error(e,"transferToHFAccount-error")
  }
}

/**
 * @name getHighFrequencyAccountLedger
 * @description Account Ledger in high-frequency trading accounts
 * @param {Object}
 * - {string} currency, optional，can select more than one，separate with commas，select no more than 10 currencys，the default will be to query for all currencys if left empty
 * - {string} direction Direction of transaction (in or out): in-transfer in, out-transfer out
 * - {string} bizType Transaction type: TRANSFER-transfer funds,TRADE_EXCHANGE-Trade
 * - {long } lastId The id of the last set of data from the previous batch of data. By default, the latest information is given.
 * - {int} limit Default100，Max200
 * - {long } startAt Start time (ms), the conditional limit createdAt
 * - { long } endAt End time (ms), the conditional limit createdAt
 * @return {Object} { code, success, data }
 */
exports.getHighFrequencyAccountLedger = async function getHighFrequencyAccountLedger({currency,direction,bizType,lastId,limit,startAt,endAt}) {
  return await Http().GET('/api/v1/hf/accounts/ledgers',{
    currency,direction,bizType,lastId,limit,startAt,endAt
  });
}