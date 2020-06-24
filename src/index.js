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
  },
  Others: require('./rest/Others'),
};
