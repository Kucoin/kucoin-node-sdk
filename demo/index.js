const API = require('../src');

API.init(require('./config'));

const main = async () => {
  const getTimestampRl = await API.rest.Others.getTimestamp();
  console.log(getTimestampRl.data);

  const res = await API.rest.User.Deposit.getDepositAddressV2('BTC');
  // add new api example
  /////////////////////User//////////////////////////////////////////////////////
  /**
 * @name getPaginatedSubUsers
 * @description Get Paginated List of Sub-Accounts.
 * @param {Object}
 * - {Int} currentPage - [Optional] Current request page. Default is 1
 * - {Int} pageSize - [Optional] Number of results per request. Minimum is 1, maximum is 100, default is 10.
 * @return {Object} { code, success, data }
 */
  const getPaginatedSubUsersResult = await API.rest.User.UserInfo.getPaginatedSubUsers({currentPage:1,pageSize:10});
  console.log(getPaginatedSubUsersResult ,"getPaginatedSubUsersResult---");

  /**
 * @name getAccountSummaryInfo
 * @description Get Account Summary Info(V2)
 * @updateTime 08/04/23
 * @return {Object} { code, success, data }
 */
  const getAccountSummaryInfoResult = await API.rest.User.Account.getAccountSummaryInfo();
  console.log(getAccountSummaryInfoResult ,"getAccountSummaryInfoResult---");

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
  const createSubAccountResult = await API.rest.User.Account.createSubAccount({password:'Gwd19911023',remarks:'remarks',subName:'AAAAAAAAAA0008',access:'Futures'});
  console.log(createSubAccountResult ,"createSubAccountResult---");

  /**
 * @name getSubAccountSpotApiList
 * @description Get Sub-Account Spot API List
 * @updateTime 08/24/22
 * @param {Object}
 * - {String} apiKey [Optional] API-Key.
 * - {String} subName Sub-account name.
 * @return {Object} { code, success, data }
 */
  const getSubAccountSpotApiListResult = await API.rest.User.Account.getSubAccountSpotApiList({apiKey:'6476a9a457f5170001f13726',subName:'AAAAAAAAAA0008'});
  console.log(getSubAccountSpotApiListResult ,"getSubAccountSpotApiListResult---");

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

  const createSpotAPIsForSubAccountResult = await API.rest.User.Account.createSpotAPIsForSubAccount({subName:'AAAAAAAAAA0007',passphrase:'12345678',remark:'remarks',permission:'General',ipWhitelist:'127.0.0.1',expire:'30'});
  console.log(createSpotAPIsForSubAccountResult ,"createSpotAPIsForSubAccountResult---");

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
  const updateSubAccountSpotApisResult = await API.rest.User.Account.updateSubAccountSpotApis({subName:'AAAAAAAAAA0007',apiKey:"6476a9a457f5170001f13726",passphrase:'12345678',permission:'Trade',ipWhitelist:'127.0.0.1',expire:'90'});
  console.log(updateSubAccountSpotApisResult ,"updateSubAccountSpotApisResult---");

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
  const deleteSubAccountSpotApisResult = await API.rest.User.Account.deleteSubAccountSpotApis({apiKey:"6476a9a457f5170001f13726",passphrase:"12345678",subName:"AAAAAAAAAA0007"});
  console.log(deleteSubAccountSpotApisResult ,"deleteSubAccountSpotApisResult---");

  /**
 * @name getPaginatedSubAccountInformation
 * @description Get Paginated Sub-Account Information.
 * @param {Object}
 * - {Int} currentPage [Optional] Current request page. Default is 1
 * - {Int} pageSize [Optional] Number of results per request. Minimum is 1, maximum is 100, default is 10.
 * @return {Object} { code, success, data }
 */
  const getPaginatedSubAccountInformationResult = await API.rest.User.Account.getPaginatedSubAccountInformation({currentPage:1,pageSize:10});
  console.log(getPaginatedSubAccountInformationResult ,"getPaginatedSubAccountInformationResult---");

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

const transferToHFAccountResult = await API.rest.User.Account.transferToHFAccount({clientOid:"178511867",type:"MARGIN",currency:"BTC",from:"main",to:"trade",amount:'5'});
console.log(transferToHFAccountResult ,"transferToHFAccountResult---");



  /////////////////////Trade//////////////////////////////////////////////////////
  /**
 * @name getSingleStopOrderInfo
 * @description Get Single Order Info
 * @param {Object}
 * - {String} orderId Order ID
 * @return {Object} { code, success, data }
 */
  const getSingleStopOrderInfoResult = await API.rest.Trade.StopOrder.getSingleStopOrderInfo({orderId:"5c35c02703aa673ceec2a168"});
  console.log(getSingleStopOrderInfoResult ,"getSingleStopOrderInfoResult---");

  /**
 * @name cancelStopOrder
 * @description Cancel an Order
 * @param {Object}
 * - {String} orderId Order ID
 * @return {Object} { code, success, data }
 */

  const cancelStopOrderResult = await API.rest.Trade.StopOrder.cancelStopOrder({orderId:"5c35c02703aa673ceec2a168"});
  console.log(cancelStopOrderResult ,"cancelStopOrderResult---");

 /////////////////////Market//////////////////////////////////////////////////////
 /**
 * @name getSymbolsList
 * @description Get Symbols List
 * @param {Object}
 * - {String} market [Optional] The trading market.
 * @return {Object} { code, success, data }
 */

 const getSymbolsListResult = await API.rest.Market.Symbols.getSymbolsList({market:"market"});
 console.log(getSymbolsListResult ,"getSymbolsListResult---");

 /**
 * @name getCurrencyDetail
 * @description Get Currency Detail(Recommend)
 * @param {Object}
 * - {String} currency Path parameter. Currency
 * - {String} chain [Optional] Support for querying the chain of currency, return the currency details of all chains by default.
 * @return {Object} { code, success, data }
 */
 const getCurrencyDetailResult = await API.rest.Market.Currencies.getCurrencyDetail({currency:"BTC",chain:"chain"});
 console.log(getCurrencyDetailResult ,"getCurrencyDetailResult---");

//   /////////////////////Margin//////////////////////////////////////////////////////
  /**
 * @name queryIsolatedMarginTradingPairConfiguration
 * @description Query Isolated Margin Trading Pair Configuration
 * @return {Object} { code, success, data }
 */
  const queryIsolatedMarginTradingPairConfigurationResult = await API.rest.Margin.Isolated.queryIsolatedMarginTradingPairConfiguration();
  console.log(queryIsolatedMarginTradingPairConfigurationResult ,"queryIsolatedMarginTradingPairConfigurationResult---");
/**
 * @name queryIsolatedMarginAccountInfo
 * @description Query Isolated Margin Account Info
 * @updateTime 07/05/22
 * @param {Object}
 * - {string} balanceCurrency - [Optional] The pricing coin, currently only supports USDT, KCS, and BTC. Defaults to BTC if no value is passed.
 * @return {Object} { code, success, data }
 */
const queryIsolatedMarginAccountInfoResult = await API.rest.Margin.Isolated.queryIsolatedMarginAccountInfo({balanceCurrency:"USDT"});
console.log(queryIsolatedMarginAccountInfoResult ,"queryIsolatedMarginAccountInfoResult---");

/**
 * @name querySingleIsolatedMarginAccountInfo
 * @description Query Single Isolated Margin Account Info
 * @updateTime 07/05/22
 * @param {Object}
 * - {string} symbol - Trading pair, e.g.: BTC-USDT
 * @return {Object} { code, success, data }
 */
const querySingleIsolatedMarginAccountInfoResult = await API.rest.Margin.Isolated.querySingleIsolatedMarginAccountInfo({symbol:"BTC-USDT"});
console.log(querySingleIsolatedMarginAccountInfoResult ,"querySingleIsolatedMarginAccountInfoResult---");

/**
 * @name isolatedMarginBorrowing
 * @description Isolated Margin Borrowing
 * @param {Object}
 * - {string} symbol - Trading pair, e.g.: BTC-USDT
 * - {string} currency - Borrowed coin type
 * - {BigDecimal} size - Borrowed amount
 * - {string} borrowStrategy - Borrowing strategy: FOK, IOC
 * - {BigDecimal} maxRate - [Optional] Max interest rate, defaults to all interest rates if left blank
 * - {string} period - [Optional] The term in days. Defaults to all terms if left blank. 7,14,28
 * @return {Object} { code, success, data }
 */
const isolatedMarginBorrowingResult = await API.rest.Margin.Isolated.isolatedMarginBorrowing({symbol:"BTC-USDT",currency:'USDT',size:"10",borrowStrategy:"FOK",maxRate:"",period:""});
console.log(isolatedMarginBorrowingResult ,"isolatedMarginBorrowingResult---");

/**
 * @name queryOutstandingRepaymentRecords
 * @description Query Outstanding Repayment Records
 * @updateTime 07/05/22
 * @param {Object}
 * - {string} symbol - [Optional] Trading pair, e.g.: BTC-USDT
 * - {string} currency - [Optional] Coin type
 * - {Int} pageSize - [Optional] Page size [10-50]
 * - {Int} currentPage - [Optional] Current page number [1-100]
 * @return {Object} { code, success, data }
 */
const queryOutstandingRepaymentRecordsResult = await API.rest.Margin.Isolated.queryOutstandingRepaymentRecords({symbol:"BTC-USDT",currency:'USDT',pageSize:10,currentPage:1});
console.log(queryOutstandingRepaymentRecordsResult ,"queryOutstandingRepaymentRecordsResult---");

/**
 * @name queryRepaymentRecords
 * @description Query Repayment Records
 * @updateTime 07/05/22
 * @param {Object}
 * - {string} symbol - [Optional] Trading pair, e.g.: BTC-USDT
 * - {string} currency - [Optional] Coin type
 * - {Int} pageSize - [Optional] Page size [10-50]
 * - {Int} currentPage - [Optional] Current page number [1-100]
 * @return {Object} { code, success, data }
 */
const queryRepaymentRecordsResult = await API.rest.Margin.Isolated.queryRepaymentRecords({symbol:"BTC-USDT",currency:'USDT',pageSize:10,currentPage:1});
console.log(queryRepaymentRecordsResult ,"queryRepaymentRecordsResult---");

/**
 * @name quickRepayment
 * @description Quick Repayment
 * @updateTime 07/05/22
 * @param {Object}
 * - {string} symbol - [Optional] Trading pair, e.g.: BTC-USDT
 * - {string} currency - [Optional] Coin type
 * - {BigDecimal} size Repayment amount
 * - {string} seqStrategy - Repayment sequence strategy, RECENTLY_EXPIRE_FIRST: Maturity date priority (the loan with the closest maturity is repaid first), HIGHEST_RATE_FIRST: Interest rate priority (the loan with the highest interest rate is repaid first)
 * @return {Object} { code, success, data }
 */
const quickRepaymentResult = await API.rest.Margin.Isolated.quickRepayment({symbol:"BTC-USDT",currency:'USDT',size:"10",seqStrategy:"HIGHEST_RATE_FIRST"});
console.log(quickRepaymentResult ,"quickRepaymentResult---");

/**
 * @name singleRepayment
 * @description Single Repayment
 * @updateTime 07/05/22
 * @param {Object}
 * - {string} symbol - [Optional] Trading pair, e.g.: BTC-USDT
 * - {string} currency - [Optional] Coin type
 * - {BigDecimal} size Repayment amount
 * - {string} loanId- Trade order number; when this field is configured, the sequence strategy is invalidated
 * @return {Object} { code, success, data }
 */
const singleRepaymentResult = await API.rest.Margin.Isolated.singleRepayment({symbol:"BTC-USDT",currency:'USDT',size:"10",loanId:"loanId123456789123456789"});
console.log(singleRepaymentResult ,"singleRepaymentResult---");


// owen.guo@kupotech.com update high-frequency api
 /////////////////////high-frequency api//////////////////////////////////////////////////////
/**
 * @name innerTransfer 
 * @description Inner Transfer
 * @updateTime 07/05/22
 * @param {string} clientOid - Unique order id created by users to identify their orders, e.g. UUID.
 * @param {string} currency - currency https://sandbox-docs.kucoin.com/#Get-Currencies
 * @param {string} from - Account type of payer: main, trade, margin or pool
 * @param {string} to - Account type of payee: main, trade, margin or pool
 * @param {string} amount - Transfer amount, the amount is a positive integer multiple of the currency precision.
 * @return {Object} { code, success, data }
 */
const innerTransferResult = await API.rest.User.Account.innerTransfer("17851186789",'BTC','main','trade','4');
console.log(innerTransferResult ,"innerTransferResult---");

/**
 * @name getAccountsList
 * @description List Accounts.
 * @param {Object}
 *   - {string} type - [Optional] Account type: main, trade, margin or pool
 *   - {string} currency - [Optional] currency https://sandbox-docs.kucoin.com/#get-currencies
 * @return {Object} { code, success, data }
 */
const getAccountsListResult = await API.rest.User.Account.getAccountsList({type:'pool',currency:"USDT"});
console.log(getAccountsListResult ,"getAccountsListResult---");

/**
 * @name getAccountInformation
 * @description Get an Account.
 * @param {string} accountId - ID of the account
 * @return {Object} { code, success, data }
 */

const getAccountInformationResult = await API.rest.User.Account.getAccountInformation('5bd6e9286d99522a52e458de');
console.log(getAccountInformationResult ,"getAccountInformationResult---");

/**
 * @name getTransferable
 * @description Get the Transferable.
 * @updateTime 07/05/22
 * @param {string} type - The account type: MAIN, TRADE, MARGIN or POOL
 * @param {string} currency - currency https://sandbox-docs.kucoin.com/#Get-Currencies
 * @return {Object} { code, success, data }
 */

const getTransferableResult = await API.rest.User.Account.getTransferable('TRADE_HF','USDT');
console.log(getTransferableResult ,"getTransferableResult---");

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

const getHighFrequencyAccountLedgerResult = await API.rest.User.Account.getHighFrequencyAccountLedger({
  currency:"USDT",
  direction:"in",
  bizType:'TRADE_EXCHANGE',
  lastId:123,
  limit:200,
  startAt:1685460570499,
  endAt:1685460597110
});
console.log(getHighFrequencyAccountLedgerResult ,"getHighFrequencyAccountLedgerResult---");

/**
 * @name getHfTransactionRecords
 * @description HF transaction records
 * @updateTime 02/03/23
 * @param {Object}
 * - {string} orderId Look up the transaction details pertaining to the order id（IforderId is specified，please ignore the other query parameters）
 * - {string} symbol Only returns order information for the specified trading pair
 * - {string} side buy（Buy） or sell（Sell）
 * - {string} type Order type: limit（limit order）, market(market order)
 * - {long} startAt Start time（ms），puts a restriction on the transaction(creation) time for the transaction records
 * - {long} endAt End time（ms），puts a restriction on the transaction(creation) time of the transaction records
 * - {long} lastId The id of the last data item from the previous batch, defaults to obtaining the latest data
 * - {int}  limit Default100，maximum 200
 * @return {Object} { code, success, data }
 */
const getHfTransactionRecordsResult = await API.rest.Trade.Fills.getHfTransactionRecords({
  orderId:'5bd6e9286d99522a52e458de',
  symbol:"BTC-USDT",
  side:"buy",
  type:'limit',
  startAt:1601395200000,
  endAt:1901395200000,
  lastId:123456,
  limit:10
})
console.log(getHfTransactionRecordsResult ,"getHfTransactionRecordsResult---");

/**
 * @name placeHfOrder
 * @description Place hf order
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} clientOid Client Order Id，unique identifier created by the user, the use of UUID is recommended
 * - {String} symbol Trading pair, such as, ETH-BTC
 * - {String} type Order type limit and market
 * - {String} side buy or sell
 * - {String} stp Self trade prevention (self trade prevention) is divided into four strategies: CN, CO, CB , and DC
 * - {String} tags Order tag, cannot exceed 20 characters (ASCII) in length
 * - {String} remark Order placement remarks, length cannot exceed 20 characters (ASCII) in length
 * @return {Object} { code, success, data }
 */
const placeHfOrderResult = await API.rest.Trade.Orders.placeHfOrder({
  clientOid:'123456',
  symbol:"ETH-BTC",
  type:'limit',
  side:"buy",
  stp:"DC",
  tags:"tags",
  remark:"remark"
})
console.log(placeHfOrderResult ,"placeHfOrderResult---");
/**
 * @name syncPlaceHfOrder
 * @description Sync place hf order
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} clientOid Client Order Id，unique identifier created by the user, the use of UUID is recommended
 * - {String} symbol Trading pair, such as, ETH-BTC
 * - {String} type Order type limit and market
 * - {String} side buy or sell
 * - {String} stp Self trade prevention (self trade prevention) is divided into four strategies: CN, CO, CB , and DC
 * - {String} tags Order tag, cannot exceed 20 characters (ASCII) in length
 * - {String} remark Order placement remarks, length cannot exceed 20 characters (ASCII) in length
 * @return {Object} { code, success, data }
 */
const syncPlaceHfOrderResult = await API.rest.Trade.Orders.syncPlaceHfOrder({
  clientOid:'123456',
  symbol:"ETH-BTC",
  type:'limit',
  side:"buy",
  stp:"DC",
  tags:"tags",
  remark:"remark"
})
console.log(syncPlaceHfOrderResult ,"syncPlaceHfOrderResult---");

/**
 * @name placeMultipleHfOrders
 * @description Place multiple hf orders
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} clientOid Client Order Id，a unique identifier created by the user，the use of UUID is recommended
 * - {String} symbol trading pairs such as，ETH-BTC
 * - {String} type Order type limit and market
 * - {String} timeInForce [Optional] Time in force GTC, GTT, IOC, FOK (defaults to GTC)
 * - {String} stp [Optional] Self trade prevention（self trade prevention）is divided into CN, CO, CB , and DC strategies
 * - {String} side buy（buy） or sell（sell）
 * - {String} price Specify price for currency
 * - {String} size Specify quantity of currency
 * - {long} cancelAfter [Optional] Cancels in n seconds, with GTT as the time in force strategy
 * - {boolean} postOnly [Optional] Post only identifier, invalid when the time in force strategy is IOC or FOK
 * - {boolean} hidden [Optional] Hidden or not（not shown in order book）
 * - {boolean} iceberg [Optional] Whether iceberg orders only show visible portions of orders
 * - {String} visibleSize	[Optional] The maximum visible size for iceberg orders
 * - {String} tags [Optional] The order identifier length cannot exceed 20 characters（ASCII）
 * - {String} remark [Optional] Order placement remarks cannot exceed a length of 20 characters（ASCII）
 * @return {Object} { code, success, data }
 */

const placeMultipleHfOrdersResult = await API.rest.Trade.Orders.placeMultipleHfOrders({
  clientOid:"123456",
  symbol:"BTC-USDT",
  type:"market",
  timeInForce:"GTC",
  stp:"CN",
  side:"sell",
  price:"50",
  size:"20",
  cancelAfter:20,
  postOnly:true,
  hidden:true,
  iceberg:true,
  visibleSize:"20",
  tags:"tags",
  remark:"remark"
})
console.log(placeMultipleHfOrdersResult ,"placeMultipleHfOrdersResult---");

/**
 * @name syncPlaceMultipleHfOrders
 * @description Sync place multiple hf orders
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} clientOid Client Order Id，a unique identifier created by the user，the use of UUID is recommended
 * - {String} symbol trading pairs such as，ETH-BTC
 * - {String} type Order type limit and market
 * - {String} timeInForce [Optional] Time in force GTC, GTT, IOC, FOK (defaults to GTC)
 * - {String} stp [Optional] Self trade prevention（self trade prevention）is divided into CN, CO, CB , and DC strategies
 * - {String} side buy（buy） or sell（sell）
 * - {String} price Specify price for currency
 * - {String} size Specify quantity of currency
 * - {long} cancelAfter [Optional] Cancels in n seconds, with GTT as the time in force strategy
 * - {boolean} postOnly [Optional] Post only identifier, invalid when the time in force strategy is IOC or FOK
 * - {boolean} hidden [Optional] Hidden or not（not shown in order book）
 * - {boolean} iceberg [Optional] Whether iceberg orders only show visible portions of orders
 * - {String} visibleSize	[Optional] The maximum visible size for iceberg orders
 * - {String} tags [Optional] The order identifier length cannot exceed 20 characters（ASCII）
 * - {String} remark [Optional] Order placement remarks cannot exceed a length of 20 characters（ASCII）
 * @return {Object} { code, success, data }
 */
const syncPlaceMultipleHfOrdersResult = await API.rest.Trade.Orders.syncPlaceMultipleHfOrders({
  clientOid:"123456",
  symbol:"BTC-USDT",
  type:"market",
  timeInForce:"GTC",
  stp:"CN",
  side:"sell",
  price:"50",
  size:"20",
  cancelAfter:20,
  postOnly:true,
  hidden:true,
  iceberg:true,
  visibleSize:"20",
  tags:"tags",
  remark:"remark"
})
console.log(syncPlaceMultipleHfOrdersResult ,"syncPlaceMultipleHfOrdersResult---");

/**
 * @name modifyOrder TODO
 * @description Modify order
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} symbol trading pairs such as，ETH-BTC
 * - {String} clientOid Client Order Id，a unique identifier created by the user，the use of UUID is recommended
 * - {String} orderId other id
 * - {String} newPrice The modified price of the new order
 * - {String} newSize The modified size of the new order
 * @return {Object} { code, success, data }
 */

const modifyOrderResult = await API.rest.Trade.Orders.modifyOrder({
  symbol:"ETH-BTC",
  clientOid:"clientOid",
  orderId:"5bd6e9286d99522a52e458de",
  newPrice:"1",
  newSize:"2"
})
console.log(modifyOrderResult ,"modifyOrderResult---");

/**
 * @name cancelOrdersByOrderId
 * @description Cancel orders by orderId
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} orderId Path parameter，Order Id unique identifier
 * - {String} symbol Trading pair, such as ETH-BTC
 * @return {Object} { code, success, data }
 */
const cancelOrdersByOrderIdResult = await API.rest.Trade.Orders.cancelOrdersByOrderId({
  orderId:"5bd6e9286d99522a52e458de",
  symbol:"BTC-USDT",
})
console.log(cancelOrdersByOrderIdResult ,"cancelOrdersByOrderIdResult---");

/**
 * @name syncCancelOrdersByOrderId
 * @description Sync cancel orders by orderId
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} orderId Path parameter，Order Id unique identifier
 * - {String} symbol Trading pair, such as ETH-BTC
 * @return {Object} { code, success, data }
 */
const syncCancelOrdersByOrderIdResult = await API.rest.Trade.Orders.syncCancelOrdersByOrderId({
  orderId:"5bd6e9286d99522a52e458de",
  symbol:"BTC-USDT",
})
console.log(syncCancelOrdersByOrderIdResult ,"syncCancelOrdersByOrderIdResult---");

/**
 * @name cancelOrderByClientOid
 * @description Cancel order by clientOid
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} clientOid Path parameter，an identifier created by the
 * - {String} symbol Trading pair such as ETH-BTC
 * @return {Object} { code, success, data }
 */
const cancelOrderByClientOidResult = await API.rest.Trade.Orders.cancelOrderByClientOid({
  clientOid:"6d539dc614db3",
  symbol:"BTC-USDT",
})
console.log(cancelOrderByClientOidResult ,"cancelOrderByClientOidResult---");
/**
 * @name syncCancelOrdersByClientOid
 * @description Sync cancel orders by clientOid
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} clientOid Path parameter，an identifier created by the
 * - {String} symbol Trading pair such as ETH-BTC
 * @return {Object} { code, success, data }
 */

const syncCancelOrdersByClientOidResult = await API.rest.Trade.Orders.syncCancelOrdersByClientOid({
  clientOid:"6d539dc614db3",
  symbol:"BTC-USDT",
})
console.log(syncCancelOrdersByClientOidResult ,"syncCancelOrdersByClientOidResult---");

/**
 * @name cancelSpecifiedNumberOfOrdersByOrderId TODO
 * @description Cancel specified number of orders by orderId
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} orderId Order id of the cancelled order
 * - {String} symbol Trading pair such as ETH-BTC
 * - {String} cancelSize canceled size
 * @return {Object} { code, success, data }
 */

const cancelSpecifiedNumberOfOrdersByOrderIdResult = await API.rest.Trade.Orders.cancelSpecifiedNumberOfOrdersByOrderId({
  orderId:"5bd6e9286d99522a52e458de",
  symbol:"BTC-USDT",
  cancelSize:"10.01"
})
console.log(cancelSpecifiedNumberOfOrdersByOrderIdResult ,"cancelSpecifiedNumberOfOrdersByOrderIdResult---");

/**
 * @name cancelAllHfOrdersBySymbol
 * @description Cancel all HF orders by symbol
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} symbol Cancel open orders pertaining to the specified trading pair
 * @return {Object} { code, success, data }
 */
const cancelAllHfOrdersBySymbolResult = await API.rest.Trade.Orders.cancelAllHfOrdersBySymbol({
  symbol:"BTC-USDT",
})
console.log(cancelAllHfOrdersBySymbolResult ,"cancelAllHfOrdersBySymbolResult---");

/**
 * @name obtainListOfActiveHfOrders
 * @description Obtain List of Active HF Orders
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} symbol Only returns order information for the specified trading pair
 * @return {Object} { code, success, data }
 */
const obtainListOfActiveHfOrdersResult = await API.rest.Trade.Orders.obtainListOfActiveHfOrders({
  symbol:"BTC-USDT",
})
console.log(obtainListOfActiveHfOrdersResult ,"obtainListOfActiveHfOrdersResult---");

/**
 * @name obtainListOfSymbolWithActiveHfOrders
 * @description Obtain List of symbol with active HF orders
 * @updateTime 02/03/23
 * @return {Object} { code, success, data }
 */

const obtainListOfSymbolWithActiveHfOrdersResult = await API.rest.Trade.Orders.obtainListOfSymbolWithActiveHfOrders()
console.log(obtainListOfSymbolWithActiveHfOrdersResult ,"obtainListOfSymbolWithActiveHfOrdersResult---");

/**
 * @name obtainListOfFilledHfOrders
 * @description Obtain List of Filled HF Orders
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} symbol Only returns order information for the specified trading pair
 * - {String} side buy (Buy) orsell (Sell)
 * - {String} type Order type: limit (limit order), market(market order)
 * - {long} startAt Start time (ms)，last update(filled) time of the limit order
 * - {long} endAt	 End time (ms)，last update(filled) time of limit order
 * - {long} lastId The id of the last data item from the previous batch，defaults to obtaining the latest data
 * - {int} limit Default20，maximum100
 * @return {Object} { code, success, data }
 */
const obtainListOfFilledHfOrdersResult = await API.rest.Trade.Orders.obtainListOfFilledHfOrders({
  symbol:"BTC-USDT",
  side:"buy",
  type:"market",
  startAt:1601395200000,
  endAt:1901395200000,
  lastId:123,
  limit:20
})
console.log(obtainListOfFilledHfOrdersResult ,"obtainListOfFilledHfOrdersResult---");

/**
 * @name detailsOfAsingleHfOrder
 * @description Details of a Single HF Order
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} orderId Path parameter，Order Id unique identifier
 * - {String} symbol Trading pair, such as ETH-BTC
 * @return {Object} { code, success, data }
 */

const detailsOfAsingleHfOrderResult = await API.rest.Trade.Orders.detailsOfAsingleHfOrder({
  orderId:"5c35c02703aa673ceec2a168",
  symbol:"BTC-USDT",
})
console.log(detailsOfAsingleHfOrderResult ,"detailsOfAsingleHfOrderResult---");

/**
 * @name obtainDetailsOfASingleHfOrder
 * @description Obtain details of a single HF order using clientOid
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} clientOid Path parameter，an identifier created by the client
 * - {String} symbol Trading pair such as ETH-BTC
 * @return {Object} { code, success, data }
 */
const obtainDetailsOfASingleHfOrderResult = await API.rest.Trade.Orders.obtainDetailsOfASingleHfOrder({
  clientOid:"6d539dc614db312",
  symbol:"BTC-USDT",
})
console.log(obtainDetailsOfASingleHfOrderResult ,"obtainDetailsOfASingleHfOrderResult---");

/**
 * @name hfAutoCancelSetting
 * @description HF auto cancel setting
 * @updateTime 02/03/23
 * @param {Object}
 * - {Int} timeout Auto cancel order trigger setting time, the unit is second. range: timeout=-1 (meaning unset) or 5 <= timeout <= 86400. For example, timeout=5 means that the order will be automatically canceled if no user request is received for more than 5 seconds. When this parameter is changed, the previous setting will be overwritten.
 * - {String} symbols List of trading pairs. When this parameter is not empty, separate it with commas and support up to 50 trading pairs. Empty means all trading pairs. When this parameter is changed, the previous setting will be overwritten.
 * @return {Object} { code, success, data }
 */
const hfAutoCancelSettingResult = await API.rest.Trade.Orders.hfAutoCancelSetting({
  timeout:3000,
  symbols:"BTC-USDT",
})
console.log(hfAutoCancelSettingResult ,"hfAutoCancelSettingResult---");

/**
 * @name queryHfAutoCancelOrderSetting
 * @description HF auto cancel order setting query
 * @updateTime 02/03/23
 * @return {Object} { code, success, data }
 */

const queryHfAutoCancelOrderSettingResult = await API.rest.Trade.Orders.queryHfAutoCancelOrderSetting()
console.log(queryHfAutoCancelOrderSettingResult ,"queryHfAutoCancelOrderSettingResult---");

};


// run rest main
main();
