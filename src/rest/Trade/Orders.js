
const Http = require('../../lib/http');

/**
 * @name postOrder
 * @description Place a new order. This endpoint requires the "Trade" permission.
 * @param baseParams
 *   - {string} clientOid - Unique order id created by users to identify their orders, e.g. UUID.
 *   - {string} side - buy or sell
 *   - {string} symbol - a valid trading symbol code. e.g. ETH-BTC
 *   - {string} type - [Optional] limit or market (default is limit)
 *   - {string} remark - [Optional] remark for the order, length cannot exceed 100 utf8 characters
 *   - {string} stop - [Optional] Either loss or entry. Requires stopPrice to be defined
 *   - {string} stopPrice - [Optional] Need to be defined if stop is specified.
 *   - {string} stp - [Optional] self trade prevention , CN, CO, CB or DC
 *   - {string} tradeType - [Optional] The type of trading : TRADE（Spot Trade）, MARGIN_TRADE (Margin Trade). Default is TRADE
 * @param orderParams
 *   LIMIT ORDER PARAMETERS
 *   - {string} price - price per base currency
 *   - {string} size - amount of base currency to buy or sell
 *   - {string} timeInForce - [Optional] GTC, GTT, IOC, or FOK (default is GTC), read Time In Force.
 *   - {number} cancelAfter - [Optional] cancel after n seconds, requires timeInForce to be GTT
 *   - {boolean} postOnly - [Optional] Post only flag, invalid when timeInForce is IOC or FOK
 *   - {boolean} hidden - [Optional] Order will not be displayed in the order book
 *   - {boolean} iceberg - [Optional] Only aportion of the order is displayed in the order book
 *   - {string} visibleSize - [Optional] The maximum visible size of an iceberg order
 * 
 *   MARKET ORDER PARAMETERS / It is required that you use one of the two parameters, size or funds.
 *   - {string} size [Optional] - Desired amount in base currency
 *   - {string} funds [Optional] - The desired amount of quote currency to use
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
 *   - {string} clientOid - Unique order id created by users to identify their orders, e.g. UUID.
 *   - {string} side - buy or sell
 *   - {string} symbol - a valid trading symbol code. e.g. ETH-BTC
 *   - {string} type - [Optional] limit or market (default is limit)
 *   - {string} remark - [Optional] remark for the order, length cannot exceed 100 utf8 characters
 *   - {string} stop - [Optional] Either loss or entry. Requires stopPrice to be defined
 *   - {string} stopPrice - [Optional] Need to be defined if stop is specified.
 *   - {string} stp - [Optional] self trade prevention , CN, CO, CB or DC
 *   - {string} tradeType - [Optional] Default is TRADE
 *   - {string} price - price per base currency
 *   - {string} size - amount of base currency to buy or sell
 *   - {string} timeInForce - [Optional] GTC, GTT, IOC, or FOK (default is GTC), read Time In Force.
 *   - {number} cancelAfter - [Optional] cancel after n seconds, requires timeInForce to be GTT
 *   - {boolean} postOnly - [Optional] Post only flag, invalid when timeInForce is IOC or FOK
 *   - {boolean} hidden - [Optional] Order will not be displayed in the order book
 *   - {boolean} iceberg - [Optional] Only aportion of the order is displayed in the order book
 *   - {string} visibleSize - [Optional] The maximum visible size of an iceberg order
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
 * @param {string} orderId - Order ID, unique ID of the order.
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
 *   - {string} symbol - [Optional] symbol, cancel the orders for the specified trade pair.
 *   - {string} tradeType - [Optional] the type of trading, cancel the orders for the specified trading type, and the default is to cancel the spot trading order (TRADE).
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
 * @name cancelOrderByClientOid
 * @description Request via this interface to cancel an order via the clientOid.
 * @param {String} clientOid
 * @return {Object} { code, success, data }
 */
exports.cancelOrderByClientOid = async function cancelOrderByClientOid({ symbol, tradeType } = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "cancelledOrderId": "5f311183c9b6d539dc614db3",
      "clientOid": "6d539dc614db3"
    }
  }
  */
  return await Http().DEL(`/api/v1/order/client-order/${clientOid}`);
};

/**
 * @name getOrdersList
 * @description List Orders
 * @param {string} tradeType - The type of trading : TRADE（Spot Trading）, MARGIN_TRADE (Margin Trading).
 * @param optional
 *   - {string} status - [Optional] active or done(done as default), Only list orders with a specific status .
 *   - {string} symbol - [Optional] Only list orders for a specific symbol.
 *   - {string} side - [Optional] buy or sell
 *   - {string} type - [Optional] limit, market, limit_stop or market_stop
 *   - {number} startAt - [Optional] Start time (milisecond)
 *   - {number} endAt - [Optional] End time (milisecond)
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
 * @updateTime 01/25/22
 * @param params
 *   - {number} currentPage - [Optional] The current page.
 *   - {number} pageSize - [Optional] Number of entries per page.
 *   - {string} symbol - [Optional] a valid trading symbol code. e.g. ETH-BTC.
 *   - {number} startAt - [Optional] Start time (milisecond)
 *   - {number} endAt - [Optional] End time (milisecond)
 *   - {string} side - [Optional] buy or sell
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
 * @param {string} orderId - Order ID, unique identifier of an order, obtained via the List orders.
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

/**
 * @name getSingleActiveOrderByClientOid
 * @description Request via this interface to check the information of a single active order via clientOid. The system will prompt that the order does not exists if the order does not exist or has been settled.
 * @param {string} clientOid - Unique order id created by users to identify their orders
 * @return {Object} { code, success, data }
 */
exports.getSingleActiveOrderByClientOid = async function getSingleActiveOrderByClientOid(clientOid) {
  /*
  {
    "code": "200000",     
    "data": {
      "id": "5f3113a1c9b6d539dc614dc6",
      "symbol": "KCS-BTC",
      "opType": "DEAL",
      "type": "limit",
      "side": "buy",
      "price": "0.00001",
      "size": "1",
      "funds": "0",
      "dealFunds": "0",
      "dealSize": "0",
      "fee": "0",
      "feeCurrency": "BTC",
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
      "channel": "API",
      "clientOid": "6d539dc614db312",
      "remark": "",
      "tags": "",
      "isActive": true,
      "cancelExist": false,
      "createdAt": 1597051810000,
      "tradeType": "TRADE"
    }
  }
  */
  return await Http().GET(`/api/v1/order/client-order/${clientOid}`);
};

// owen.guo@kupotech.com add high-frequency api

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
exports.placeHfOrder = async function placeHfOrder({clientOid,symbol,type,side,stp,tags,remark}) {
  return await Http().POST('/api/v1/hf/orders',{
    clientOid,symbol,type,side,stp,tags,remark
  });
}

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
exports.syncPlaceHfOrder = async function syncPlaceHfOrder({clientOid,symbol,type,side,stp,tags,remark}) {
  return await Http().POST('/api/v1/hf/orders/sync',{
    clientOid,symbol,type,side,stp,tags,remark
  });
}

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
exports.placeMultipleHfOrders = async function placeMultipleHfOrders({clientOid,symbol,type,timeInForce,stp,side,price,size,cancelAfter,postOnly,hidden,iceberg,visibleSize,tags,remark}) {
  return await Http().POST('/api/v1/hf/orders/multi',{
    clientOid,symbol,type,timeInForce,stp,side,price,size,cancelAfter,postOnly,hidden,iceberg,visibleSize,tags,remark
  });
}

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
exports.syncPlaceMultipleHfOrders = async function syncPlaceMultipleHfOrders({clientOid,symbol,type,timeInForce,stp,side,price,size,cancelAfter,postOnly,hidden,iceberg,visibleSize,tags,remark}) {
  return await Http().POST('/api/v1/hf/orders/multi/sync',{
    clientOid,symbol,type,timeInForce,stp,side,price,size,cancelAfter,postOnly,hidden,iceberg,visibleSize,tags,remark
  });
}

/**
 * @name modifyOrder
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

exports.modifyOrder = async function modifyOrder({symbol,clientOid,orderId,newPrice,newSize}) {
  return await Http().POST('/api/v1/hf/orders/alter',{
    symbol,clientOid,orderId,newPrice,newSize
  });
}

/**
 * @name cancelOrdersByOrderId
 * @description Cancel orders by orderId
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} orderId Path parameter，Order Id unique identifier
 * - {String} symbol Trading pair, such as ETH-BTC
 * @return {Object} { code, success, data }
 */
exports.cancelOrdersByOrderId = async function cancelOrdersByOrderId({orderId,symbol}) {
  return await Http().DEL(`/api/v1/hf/orders/${orderId}`,{
    orderId,symbol
  });
}

/**
 * @name syncCancelOrdersByOrderId
 * @description Sync cancel orders by orderId
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} orderId Path parameter，Order Id unique identifier
 * - {String} symbol Trading pair, such as ETH-BTC
 * @return {Object} { code, success, data }
 */
exports.syncCancelOrdersByOrderId = async function syncCancelOrdersByOrderId({orderId,symbol}) {
  return await Http().DEL(`/api/v1/hf/orders/sync/${orderId}`,{
    orderId,symbol
  });
}

/**
 * @name cancelOrderByClientOid
 * @description Cancel order by clientOid
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} clientOid Path parameter，an identifier created by the
 * - {String} symbol Trading pair such as ETH-BTC
 * @return {Object} { code, success, data }
 */

exports.cancelOrderByClientOid = async function cancelOrderByClientOid({clientOid,symbol}) {
  return await Http().DEL(`/api/v1/hf/orders/client-order/${clientOid}`,{
    clientOid,symbol
  });
}

/**
 * @name syncCancelOrdersByClientOid
 * @description Sync cancel orders by clientOid
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} clientOid Path parameter，an identifier created by the
 * - {String} symbol Trading pair such as ETH-BTC
 * @return {Object} { code, success, data }
 */

exports.syncCancelOrdersByClientOid = async function syncCancelOrdersByClientOid({clientOid,symbol}) {
  return await Http().DEL(`/api/v1/hf/orders/sync/client-order/${clientOid}`,{
    clientOid,symbol
  });
}

/**
 * @name cancelSpecifiedNumberOfOrdersByOrderId
 * @description Cancel specified number of orders by orderId
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} orderId Order id of the cancelled order
 * - {String} symbol Trading pair such as ETH-BTC
 * - {String} cancelSize canceled size
 * @return {Object} { code, success, data }
 */
exports.cancelSpecifiedNumberOfOrdersByOrderId = async function cancelSpecifiedNumberOfOrdersByOrderId({orderId,symbol,cancelSize	}) {
  return await Http().DEL(`/api/v1/hf/orders/cancel/${orderId}`,{
    orderId,symbol,cancelSize	
  });
}

/**
 * @name cancelAllHfOrdersBySymbol
 * @description Cancel all HF orders by symbol
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} symbol Cancel open orders pertaining to the specified trading pair
 * @return {Object} { code, success, data }
 */

exports.cancelAllHfOrdersBySymbol = async function cancelAllHfOrdersBySymbol({symbol}) {
  return await Http().DEL('/api/v1/hf/orders',{
   symbol
  });
}

/**
 * @name obtainListOfActiveHfOrders
 * @description Obtain List of Active HF Orders
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} symbol Only returns order information for the specified trading pair
 * @return {Object} { code, success, data }
 */

exports.obtainListOfActiveHfOrders = async function obtainListOfActiveHfOrders({symbol}) {
  return await Http().GET('/api/v1/hf/orders/active',{
   symbol
  });
}

/**
 * @name obtainListOfSymbolWithActiveHfOrders
 * @description Obtain List of symbol with active HF orders
 * @updateTime 02/03/23
 * @return {Object} { code, success, data }
 */

exports.obtainListOfSymbolWithActiveHfOrders = async function obtainListOfSymbolWithActiveHfOrders() {
  return await Http().GET('/api/v1/hf/orders/active/symbols');
}

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
exports.obtainListOfFilledHfOrders = async function obtainListOfFilledHfOrders({symbol,side,type,startAt,endAt,lastId,limit}) {
  return await Http().GET('/api/v1/hf/orders/done',{
    symbol,side,type,startAt,endAt,lastId,limit
  });
}

/**
 * @name detailsOfAsingleHfOrder
 * @description Details of a Single HF Order
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} orderId Path parameter，Order Id unique identifier
 * - {String} symbol Trading pair, such as ETH-BTC
 * @return {Object} { code, success, data }
 */

exports.detailsOfAsingleHfOrder = async function detailsOfAsingleHfOrder({orderId,symbol}) {
  return await Http().GET(`/api/v1/hf/orders/${orderId}`,{
    orderId,symbol
  });
}

/**
 * @name obtainDetailsOfASingleHfOrder
 * @description Obtain details of a single HF order using clientOid
 * @updateTime 02/03/23
 * @param {Object}
 * - {String} clientOid Path parameter，an identifier created by the client
 * - {String} symbol Trading pair such as ETH-BTC
 * @return {Object} { code, success, data }
 */

exports.obtainDetailsOfASingleHfOrder = async function obtainDetailsOfASingleHfOrder({clientOid,symbol}) {
  return await Http().GET(`/api/v1/hf/orders/client-order/${clientOid}`,{
    clientOid,symbol
  });
}


/**
 * @name hfAutoCancelSetting
 * @description HF auto cancel setting
 * @updateTime 02/03/23
 * @param {Object}
 * - {Int} timeout Auto cancel order trigger setting time, the unit is second. range: timeout=-1 (meaning unset) or 5 <= timeout <= 86400. For example, timeout=5 means that the order will be automatically canceled if no user request is received for more than 5 seconds. When this parameter is changed, the previous setting will be overwritten.
 * - {String} symbols List of trading pairs. When this parameter is not empty, separate it with commas and support up to 50 trading pairs. Empty means all trading pairs. When this parameter is changed, the previous setting will be overwritten.
 * @return {Object} { code, success, data }
 */
exports.hfAutoCancelSetting = async function hfAutoCancelSetting({ timeout,symbols}) {
  return await Http().POST('/api/v1/hf/orders/dead-cancel-all',{
    timeout,symbols
  });
}

/**
 * @name queryHfAutoCancelOrderSetting
 * @description HF auto cancel order setting query
 * @updateTime 02/03/23
 * @return {Object} { code, success, data }
 */
exports.queryHfAutoCancelOrderSetting = async function queryHfAutoCancelOrderSetting() {
  return await Http().GET('/api/v1/hf/orders/dead-cancel-all/query');
}