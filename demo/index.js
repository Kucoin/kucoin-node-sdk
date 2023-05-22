const API = require('../src');

API.init(require('./config'));

const main = async () => {
  const getTimestampRl = await API.rest.Others.getTimestamp();
  console.log(getTimestampRl.data);

  const res = await API.rest.User.Deposit.getDepositAddressV2('BTC');
  // 新增接口example
  /////////////////////User//////////////////////////////////////////////////////
  /**
 * @name getPaginatedSubUsers
 * @description Get Paginated List of Sub-Accounts.
 * @param {Int} currentPage - [Optional] Current request page. Default is 1
 * @param {Int} pageSize - [Optional] Number of results per request. Minimum is 1, maximum is 100, default is 10.
 * @return {Object} { code, success, data }
 */
  const getPaginatedSubUsersResult = await API.rest.User.UserInfo.getPaginatedSubUsers({currentPage:1,pageSize:10});
  console.log(getPaginatedSubUsersResult ,"getPaginatedSubUsersResult---");

  /**
 * @name getAccountSummaryInfo
 * @description Get Account Summary Info(V2)
 * @return {Object} { code, success, data }
 */
  const getAccountSummaryInfoResult = await API.rest.User.Account.getAccountSummaryInfo();
  console.log(getAccountSummaryInfoResult ,"getAccountSummaryInfoResult---");

  /**
 * @name createSubAccount
 * @description Create Sub-Account(V2)
 * @param {String} password Password(7-24 characters, must contain letters and numbers, cannot only contain numbers or include special characters)
 * @param {String} remarks [Optional] Remarks(1~24 characters)
 * @param {String} subName Sub-account name(must contain 7-32 characters, at least one number and one letter. Cannot contain any spaces.)
 * @param {String} access Permission (types include Spot, Futures, Margin permissions, which can be used alone or in combination).
 * @return {Object} { code, success, data }
 */
  const createSubAccountResult = await API.rest.User.Account.createSubAccount({password:'123',remarks:'remarks',subName:'subname',access:'access'});
  console.log(createSubAccountResult ,"createSubAccountResult---");

  /**
 * @name getSubAccountSpotApiList
 * @description Get Sub-Account Spot API List
 * @param {String} apiKey [Optional] API-Key.
 * @param {String} subName Sub-account name.
 * @return {Object} { code, success, data }
 */
  const getSubAccountSpotApiListResult = await API.rest.User.Account.getSubAccountSpotApiList({apiKey:'apiKey',subName:'subName'});
  console.log(getSubAccountSpotApiListResult ,"getSubAccountSpotApiListResult---");

  /**
 * @name createSpotAPIsForSubAccount
 * @description Create Spot APIs for Sub-Account
 * @param {String} subName Sub-account name, create sub account name of API Key.
 * @param {String} passphrase Password(Must contain 7-32 characters. Cannot contain any spaces.)
 * @param {String} remark Remarks(1~24 characters)
 * @param {String} permission [Optional] Permissions(Only "General" and "Trade" permissions can be set, such as "General, Trade". The default is "General")
 * @param {String} ipWhitelist [Optional] IP whitelist(You may add up to 20 IPs. Use a halfwidth comma to each IP)
 * @param {String} expire [Optional] API expiration time; Never expire(default)-1，30Day30，90Day90，180Day180，360Day360
 * @return {Object} { code, success, data }
 */

  const createSpotAPIsForSubAccountResult = await API.rest.User.Account.createSpotAPIsForSubAccount({subName:'subName',passphrase:'xxxxxxx',remark:'remark',permission:'',ipWhitelist:'',expire:''});
  console.log(createSpotAPIsForSubAccountResult ,"createSpotAPIsForSubAccountResult---");

/**
 * @name updateSubAccountSpotApis
 * @description Modify Sub-Account Spot APIs
 * @param {String} subName Sub-account name, create sub account name of API Key.
 * @param {String} apiKey API-Key(Sub-account APIKey)
 * @param {String} passphrase Password of API key
 * @param {String} permission [Optional] Permission list.If modified, permissions will be reset.
 * @param {String} ipWhitelist [Optional] IP whitelist(you may add up to 20 IPs. Use a halfwidth comma to each IP.If modified, the IP will be reset.)
 * @param {String} expire [Optional] API expiration time; Never expire(default)-1，30Day30，90Day90，180Day180，360Day360
 * @return {Object} { code, success, data }
 */
  const updateSubAccountSpotApisResult = await API.rest.User.Account.updateSubAccountSpotApis({subName:'subName',apiKey:"xxx",passphrase:'xxxxxxx',permission:'',ipWhitelist:'',expire:''});
  console.log(updateSubAccountSpotApisResult ,"updateSubAccountSpotApisResult---");

  /**
 * @name deleteSubAccountSpotApis
 * @description Delete Sub-Account Spot APIs
 * @param {String} apiKey API-Key(API key to be deleted)
 * @param {String} passphrase Password(Password of the API key)
 * @param {String} subName Sub-account name(The sub-account name corresponding to the API key)
 * @return {Object} { code, success, data }
 */
  const deleteSubAccountSpotApisResult = await API.rest.User.Account.deleteSubAccountSpotApis({apiKey:"apiKey",passphrase:"passphrase",subName:"subName"});
  console.log(deleteSubAccountSpotApisResult ,"deleteSubAccountSpotApisResult---");

  /**
 * @name getPaginatedSubAccountInformation
 * @description Get Paginated Sub-Account Information.
 * @param {Int} currentPage [Optional] Current request page. Default is 1
 * @param {Int} pageSize [Optional] Number of results per request. Minimum is 1, maximum is 100, default is 10.
 * @return {Object} { code, success, data }
 */
  const getPaginatedSubAccountInformationResult = await API.rest.User.Account.getPaginatedSubAccountInformation({currentPage:1,pageSize:10});
  console.log(getPaginatedSubAccountInformationResult ,"getPaginatedSubAccountInformationResult---");

  /////////////////////Trade//////////////////////////////////////////////////////
  /**
 * @name getSingleStopOrderInfo
 * @description Get Single Order Info
 * @param {String} orderId Order ID
 * @return {Object} { code, success, data }
 */
  const getSingleStopOrderInfoResult = await API.rest.Trade.StopOrder.getSingleStopOrderInfo({orderId:"123"});
  console.log(getSingleStopOrderInfoResult ,"getSingleStopOrderInfoResult---");

  /**
 * @name cancelStopOrder
 * @description Cancel an Order
 * @param {String} orderId Order ID
 * @return {Object} { code, success, data }
 */

  const cancelStopOrderResult = await API.rest.Trade.StopOrder.cancelStopOrder({orderId:"123"});
  console.log(cancelStopOrderResult ,"cancelStopOrderResult---");

 /////////////////////Market//////////////////////////////////////////////////////
 /**
 * @name getSymbolsList
 * @description Get Symbols List
 * @param {String} market [Optional] The trading market.
 * @return {Object} { code, success, data }
 */

 const getSymbolsListResult = await API.rest.Market.Symbols.getSymbolsList({market:"market"});
 console.log(getSymbolsListResult ,"getSymbolsListResult---");

 /**
 * @name getCurrencyDetail
 * @description Get Currency Detail(Recommend)
 * @param {String} currency Path parameter. Currency
 * @param {String} chain [Optional] Support for querying the chain of currency, return the currency details of all chains by default.
 * @return {Object} { code, success, data }
 */
 const getCurrencyDetailResult = await API.rest.Market.Currencies.getCurrencyDetail({currency:"currency",chain:"chain"});
 console.log(getCurrencyDetailResult ,"getCurrencyDetailResult---");

  /////////////////////Margin//////////////////////////////////////////////////////
  /**
 * @name queryIsolatedMarginTradingPairConfiguration
 * @description Query Isolated Margin Trading Pair Configuration
 * @return {Object} { code, success, data }
 */
  const queryIsolatedMarginTradingPairConfigurationResult = await API.rest.Margin.Isolated.queryIsolatedMarginTradingPairConfiguration({currency:"currency",chain:"chain"});
  console.log(queryIsolatedMarginTradingPairConfigurationResult ,"queryIsolatedMarginTradingPairConfigurationResult---");
/**
 * @name queryIsolatedMarginAccountInfo
 * @description Query Isolated Margin Account Info
 * @param {string} balanceCurrency - [Optional] The pricing coin, currently only supports USDT, KCS, and BTC. Defaults to BTC if no value is passed.
 * @return {Object} { code, success, data }
 */
const queryIsolatedMarginAccountInfoResult = await API.rest.Margin.Isolated.queryIsolatedMarginAccountInfo({balanceCurrency:"balanceCurrency"});
console.log(queryIsolatedMarginAccountInfoResult ,"queryIsolatedMarginAccountInfoResult---");

/**
 * @name querySingleIsolatedMarginAccountInfo
 * @description Query Single Isolated Margin Account Info
 * @param {string} symbol - Trading pair, e.g.: BTC-USDT
 * @return {Object} { code, success, data }
 */
const querySingleIsolatedMarginAccountInfoResult = await API.rest.Margin.Isolated.querySingleIsolatedMarginAccountInfo({symbol:"BTC-USDT"});
console.log(querySingleIsolatedMarginAccountInfoResult ,"querySingleIsolatedMarginAccountInfoResult---");

/**
 * @name isolatedMarginBorrowing
 * @description Isolated Margin Borrowing
 * @param {string} symbol - Trading pair, e.g.: BTC-USDT
 * @param {string} currency - Borrowed coin type
 * @param {BigDecimal} size - Borrowed amount
 * @param {string} borrowStrategy - Borrowing strategy: FOK, IOC
 * @param {BigDecimal} maxRate - [Optional] Max interest rate, defaults to all interest rates if left blank
 * @param {string} period - [Optional] The term in days. Defaults to all terms if left blank. 7,14,28
 * @return {Object} { code, success, data }
 */
const isolatedMarginBorrowingResult = await API.rest.Margin.Isolated.isolatedMarginBorrowing({symbol:"BTC-USDT",currency:'USDT',size:"10",borrowStrategy:"FOK",maxRate:"",period:""});
console.log(isolatedMarginBorrowingResult ,"isolatedMarginBorrowingResult---");

/**
 * @name queryOutstandingRepaymentRecords
 * @description Query Outstanding Repayment Records
 * @param {string} symbol - [Optional] Trading pair, e.g.: BTC-USDT
 * @param {string} currency - [Optional] Coin type
 * @param {Int} pageSize - [Optional] Page size [10-50]
 * @param {Int} currentPage - [Optional] Current page number [1-100]
 * @return {Object} { code, success, data }
 */
const queryOutstandingRepaymentRecordsResult = await API.rest.Margin.Isolated.queryOutstandingRepaymentRecords({symbol:"BTC-USDT",currency:'USDT',pageSize:10,currentPage:1});
console.log(queryOutstandingRepaymentRecordsResult ,"queryOutstandingRepaymentRecordsResult---");

/**
 * @name queryRepaymentRecords
 * @description Query Repayment Records
 * @param {string} symbol - [Optional] Trading pair, e.g.: BTC-USDT
 * @param {string} currency - [Optional] Coin type
 * @param {Int} pageSize - [Optional] Page size [10-50]
 * @param {Int} currentPage - [Optional] Current page number [1-100]
 * @return {Object} { code, success, data }
 */
const queryRepaymentRecordsResult = await API.rest.Margin.Isolated.queryRepaymentRecords({symbol:"BTC-USDT",currency:'USDT',pageSize:10,currentPage:1});
console.log(queryRepaymentRecordsResult ,"queryRepaymentRecordsResult---");

/**
 * @name quickRepayment
 * @description Quick Repayment
 * @param {string} symbol - [Optional] Trading pair, e.g.: BTC-USDT
 * @param {string} currency - [Optional] Coin type
 * @param {BigDecimal} size Repayment amount
 * @param {string} seqStrategy - Repayment sequence strategy, RECENTLY_EXPIRE_FIRST: Maturity date priority (the loan with the closest maturity is repaid first), HIGHEST_RATE_FIRST: Interest rate priority (the loan with the highest interest rate is repaid first)
 * @return {Object} { code, success, data }
 */
const quickRepaymentResult = await API.rest.Margin.Isolated.quickRepayment({symbol:"BTC-USDT",currency:'USDT',size:"10",seqStrategy:"seqStrategy"});
console.log(quickRepaymentResult ,"quickRepaymentResult---");

/**
 * @name singleRepayment
 * @description Single Repayment
 * @param {string} symbol - [Optional] Trading pair, e.g.: BTC-USDT
 * @param {string} currency - [Optional] Coin type
 * @param {BigDecimal} size Repayment amount
 * @param {string} loanId- Trade order number; when this field is configured, the sequence strategy is invalidated
 * @return {Object} { code, success, data }
 */
const singleRepaymentResult = await API.rest.Margin.Isolated.singleRepayment({symbol:"BTC-USDT",currency:'USDT',size:"10",loanId:"loanId123456789123456789"});
console.log(singleRepaymentResult ,"singleRepaymentResult---");

};


// run rest main
main();
