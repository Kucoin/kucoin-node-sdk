const API = require('../src');

API.init(require('./config'));

const main = async () => {
  const getTimestampRl = await API.rest.Others.getTimestamp();
  console.log(getTimestampRl.data);

  const res = await API.rest.User.Deposit.getDepositAddressV2('BTC');
  console.log(res);
};

// run rest main
main();
