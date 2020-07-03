
const Http = require('../lib/http');

/**
 * @name postOrder
 * @description Place a new order. This endpoint requires the "Trade" permission.
 * @param baseParams
 *   - clientOid Unique order id created by users to identify their orders, e.g. UUID.
 *   - side	buy or sell
 *   - symbol a valid trading symbol code. e.g. ETH-BTC
 *   - type [Optional] limit or market (default is limit)
 *   - remark [Optional] remark for the order, length cannot exceed 100 utf8 characters
 *   - stop [Optional] Either loss or entry. Requires stopPrice to be defined
 *   - stopPrice [Optional] Need to be defined if stop is specified.
 *   - stp [Optional] self trade prevention , CN, CO, CB or DC
 *   - tradeType [Optional] The type of trading : TRADE（Spot Trade）, MARGIN_TRADE (Margin Trade). Default is TRADE
 * @param orderParams
 *   LIMIT ORDER PARAMETERS
 *   - price price per base currency
 *   - size amount of base currency to buy or sell
 *   - timeInForce [Optional] GTC, GTT, IOC, or FOK (default is GTC), read Time In Force.
 *   - cancelAfter [Optional] cancel after n seconds, requires timeInForce to be GTT
 *   - postOnly [Optional] Post only flag, invalid when timeInForce is IOC or FOK
 *   - hidden [Optional] Order will not be displayed in the order book
 *   - iceberg [Optional] Only aportion of the order is displayed in the order book
 *   - visibleSize [Optional] The maximum visible size of an iceberg order
 * 
 *   MARKET ORDER PARAMETERS / It is required that you use one of the two parameters, size or funds.
 *   - size [Optional] Desired amount in base currency
 *   - funds [Optional] The desired amount of quote currency to use
 * @return {Object} { code, success, data }
 */
exports.postOrder = async function postOrder(baseParams = {}, orderParams = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "orderId": "5bd6e9286d99522a52e458de"
    }
  }
  */
  return await Http().POST('/api/v1/orders', {
    ...baseParams,
    ...orderParams,
  });
};

/**
 * @name postMultiOrders
 * @description Place Bulk Orders. This endpoint requires the "Trade" permission.
 * @param param
 *   - clientOid Unique order id created by users to identify their orders, e.g. UUID.
 *   - side buy or sell
 *   - symbol a valid trading symbol code. e.g. ETH-BTC
 *   - type [Optional] limit or market (default is limit)
 *   - remark [Optional] remark for the order, length cannot exceed 100 utf8 characters
 *   - stop [Optional] Either loss or entry. Requires stopPrice to be defined
 *   - stopPrice [Optional] Need to be defined if stop is specified.
 *   - stp [Optional] self trade prevention , CN, CO, CB or DC
 *   - tradeType [Optional] Default is TRADE
 *   - price price per base currency
 *   - size amount of base currency to buy or sell
 *   - timeInForce [Optional] GTC, GTT, IOC, or FOK (default is GTC), read Time In Force.
 *   - cancelAfter [Optional] cancel after n seconds, requires timeInForce to be GTT
 *   - postOnly [Optional] Post only flag, invalid when timeInForce is IOC or FOK
 *   - hidden [Optional] Order will not be displayed in the order book
 *   - iceberg [Optional] Only aportion of the order is displayed in the order book
 *   - visibleSize [Optional] The maximum visible size of an iceberg order
 * @return {Object} { code, success, data }
 */
exports.postMultiOrders = async function postMultiOrders(param = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "data": [ 
          { 
            "symbol": "BTC-USDT", 
            "type": "limit", 
            "side": "buy", 
            "price": "9661", 
            "size": "1", 
            "funds": null, 
            "stp": "", 
            "stop": "", 
            "stopPrice": "0", 
            "timeInForce": "GTC", 
            "cancelAfter": 0, 
            "postOnly": false, 
            "hidden": false, 
            "iceberge": false, 
            "iceberg": false, 
            "visibleSize": "0", 
            "channel": "API", 
            "id": null, 
            "status": "fail", 
            "failMsg": "error.createOrder.accountBalanceInsufficient", 
            "clientOid": "5e42743514832d53d255d921" 
          } 
      ] 
    } 
  }
  */
  return await Http().POST('/api/v1/orders/multi', { ...param });
};

/**
 * @name cancelOrder
 * @description Cancel an order. This endpoint requires the "Trade" permission.
 * @param orderId Order ID, unique ID of the order.
 * @return {Object} { code, success, data }
 */
exports.cancelOrder = async function cancelOrder(orderId) {
  /*
  {
    "code": "200000",     
    "data": {
      "cancelledOrderIds": [
        "5bd6e9286d99522a52e458de"   //orderId
      ]
    }
  }
  */
  return await Http().DEL(`/api/v1/orders/${orderId}`);
};

/**
 * @name cancelAllOrders
 * @description Cancel all orders. This endpoint requires the "Trade" permission.
 * @param {Object}
 *   - symbol [Optional] symbol, cancel the orders for the specified trade pair.
 *   - tradeType [Optional] the type of trading, cancel the orders for the specified trading type, and the default is to cancel the spot trading order (TRADE).
 * @return {Object} { code, success, data }
 */
exports.cancelAllOrders = async function cancelAllOrders({ symbol, tradeType } = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "cancelledOrderIds": [
        "5bd6e9286d99522a52e458de",   //orderId
        "5c52e12103aa677f33e493fe",
        "5c52e12a03aa677f33e49401",
      ]
    }
  }
  */
  return await Http().DEL('/api/v1/orders', {
    symbol,
    tradeType,
  });
};


/**
 * @name getOrdersList
 * @description List Orders
 * @param tradeType The type of trading : TRADE（Spot Trading）, MARGIN_TRADE (Margin Trading).
 * @param optional
 *   - status [Optional] active or done(done as default), Only list orders with a specific status .
 *   - symbol [Optional] Only list orders for a specific symbol.
 *   - side [Optional] buy or sell
 *   - type [Optional] limit, market, limit_stop or market_stop
 *   - startAt [Optional] Start time (milisecond)
 *   - endAt [Optional] End time (milisecond)
 * @return {Object} { code, success, data }
 */
exports.getOrdersList = async function getOrdersList(tradeType, optional = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "currentPage": 1,
      "pageSize": 1,
      "totalNum": 153408,
      "totalPage": 153408,
      "items": [
        {
          "id": "5c35c02703aa673ceec2a168",   //orderid
          "symbol": "BTC-USDT",   //symbol
          "opType": "DEAL",      // operation type: DEAL
          "type": "limit",       // order type,e.g. limit,market,stop_limit.
          "side": "buy",         // transaction direction,include buy and sell
          "price": "10",         // order price
          "size": "2",           // order quantity
          "funds": "0",          // order funds
          "dealFunds": "0.166",  // deal funds
          "dealSize": "2",       // deal quantity
          "fee": "0",            // fee
          "feeCurrency": "USDT", // charge fee currency
          "stp": "",             // self trade prevention,include CN,CO,DC,CB
          "stop": "",            // stop type
          "stopTriggered": false,  // stop order is triggered
          "stopPrice": "0",      // stop price
          "timeInForce": "GTC",  // time InForce,include GTC,GTT,IOC,FOK
          "postOnly": false,     // postOnly
          "hidden": false,       // hidden order
          "iceberg": false,      // iceberg order
          "visibleSize": "0",    // display quantity for iceberg order
          "cancelAfter": 0,      // cancel orders time，requires timeInForce to be GTT
          "channel": "IOS",      // order source
          "clientOid": "",       // user-entered order unique mark
          "remark": "",          // remark
          "tags": "",            // tag order source        
          "isActive": false,     // status before unfilled or uncancelled 
          "cancelExist": false,   // order cancellation transaction record
          "createdAt": 1547026471000,  // create time
          "tradeType": "TRADE"
        }
      ]
    }
  }
  */
  return await Http().GET('/api/v1/orders', {
    tradeType,
    ...optional,
  });
};



/**
 * @name getV1HistoricalOrdersList
 * @description Get V1 Historical Orders List
 * @param params
 *   - currentPage [Optional] The current page.
 *   - pageSize [Optional] Number of entries per page.
 *   - symbol [Optional] a valid trading symbol code. e.g. ETH-BTC.
 *   - startAt [Optional] Start time (milisecond)
 *   - endAt [Optional] End time (milisecond)
 *   - side [Optional] buy or sell
 * @return {Object} { code, success, data }
 */
exports.getV1HistoricalOrdersList = async function getV1HistoricalOrdersList(params = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "currentPage": 1,
      "pageSize": 50,
      "totalNum": 1,
      "totalPage": 1,
      "items": [{
          "symbol": "SNOV-ETH",
          "dealPrice": "0.0000246",
          "dealValue": "0.018942",
          "amount": "770",
          "fee": "0.00001137",
          "side": "sell",
          "createdAt": 1540080199
      }]
    }
  }
  */
  return await Http().GET('/api/v1/hist-orders', {
    ...params,
  });
};

/**
 * @name getRecentOrders
 * @description Recent Orders. Request via this endpoint to get 1000 orders in the last 24 hours.
 * @return {Object} { code, success, data }
 */
exports.getRecentOrders = async function getRecentOrders() {
  /*
  {
    "code": "200000",     
    "data": {
      "currentPage": 1,
      "pageSize": 1,
      "totalNum": 153408,
      "totalPage": 153408,
      "items": [
        {
          "id": "5c35c02703aa673ceec2a168",
          "symbol": "BTC-USDT",
          "opType": "DEAL",
          "type": "limit",
          "side": "buy",
          "price": "10",
          "size": "2",
          "funds": "0",
          "dealFunds": "0.166",
          "dealSize": "2",
          "fee": "0",
          "feeCurrency": "USDT",
          "stp": "",
          "stop": "",
          "stopTriggered": false,
          "stopPrice": "0",
          "timeInForce": "GTC",
          "postOnly": false,
          "hidden": false,
          "iceberg": false,
          "visibleSize": "0",
          "cancelAfter": 0,
          "channel": "IOS",
          "clientOid": "",
          "remark": "",
          "tags": "",
          "isActive": false,
          "cancelExist": false,
          "createdAt": 1547026471000,
          "tradeType": "TRADE"
        }
      ]
    }
  }
  */
  return await Http().GET('/api/v1/limit/orders');
};

/**
 * @name getOrderByID
 * @description Get an order
 * @param orderId Order ID, unique identifier of an order, obtained via the List orders.
 * @return {Object} { code, success, data }
 */
exports.getOrderByID = async function getOrderByID(orderId) {
  /*
  {
    "code": "200000",     
    "data": {
      "id": "5c35c02703aa673ceec2a168",
      "symbol": "BTC-USDT",
      "opType": "DEAL",
      "type": "limit",
      "side": "buy",
      "price": "10",
      "size": "2",
      "funds": "0",
      "dealFunds": "0.166",
      "dealSize": "2",
      "fee": "0",
      "feeCurrency": "USDT",
      "stp": "",
      "stop": "",
      "stopTriggered": false,
      "stopPrice": "0",
      "timeInForce": "GTC",
      "postOnly": false,
      "hidden": false,
      "iceberg": false,
      "visibleSize": "0",
      "cancelAfter": 0,
      "channel": "IOS",
      "clientOid": "",
      "remark": "",
      "tags": "",
      "isActive": false,
      "cancelExist": false,
      "createdAt": 1547026471000,
      "tradeType": "TRADE"
    }
  }
  */
  return await Http().GET(`/api/v1/orders/${orderId}`);
};
