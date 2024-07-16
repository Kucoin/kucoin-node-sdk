const API = require("../src");

API.init(require("./config"));

const earnMain = async () => {
  const getTimestampRl = await API.rest.Others.getTimestamp();
  console.log(getTimestampRl.data);

  /**
   * @name demoSubscribeToEarnFixedIncomeProducts
   * @description Demo function to subscribe to fixed income products
   * @updateTime 07/12/24
   */
  async function demoSubscribeToEarnFixedIncomeProducts() {
    try {
      const result =
        await API.rest.Earn.General.subscribeToEarnFixedIncomeProducts({
          productId: "12345", // Example product ID
          amount: "1000", // Example subscription amount
          accountType: "MAIN", // Example account type
        });
      console.log("Subscription successful:", result);
    } catch (error) {
      console.error(
        "Error subscribing to fixed income products:",
        error.message
      );
    }
  }

  demoSubscribeToEarnFixedIncomeProducts();

  /**
   * @name demoRedeemByEarnHoldingId
   * @description Demo function to initiate redemption by holding ID
   * @updateTime 07/12/24
   */
  async function demoRedeemByEarnHoldingId() {
    try {
      const result = await API.rest.Earn.General.redeemByEarnHoldingId({
        orderId: "13100", // Example holding ID
        amount: "1", // Example redemption amount
        fromAccountType: "MAIN", // Example account type (optional)
        confirmPunishRedeem: "1", // Example confirmation for early redemption penalty (optional)
      });
      console.log("Redemption successful:", result);
    } catch (error) {
      console.error("Error initiating redemption:", error.message);
    }
  }

  demoRedeemByEarnHoldingId();

  /**
   * @name demoGetEarnRedeemPreviewByHoldingId
   * @description Demo function to get redemption preview information by holding ID
   * @updateTime 07/12/24
   */
  async function demoGetEarnRedeemPreviewByHoldingId() {
    try {
      const result =
        await API.rest.Earn.General.getEarnRedeemPreviewByHoldingId({
          orderId: "13100", // Example holding ID
          fromAccountType: "MAIN", // Example account type (optional)
        });

      console.log("Redemption Preview Information:", result);
    } catch (error) {
      console.error(
        "Error fetching redemption preview information:",
        error.message
      );
    }
  }

  demoGetEarnRedeemPreviewByHoldingId();

  /**
   * @name demoGetEarnSavingsProducts
   * @description Demo function to get savings products
   * @updateTime 07/12/24
   */

  async function demoGetEarnSavingsProducts() {
    try {
      const result = await API.rest.Earn.KucoinEarn.getEarnSavingsProducts({
        currency: "USDT", // Example currency (optional)
      });

      console.log("Savings Products:", result);
    } catch (error) {
      console.error("Error fetching savings products:", error.message);
    }
  }

  demoGetEarnSavingsProducts();

  /**
   * @name demoGetEarnFixedIncomeCurrentHoldings
   * @description Demo function to get current holding assets of fixed income products
   * @updateTime 07/12/24
   */

  async function demoGetEarnFixedIncomeCurrentHoldings() {
    try {
      const result =
        await API.rest.Earn.KucoinEarn.getEarnFixedIncomeCurrentHoldings({
          currentPage: 1, // Example page number (optional)
          pageSize: 20, // Example page size (optional)
          productId: "1", // Example product ID (optional)
          productCategory: "STAKING", // Example product category (optional)
          currency: "ATOM", // Example subscription currency (optional)
        });

      console.log("Current Holdings:", result);
    } catch (error) {
      console.error("Error fetching current holdings:", error.message);
    }
  }

  demoGetEarnFixedIncomeCurrentHoldings();

  /**
 * @name demoGetEarnPromotionProducts
 * @description Demo function to get limited-time promotion products
 * @updateTime 07/12/24
 */
  async function demoGetEarnPromotionProducts() {
    try {
      const result = await API.rest.Earn.KucoinEarn.getEarnPromotionProducts({
        currency: "USDT", // Example currency (optional)
      });

      console.log("Promotion Products:", result);
    } catch (error) {
      console.error("Error fetching promotion products:", error.message);
    }
  }

  demoGetEarnPromotionProducts();

  /**
 * @name demoGetKcsStakingProducts
 * @description Demo function to get KCS Staking products
 * @updateTime 07/12/24
 */
  async function demoGetKcsStakingProducts() {
    try {
      const result = await API.rest.Earn.Staking.getKcsStakingProducts({
        currency: "KCS", // Example currency (optional)
      });

      console.log("KCS Staking Products:", result);
    } catch (error) {
      console.error("Error fetching KCS Staking products:", error.message);
    }
  }

  demoGetKcsStakingProducts();

  /**
 * @name demoGetEarnStakingProducts
 * @description Demo function to get staking products
 * @updateTime 07/12/24
 */

  async function demoGetEarnStakingProducts() {
    try {
      const result = await API.rest.Earn.Staking.getEarnStakingProducts({
        currency: "USDT", // Example currency (optional)
      });

      console.log("Staking Products:", result);
    } catch (error) {
      console.error("Error fetching staking products:", error.message);
    }
  }

  demoGetEarnStakingProducts();

  /**
 * @name demoGetEthStakingProducts
 * @description Demo function to get ETH Staking products
 * @updateTime 07/12/24
 */
  async function demoGetEthStakingProducts() {
    try {
      const result = await API.rest.Earn.Staking.getEthStakingProducts();

      console.log("ETH Staking Products:", result);
    } catch (error) {
      console.error("Error fetching ETH Staking products:", error.message);
    }
  }

  demoGetEthStakingProducts();
};

// run rest earnMain
earnMain();
