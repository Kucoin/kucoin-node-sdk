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

/** init configure */
API.init(require('./config'));

/** API use */
const main = async () => {
  const getTimestampRl = await API.rest.others.getTimestamp();
  console.log(getTimestampRl.data);
};

/** run demo */
main();
```

## API Modules

### Rest/User
```
Signature is required for this part.
```

#### Rest/User/UserInfo
- [ ] getSubUsers
#### Rest/User/Account
- [ ] createAccount
- [ ] getAccountsList
- [ ] getAccountInformation
- [ ] getAccountLedgers
- [ ] getHolds
- [ ] getAccount
- [ ] getBalanceOfSubAccount
- [ ] getAggregatedBalanceOfAllSubAccounts
- [ ] getTransferable
- [ ] transferBetweenMasterUserAndSubUser
- [ ] innerTransfer
#### Rest/User/Deposit
- [ ] createDepositAddress
- [ ] getDepositAddress
- [ ] getDepositList
- [ ] getV1HistoricalDepositsList
#### Rest/User/Withdrawals
- [ ] getWithdrawalsList
- [ ] getV1HistoricalWithdrawalsList
- [ ] getWithdrawalQuotas
- [ ] applyWithdraw
- [ ] cancelWithdrawal

### Rest/Trade
```
Signature is required for this part.
```

#### Rest/Trade/Orders
- [ ] postOrder
- [ ] postMultiOrders
- [ ] cancelOrder
- [ ] cancelAllOrders
- [ ] getOrdersList
- [ ] getV1HistoricalOrdersList
- [ ] getRecentOrders
- [ ] getOrderByID
#### Rest/Trade/止盈止损
- [ ] 下单
- [ ] 单个撤单
- [ ] 批量撤单
- [ ] 单个订单详情
- [ ] 获取止盈止损单列表
- [ ] 根据clientOid获取单个订单详情
#### Rest/Trade/Fills
- [ ] getFillsList
- [ ] getRecentFills

### Rest/Market
```
Signature is not required for this part
```
#### Rest/Market/Symbols
- [ ] getSymbolsList
- [ ] getTicker
- [ ] getAllTickers
- [ ] get24hrStats
- [ ] getMarketList
#### Rest/Market/OrderBook
- [ ] getLevel2_20
- [ ] getLevel2_100
- [ ] getLevel2_full
- [ ] getLevel3_full
#### Rest/Market/Histories
- [ ] getMarketHistories
- [ ] getMarketCandles
#### Rest/Market/Currencies
- [ ] getCurrencies
- [ ] getCurrencyDetail
- [ ] getFiatPrice
#### Rest/Margin/MarginInfo
- [ ] getMarkPrice
- [ ] getMarginConfigurationInfo
- [ ] getMarginAccount
#### Rest/Margin/BorrowAndLend
- [ ] postBorrowOrder
- [ ] getBorrowOrder
- [ ] getRepayRecord
- [ ] getRepaymentRecord
- [ ] repayAll
- [ ] repaySingle
- [ ] postLendOrder
- [ ] cancelLendOrder
- [ ] setAutoLend
- [ ] getActiveOrder
- [ ] getLentHistory
- [ ] getActiveLendOrdersList
- [ ] getSettledLendOrderHistory
- [ ] getAccountLendRecord
- [ ] getLendingMarketData
- [ ] getMarginFillsTradeData

#### Rest/Others
- [x] getTimestamp
- [x] getStatus

### Websocket
TODO

## LICENSE

[Apache License](LICENSE)

