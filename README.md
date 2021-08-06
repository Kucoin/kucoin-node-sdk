# kucoin-node-sdk
KuCoin API SDK for Node.js language

## Env

```
Nodejs version >= 10.0
```

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

### Init Configure
```
{
  baseUrl: '',
  apiAuth: {
    key: '', // KC-API-KEY
    secret: '', // API-Secret
    passphrase: '', // KC-API-PASSPHRASE
  },
  authVersion: 2, // KC-API-KEY-VERSION. Notice: for v2 API-KEY, not required for v1 version.
}
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
- [x] getDepositAddressV2
- [x] getDepositAddress
- [x] getDepositList
- [x] getV1HistoricalDepositsList
#### Rest/User/Withdrawals
- [x] getWithdrawalsList
- [x] getV1HistoricalWithdrawalsList
- [x] getWithdrawalQuotas
- [x] applyWithdraw
- [x] cancelWithdrawal
#### Rest/User/TradeFee
- [x] getBasicUserFee
- [x] getActualFeeRateBySymbols

### Rest/Trade
```
Signature is required for this part.
```

#### Rest/Trade/Orders
- [x] postOrder
- [x] postMultiOrders
- [x] cancelOrder
- [x] cancelOrderByClientOid
- [x] cancelAllOrders
- [x] getOrdersList
- [x] getV1HistoricalOrdersList
- [x] getRecentOrders
- [x] getOrderByID
- [x] getSingleActiveOrderByClientOid
#### Rest/Trade/StopOrder
- [x] postStopOrder
- [x] cancelOrder
- [x] cancelMultiOrders
- [x] getOrder
- [x] getStopOrderList
- [x] getOrderByClientOid
- [x] cancelSingleOrderByClientOid
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
- [x] postMarginOrder
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

### API.websocket.Datafeed

Manage websocket connect/private/subscribe/unsubscribe and get realtime datafeed.

DEMO: [demo/ticker_demo.js](https://github.com/Kucoin/kucoin-node-sdk/blob/master/demo/ticker_demo.js)

### API.websocket.Level2

Get realtime orderbook in level2 datafeed.

DEMO: [demo/level2_demo.js](https://github.com/Kucoin/kucoin-node-sdk/blob/master/demo/level2_demo.js)


### API.websocket.Level3

// TODO

## LICENSE

[Apache-2.0 License](https://github.com/Kucoin/kucoin-node-sdk/blob/master/LICENSE)

