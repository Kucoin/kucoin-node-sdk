const API = require('../src');

API.init(require('./config'));

const main = async () => {
  const getTimestampRl = await API.rest.others.getTimestamp();
  console.log(getTimestampRl.data);

  const getStatusRl = await API.rest.others.getStatus();
  console.log(getStatusRl);
};

// run demo
main();
