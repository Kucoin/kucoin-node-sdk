const Http = require('../../lib/http');

/**
 * @name getOtcLoanInformation
 * @description Get information on off-exchange funding and loans
 * @updateTime 07/12/24
 * @return {Object} - The response containing loan information
 */
exports.getOtcLoanInformation = async function getOtcLoanInformation() {
    const response = await Http().GET('/api/v1/otc-loan/loan');
    return response.data;
  }
  
  /**
 * @name getOtcLoanAccounts
 * @description Get information on accounts involved in off-exchange loans
 * @updateTime 07/12/24
 * @return {Object} The information on accounts involved in off-exchange loans
 */
exports.getOtcLoanAccounts = async function getOtcLoanAccounts() {
    const url = '/api/v1/otc-loan/accounts';
    try {
      const response = await Http().GET(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching OTC loan accounts:", error.message);
      throw error;
    }
  }
  