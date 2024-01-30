const API = require('../src');

API.init(require('./config'));

const main = async () => {
  const getTimestampRl = await API.rest.Others.getTimestamp();
  console.log(getTimestampRl.data);
  
  // Place an order
  let response = await API.rest.Trade.OCOOrder.placeOrder({
    symbol: 'BTC-USDT',
    side: 'buy',
    price: '38000',
    size: '1',
    stopPrice: '59000',
    limitPrice: '58000',
    tradeType: 'TRADE',
    clientOid: '123456',
    remark: 'Test order'
  });
  console.log(response);

  // Get an order
  response = await API.rest.Trade.OCOOrder.getOrder('your-order-id');
  console.log(response);

  // Cancel an order
  response = await API.rest.Trade.OCOOrder.cancelOrder('your-order-id');
  console.log(response);

  // Cancel an order by clientOid
  response = await API.rest.Trade.OCOOrder.cancelOrderByClientOid('your-unique-id');
  console.log(response);

  // Cancel all orders
  response = await API.rest.Trade.OCOOrder.cancelAllOrders({ orderIds: 'your-order-id1,your-order-id2', symbol: 'BTC-USDT' });
  console.log(response);

  // Get an order by clientOid
  response = await API.rest.Trade.OCOOrder.getOrderByClientOid('your-unique-id');
  console.log(response);

  // Get all orders
  response = await API.rest.Trade.OCOOrder.getOrders({
    pageSize: '10',
    currentPage: '1',
    symbol: 'BTC-USDT',
    startAt: Date.now() - 24 * 60 * 60 * 1000, // 24 hours ago
    endAt: Date.now()
  });
  console.log(response);

  // Get order details
  response = await API.rest.Trade.OCOOrder.getOrderDetails('your-order-id');
  console.log(response);
};


// run rest main
main();
