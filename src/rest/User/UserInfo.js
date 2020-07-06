
const Http = require('../../lib/http');

/**
 * @name getSubUsers
 * @description Get User Info of all Sub-Accounts.
 * @return {Object} { code, success, data }
 */
exports.getSubUsers = async function getSubUsers() {
  /*
  {
    "code": "200000",     
    "data": [{
      "userId": "5cbd31ab9c93e9280cd36a0a",  //subUserId
      "subName": "kucoin1",
      "remarks": "kucoin1"
    },
    {
        "userId": "5cbd31b89c93e9280cd36a0d",
        "subName": "kucoin2",
        "remarks": "kucoin2"
    }]
  }
  */
  return await Http().GET('/api/v1/sub/user');
};
