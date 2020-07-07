const API = require('../src');

API.init(require('./config'));

const main = async () => {
  const getTimestampRl = await API.rest.Others.getTimestamp();
  console.log(getTimestampRl.data);

  const getStatusRl = await API.rest.Others.getStatus();
  console.log(getStatusRl);
};

// run rest main
main();
