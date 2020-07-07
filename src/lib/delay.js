const _ = require('lodash');

const delay = (ms = 1000) => {
  return new Promise((resolve) => {
    _.delay(() => {
      resolve();
    }, ms);
  });
};

module.exports = delay;
