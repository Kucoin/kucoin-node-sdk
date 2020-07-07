# kucoin-node-sdk
KuCoin API SDK for Node.js language


## Install
```
# install by npm
npm install kucoin-node-sdk


# install by yarn
yarn add kucoin-node-sdk
```


## Usage

```
/** Require SDK */
const API = require('kucoin-node-sdk');

/** Init Configure */
API.init(require('./config'));

/** API use */
const main = async () => {
  const getTimestampRl = await API.rest.Others.getTimestamp();
  console.log(getTimestampRl.data);
};

/** Run Demo */
main();
```

## API Modules

### Rest/User
```
Signature is required for this part.
```

#### Rest/User/UserInfo
- [x] getSubUsers
#### Rest/User/Account
- [x] createAccount
- [x] getAccountsList
- [x] getAccountInformation
- [x] getAccountLedgers
- [x] getHolds
- [x] getBalanceOfSubAccount
- [x] getAggregatedBalanceOfAllSubAccounts
- [x] getTransferable
- [x] transferBetweenMasterUserAndSubUser
- [x] innerTransfer
#### Rest/User/Deposit
- [x] createDepositAddress
- [x] getDepositAddress
- [x] getDepositList
- [x] getV1HistoricalDepositsList
#### Rest/User/Withdrawals
- [x] getWithdrawalsList
- [x] getV1HistoricalWithdrawalsList
- [x] getWithdrawalQuotas
- [x] applyWithdraw
- [x] cancelWithdrawal

### Rest/Trade
```
Signature is required for this part.
```

#### Rest/Trade/Orders
- [x] postOrder
- [x] postMultiOrders
- [x] cancelOrder
- [x] cancelAllOrders
- [x] getOrdersList
- [x] getV1HistoricalOrdersList
- [x] getRecentOrders
- [x] getOrderByID
#### Rest/Trade/StopOrder
- [x] postStopOrder
- [x] cancelOrder
- [x] cancelMultiOrders
- [x] getOrder
- [x] getStopOrderList
- [x] getOrderByClientOid
#### Rest/Trade/Fills
- [x] getFillsList
- [x] getRecentFills

### Rest/Market
```
Signature is not required for this part
```
#### Rest/Market/Symbols
- [x] getSymbolsList
- [x] getTicker
- [x] getAllTickers
- [x] get24hrStats
- [x] getMarketList
#### Rest/Market/OrderBook
- [x] getLevel2_20
- [x] getLevel2_100
- [x] getLevel2_full
- [x] getLevel3_full_v1
- [x] getLevel3_full
#### Rest/Market/Histories
- [x] getMarketHistories
- [x] getMarketCandles
#### Rest/Market/Currencies
- [x] getCurrencies
- [x] getCurrencyDetail
- [x] getFiatPrice
#### Rest/Margin/MarginInfo
- [x] getMarkPrice
- [x] getMarginConfigurationInfo
- [x] getMarginAccount
#### Rest/Margin/BorrowAndLend
- [x] postBorrowOrder
- [x] getBorrowOrder
- [x] getRepayRecord
- [x] getRepaymentRecord
- [x] repayAll
- [x] repaySingle
- [x] postLendOrder
- [x] cancelLendOrder
- [x] setAutoLend
- [x] getActiveOrder
- [x] getLentHistory
- [x] getActiveLendOrdersList
- [x] getSettledLendOrderHistory
- [x] getAccountLendRecord
- [x] getLendingMarketData
- [x] getMarginFillsTradeData

#### Rest/Others
- [x] getTimestamp
- [x] getStatus

## Websocket Datafeed

DEMO:
```
// ws demo
const datafeed = new API.websocket.Datafeed();

// close callback
datafeed.onClose(() => {
  console.log('ws closed, status ', datafeed.trustConnected);
});

// connect
datafeed.connectSocket();

// subscribe
const topic = `/market/ticker:BTC-USDT`;
const callbackId = datafeed.subscribe(topic, (message) => {
  if (message.topic === topic) {
    console.log(message.data);
  }
});

console.log(`subscribe id: ${callbackId}`);
setTimeout(() => {
  // unsubscribe
  datafeed.unsubscribe(topic, callbackId);
  console.log(`unsubscribed: ${topic} ${callbackId}`);  
}, 5000);

```

## LICENSE

[Apache License](LICENSE)

