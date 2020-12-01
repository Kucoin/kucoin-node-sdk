/** set NODE_TLS_REJECT_UNAUTHORIZED off */
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { setConfig } = require('./lib/config');

/**
 * For set init auth config
 */
exports.init = (cfg) => {
  if (typeof cfg !== 'object') {
    throw new Error('Invalid cfg type');
  }

  if (typeof cfg.apiAuth !== 'object') {
    throw new Error('Invalid cfg content');
  }

  setConfig(cfg);
};

/** Exports REST APIs */
exports.rest = {
  User: {
    UserInfo: require('./rest/User/UserInfo'),
    Account: require('./rest/User/Account'),
    Deposit: require('./rest/User/Deposit'),
    Withdrawals: require('./rest/User/Withdrawals'),
    TradeFee: require('./rest/User/TradeFee'),
  },
  Trade: {
    Orders: require('./rest/Trade/Orders'),
    StopOrder: require('./rest/Trade/StopOrder'),
    Fills: require('./rest/Trade/Fills'),
  },
  Market: {
    Symbols: require('./rest/Market/Symbols'),
    OrderBook: require('./rest/Market/OrderBook'),
    Histories: require('./rest/Market/Histories'),
    Currencies: require('./rest/Market/Currencies'),
  },
  Margin: {
    MarginInfo: require('./rest/Margin/MarginInfo'),
    BorrowAndLend: require('./rest/Margin/BorrowAndLend'),
  },
  Others: require('./rest/Others'),
};

/** Exports Datafeed */
exports.websocket = {
  Datafeed: require('./lib/datafeed'),
  Level2: require('./datafeed/Level2'),
};
