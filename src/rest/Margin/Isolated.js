// owen.guo@kupotech.com add isolated api
const Http = require('../../lib/http');

/**
 * @name queryIsolatedMarginTradingPairConfiguration
 * @description Query Isolated Margin Trading Pair Configuration
 * @updateTime 07/05/22
 * @return {Object} { code, success, data }
 */
exports.queryIsolatedMarginTradingPairConfiguration = async function queryIsolatedMarginTradingPairConfiguration() {
  return await Http().GET('/api/v1/isolated/symbols');
}

/**
 * @name queryIsolatedMarginAccountInfo
 * @description Query Isolated Margin Account Info
 * @updateTime 07/05/22
 * @param {Object}
 * - {string} balanceCurrency - [Optional] The pricing coin, currently only supports USDT, KCS, and BTC. Defaults to BTC if no value is passed.
 * @return {Object} { code, success, data }
 */
exports.queryIsolatedMarginAccountInfo = async function queryIsolatedMarginAccountInfo({balanceCurrency}) {
  return await Http().GET('/api/v1/isolated/accounts',{ balanceCurrency });
}

/**
 * @name querySingleIsolatedMarginAccountInfo
 * @description Query Single Isolated Margin Account Info
 * @updateTime 07/05/22
 * @param {Object}
 * - {string} symbol - Trading pair, e.g.: BTC-USDT
 * @return {Object} { code, success, data }
 */
exports.querySingleIsolatedMarginAccountInfo = async function querySingleIsolatedMarginAccountInfo({symbol}) {
  return await Http().GET(`/api/v1/isolated/account/${symbol}`,{ symbol });
}

/**
 * @name isolatedMarginBorrowing
 * @description Isolated Margin Borrowing
 * @updateTime 07/05/22
 * @param {Object}
 * - {string} symbol - Trading pair, e.g.: BTC-USDT
 * - {string} currency - Borrowed coin type
 * - {BigDecimal} size - Borrowed amount
 * - {string} borrowStrategy - Borrowing strategy: FOK, IOC
 * - {BigDecimal} maxRate - [Optional] Max interest rate, defaults to all interest rates if left blank
 * - {string} period - [Optional] The term in days. Defaults to all terms if left blank. 7,14,28
 * @return {Object} { code, success, data }
 */
exports.isolatedMarginBorrowing = async function isolatedMarginBorrowing({symbol,currency,size,borrowStrategy,maxRate,period}) {
  return await Http().POST('/api/v1/isolated/borrow',{ symbol,currency,size,borrowStrategy,maxRate,period });
}

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
exports.queryOutstandingRepaymentRecords = async function queryOutstandingRepaymentRecords({symbol,currency,pageSize,currentPage}) {
  return await Http().GET('/api/v1/isolated/borrow/outstanding',{ symbol,currency,pageSize,currentPage });
}


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
exports.queryRepaymentRecords = async function queryRepaymentRecords({symbol,currency,pageSize,currentPage}) {
  return await Http().GET('/api/v1/isolated/borrow/repaid',{ symbol,currency,pageSize,currentPage });
}

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
exports.quickRepayment = async function quickRepayment({symbol,currency,size,seqStrategy} ) {
  return await Http().POST('/api/v1/isolated/repay/all',{ symbol,currency,size,seqStrategy });
}

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
exports.singleRepayment = async function singleRepayment({symbol,currency,size,loanId}) {
  return await Http().POST('/api/v1/isolated/repay/single',{ symbol,currency,size,loanId });
}