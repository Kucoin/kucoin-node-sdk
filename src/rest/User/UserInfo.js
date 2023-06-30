
const Http = require('../../lib/http');

/**
 * @name getSubUsers
 * @description Get User Info of all Sub-Accounts.
 * @updateTime 17/02/23 add its response value (uid、access)
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

// owen.guo@kupotech.com update api

/**
 * @name getPaginatedSubUsers
 * @description Get Paginated List of Sub-Accounts.
 * @param {Object}
 * - {Int} currentPage - [Optional] Current request page. Default is 1
 * - {Int} pageSize - [Optional] Number of results per request. Minimum is 1, maximum is 100, default is 10.
 * @return {Object} { code, success, data }
 */
exports.getPaginatedSubUsers = async function getPaginatedSubUsers({currentPage,pageSize}) {
  return await Http().GET('/api/v2/sub/user',{ currentPage,pageSize });
}
