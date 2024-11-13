const API = require("../src");

API.init(require("./config"));

const userMain = async () => {
  const getTimestampRl = await API.rest.Others.getTimestamp();
  console.log(getTimestampRl.data);

  /**
 * @name universalTransfer
 * @description Request via this endpoint to perform a universal transfer between accounts
 * @updateTime 05/29/24
 * @param {String} clientOid - Client Order Id, a unique identifier created by the client, recommended to use UUID, maximum length is 128 characters (Mandatory)
 * @param {String} currency - Currency (Mandatory)
 * @param {String} amount - Transfer amount, must be an integer multiple of the currency precision (Mandatory)
 * @param {String} fromUserId - User ID from which the funds are transferred, required when transferring from sub-account to main account, optional for internal transfers (Optional)
 * @param {String} fromAccountType - Account type from which the funds are transferred: MAIN, TRADE, CONTRACT, MARGIN, ISOLATED, TRADE_HF, MARGIN_V2, ISOLATED_V2 (Mandatory)
 * @param {String} fromAccountTag - Trading pair, required when the account type is ISOLATED or ISOLATED_V2, e.g., BTC-USDT (Optional)
 * @param {String} type - Transfer type: INTERNAL (internal transfer), PARENT_TO_SUB (main account to sub-account), SUB_TO_PARENT (sub-account to main account) (Mandatory)
 * @param {String} toUserId - User ID to which the funds are transferred, required when transferring from main account to sub-account, optional for internal transfers (Optional)
 * @param {String} toAccountType - Account type to which the funds are transferred: MAIN, TRADE, CONTRACT, MARGIN, ISOLATED, TRADE_HF, MARGIN_V2, ISOLATED_V2 (Mandatory)
 * @param {String} toAccountTag - Trading pair, required when the account type is ISOLATED or ISOLATED_V2, e.g., BTC-USDT (Optional)
 * @return {Object} { code, success, data }
 */
  async function universalTransfer() {
    try {
      const response = await API.rest.User.Account.universalTransfer({
        clientOid: "unique-client-oid",
        currency: "BTC",
        amount: "0.01",
        fromUserId: "12345",
        fromAccountType: "MAIN",
        fromAccountTag: "BTC-USDT",
        type: "INTERNAL",
        toUserId: "67890",
        toAccountType: "TRADE",
        toAccountTag: "BTC-USDT",
      });
      console.log(response);
    } catch (error) {
      console.error("Error performing universal transfer:", error);
    }
  }
  universalTransfer();


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
  async function getAnnouncementsDemo() {
    try {
      const response = await API.rest.Others.getAnnouncements({
        currentPage: 1,
        pageSize: 10,
        annType: 'latest-announcements',
        lang: 'en_US'
      });
      
      console.log("Announcements:", response);
      
      if (response.data && response.data.items) {
        console.log("Total announcements:", response.data.totalNum);
        console.log("First announcement title:", response.data.items[0].annTitle);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  }
  
  getAnnouncementsDemo();
};

// run rest userMain
userMain();
