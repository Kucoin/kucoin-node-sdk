const API = require("../src");

API.init(require("./config"));

const orderTestMain = async () => {
  const getTimestampRl = await API.rest.Others.getTimestamp();
  console.log(getTimestampRl.data);

  async function placeOrderTest() {
    try {
      const orderParams = {
        side: "buy", // or 'sell'
        symbol: "ETH-BTC",
        type: "limit", // or 'market' (default is limit)
        price: "0.035", // Price for limit orders (Mandatory for limit orders)
        size: "1.5", // Quantity for limit orders (Mandatory for limit orders)
        timeInForce: "GTC", // Order time-in-force strategy: GTC, GTT, IOC, FOK (default is GTC)
        remark: "My order", // Order description (Optional)
        stp: "CN", // Self-trade prevention strategy: CN, CO, CB, DC (Optional)
        tradeType: "TRADE", // Trade type: TRADE (spot trading) or MARGIN_TRADE (margin trading) (default is TRADE)
        postOnly: false, // Flag for post-only orders, invalid when timeInForce is IOC or FOK (Optional)
        hidden: false, // Whether to hide the order (not displayed in the order book) (Optional)
        iceberg: false, // Whether to display only the visible part of the iceberg order (Optional)
        visibleSize: "0.8", // Maximum display quantity for iceberg orders (Optional)
        funds: "100", // Funds for market orders (Optional, either size or funds must be specified)
      };
      const response = await API.rest.Trade.Orders.placeOrderTest(orderParams)
      console.log("Order created successfully:", response);
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  }
  placeOrderTest();

  async function placeHfOrderTest(){
    try {
      const orderParams = {
        side: "buy", // 'buy' or 'sell'
        symbol: "ETH-BTC", // Trading pair (e.g., ETH-BTC)
        type: "limit", // Order type: 'limit' or 'market' (default is 'limit')
        price: "0.05", // Specify the price for limit orders
        size: "1.5", // Specify the quantity
        // Other optional parameters can be added here
      };
      const orderResult = await API.rest.Trade.Orders.placeHfOrderTest(orderParams)
      console.log("HfOrder created successfully::", orderResult);
    } catch (error) {
      console.error("Error creating hforder::", error.message);
    }
  }
  placeHfOrderTest();

  async function postMarginOrderTest(){
    try {
      const orderParams = {
        side: "buy", // 'buy' or 'sell'
        symbol: "ETH-BTC", // Trading pair (e.g., ETH-BTC)
        type: "limit", // Order type: 'limit' or 'market' (default is 'limit')
        price: "0.05", // Specify the price for limit orders
        size: "1.5", // Specify the quantity
        // Other optional parameters can be added here
      };
      const orderResult = await API.rest.Margin.MarginInfo.postMarginOrderTest(orderParams)
      console.log("Order result:", orderResult);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  postMarginOrderTest();
};

// run rest orderTestMain
orderTestMain();
