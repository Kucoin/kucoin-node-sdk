
const Http = require('../../lib/http');

/**
 * @name getFillsList
 * @description List Fills
 * @param {string} tradeType - The type of trading : TRADE（Spot Trading）, MARGIN_TRADE (Margin Trading).
 * @param optional
 *   - {string} orderId - [Optional] Limit the list of fills to this orderId（If you specify orderId, ignore other conditions）
 *   - {string} symbol - [Optional] Limit the list of fills to this symbol
 *   - {string} side - [Optional] buy or sell
 *   - {string} type - [Optional] limit, market, limit_stop or market_stop
 *   - {number} startAt - [Optional] Start time (milisecond)
 *   - {number} endAt - [Optional] End time (milisecond)
 * @return {Object} { code, success, data }
 */
exports.getFillsList = async function getFillsList(tradeType, optional = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "currentPage":1,
      "pageSize":1,
      "totalNum":251915,
      "totalPage":251915,
      "items":[
          {
              "symbol":"BTC-USDT",    //symbol
              "tradeId":"5c35c02709e4f67d5266954e",   //trade id
              "orderId":"5c35c02703aa673ceec2a168",   //order id
              "counterOrderId":"5c1ab46003aa676e487fa8e3",  //counter order id
              "side":"buy",   //transaction direction,include buy and sell
              "liquidity":"taker",  //include taker and maker
              "forceTaker":true,  //forced to become taker
              "price":"0.083",   //order price
              "size":"0.8424304",  //order quantity
              "funds":"0.0699217232",  //order funds
              "fee":"0",  //fee
              "feeRate":"0",  //fee rate
              "feeCurrency":"USDT",  // charge fee currency
              "stop":"",        // stop type
              "type":"limit",  // order type,e.g. limit,market,stop_limit.
              "createdAt":1547026472000,  //time
              "tradeType": "TRADE"
          }
      ]
    }
  }
  */
  return await Http().GET('/api/v1/fills', {
    tradeType,
    ...optional,
  });
};

/**
 * @name getRecentFills
 * @description Recent Fills. Request via this endpoint to get a list of 1000 fills in the last 24 hours.
 * @return {Object} { code, success, data }
 */
exports.getRecentFills = async function getRecentFills() {
  /*
  {
    "code": "200000",     
    "data": [
        {
            "counterOrderId":"5db7ee769797cf0008e3beea",
            "createdAt":1572335233000,
            "fee":"0.946357371456",
            "feeCurrency":"USDT",
            "feeRate":"0.001",
            "forceTaker":true,
            "funds":"946.357371456",
            "liquidity":"taker",
            "orderId":"5db7ee805d53620008dce1ba",
            "price":"9466.8",
            "side":"buy",
            "size":"0.09996592",
            "stop":"",
            "symbol":"BTC-USDT",
            "tradeId":"5db7ee8054c05c0008069e21",
            "tradeType":"MARGIN_TRADE",
            "type":"market"
        },
    ]
  }
  */
  return await Http().GET('/api/v1/limit/fills');
};
