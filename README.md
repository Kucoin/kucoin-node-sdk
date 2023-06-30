# kucoin-node-sdk for KuCoin API
KuCoin API SDK for Node.js language

The detailed document [https://docs.kucoin.com](https://docs.kucoin.com).

[![Latest Version](https://img.shields.io/github/v/release/Kucoin/kucoin-node-sdk.svg?style=flat-square)](https://github.com/Kucoin/kucoin-node-sdk/releases)

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


## Init Configure
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
You can use `baseUrl` method to change evironment.
| **Environment** | **BaseUri** |
| -------- | -------- |
| *Production* `DEFAULT` | https://openapi-v2.kucoin.com |
| *Sandbox* | https://openapi-sandbox.kucoin.com |

If you only need to use the public web socket client or REST client public method, you can igonre `withApiKey` method. To customize your own API implementation, you may use the `with*API` method we provided for you.

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

/** Run Demo for all apis */
REST API: yarn dev
SW:  yarn dev-ws (you can opt the params for different sw demo in demo,such as follow exp)

"dev-ws": "cross-env PRODUCTION=dev nodemon demo/xxx_demo.js",

```

## Demo SDK for all APIS

DEMO: [demo/index.js](https://github.com/Kucoin/kucoin-node-sdk/blob/master/demo/index.js)


## API Modules

### Rest/User
```
Signature is required for this part.
```

#### Rest/User/UserInfo
- [x] getSubUsers
- [x] getPaginatedSubUsers
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
- [x] getAccountSummaryInfo
- [x] createSubAccount
- [x] getSubAccountSpotApiList
- [x] createSpotAPIsForSubAccount
- [x] updateSubAccountSpotApis
- [x] deleteSubAccountSpotApis
- [x] getPaginatedSubAccountInformation
- [x] transferToHFAccount
- [x] getHighFrequencyAccountLedger

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
- [x] placeHfOrder
- [x] syncPlaceHfOrder
- [x] placeMultipleHfOrders
- [x] syncPlaceMultipleHfOrders
- [x] modifyOrder
- [x] cancelOrdersByOrderId
- [x] syncCancelOrdersByOrderId
- [x] cancelOrderByClientOid
- [x] syncCancelOrdersByClientOid
- [x] cancelSpecifiedNumberOfOrdersByOrderId
- [x] cancelAllHfOrdersBySymbol
- [x] obtainListOfActiveHfOrders
- [x] obtainListOfSymbolWithActiveHfOrders
- [x] obtainListOfFilledHfOrders
- [x] detailsOfAsingleHfOrder
- [x] obtainDetailsOfASingleHfOrder
- [x] hfAutoCancelSetting
- [x] queryHfAutoCancelOrderSetting
#### Rest/Trade/StopOrder
- [x] postStopOrder
- [x] cancelOrder
- [x] cancelMultiOrders
- [x] getOrder
- [x] getStopOrderList
- [x] getOrderByClientOid
- [x] cancelSingleOrderByClientOid
- [x] getSingleStopOrderInfo
- [x] cancelStopOrder
#### Rest/Trade/Fills
- [x] getFillsList
- [x] getRecentFills
- [x] getHfTransactionRecords

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
- [x] getSymbolsList
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
- [x] getCurrencyDetail
#### Rest/Margin/MarginInfo
- [x] getMarkPrice
- [x] getMarginConfigurationInfo
- [x] getMarginAccount
- [x] postMarginOrder
- [x] getMarginPriceStrategy
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
#### Rest/Margin/Isolated
- [x] queryIsolatedMarginTradingPairConfiguration
- [x] queryIsolatedMarginAccountInfo
- [x] querySingleIsolatedMarginAccountInfo
- [x] isolatedMarginBorrowing
- [x] queryOutstandingRepaymentRecords
- [x] queryRepaymentRecords
- [x] quickRepayment
- [x] singleRepayment

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

### test exp
```
yarn test

```

// TODO

## LICENSE

[Apache-2.0 License](https://github.com/Kucoin/kucoin-node-sdk/blob/master/LICENSE)

