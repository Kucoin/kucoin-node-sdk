const API = require("../src");

API.init(require("./config"));

const vipLendingMain = async () => {
  /**
   * @name demoGetOtcLoanInformation
   * @description Demo function to get information on off-exchange funding and loans
   * @updateTime 07/12/24
   */
  async function demoGetOtcLoanInformation() {
    try {
      const result = await API.rest.VIPLending.OtcLoan.getOtcLoanInformation();

      console.log("OTC Loan Information:", result);
    } catch (error) {
      console.error("Error fetching OTC loan information:", error.message);
    }
  }

  demoGetOtcLoanInformation();

  /**
   * @name getOtcLoanAccounts
   * @description Get information on accounts involved in off-exchange loans
   * @updateTime 10/05/23
   * @return {Object} The information on accounts involved in off-exchange loans
   */
  async function fetchOtcLoanAccounts() {
    try {
      const result = await API.rest.VIPLending.OtcLoan.getOtcLoanAccounts();

      console.log("OTC Loan Accounts Information:", result);
    } catch (error) {
      console.error("Error fetching OTC loan accounts:", error.message);
    }
  }

  fetchOtcLoanAccounts();
};

// run rest vipLendingMain
vipLendingMain();
