
const Http = require('../../lib/http');

/**
 * @name getBasicUserFee
 * @description This interface is for the basic fee rate of users.
 * @return {Object} { code, success, data }
 */
exports.getBasicUserFee = async function getBasicUserFee() {
  /*
  {
    "code": "200000",     
    "data": {
      "takerFeeRate": "0.001",
      "makerFeeRate": "0.001"
    }
  }
  */
  return await Http().GET('/api/v1/base-fee');
};

/**
 * @name getActualFeeRateBySymbols
 * @description This interface is for the actual fee rate of the trading pair. You can inquire about fee rates of 10 trading pairs each time at most. The fee rate of your sub-account is the same as that of the master account.
 * @param {string} symbols - Trading pair (optional, you can inquire fee rates of 10 trading pairs each time at most) . exp: BTC-USDT,KCS-USDT
 * @return {Object} { code, success, data }
 */
exports.getActualFeeRateBySymbols = async function getActualFeeRateBySymbols(symbols) {
  /*
  {
    "code": "200000",     
    "data": [
        {
            "symbol": "BTC-USDT",
            "takerFeeRate": "0.001",
            "makerFeeRate": "0.001"
        },
        {
            "symbol": "KCS-USDT",
            "takerFeeRate": "0.002",
            "makerFeeRate": "0.0005"
        }
    ]
  }
  */
  return await Http().GET('/api/v1/trade-fees', { symbols });
};
