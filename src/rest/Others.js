
const Http = require('../lib/http');

/**
 * @name getTimestamp
 * @description Get the server time.
 * @return {Object} { code, success, data }
 */
exports.getTimestamp = async function getTimestamp() {
  /*
  {
    "code":"200000",
    "msg":"success",
    "data":1546837113087
  }
  */
  return await Http().GET('/api/v1/timestamp');
};

/**
 * @name getStatus
 * @description Get the service status.
 * @return {Object} { code, success, data }
 */
exports.getStatus = async function getStatus() {
  /*
  {
    "code": "200000",     
    "data": {
      "status": "open",                //open, close, cancelonly
      "msg":  "upgrade match engine"   //remark for operation
    }
  }
  */
  return await Http().GET('/api/v1/status');
};

/**
 * @name getAnnouncements
 * @description Get the latest news announcements
 * @updateTime 11/13/24
 * @param {Object} params
 * @param {Number} [params.currentPage] - Page number (Optional)
 * @param {Number} [params.pageSize] - Page size (Optional)
 * @param {String} [params.annType] - Announcement types: latest-announcements, activities, new-listings, product-updates, vip, maintenance-updates, delistings, others, api-campaigns (Optional)
 * @param {String} [params.lang] - Language type, default is en_US (Optional)
 * @param {Number} [params.startTime] - Announcement online start time (milliseconds) (Optional)
 * @param {Number} [params.endTime] - Announcement online end time (milliseconds) (Optional)
 * @return {Promise} { code, data: { totalNum, items, currentPage, pageSize, totalPage } } 
 */
exports.getAnnouncements = async function getAnnouncements(params = {}) {
  return await Http().GET("/api/v3/announcements", params);
};