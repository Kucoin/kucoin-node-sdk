## [1.1.1] - 2024-11-12

### Added
- **Spot High-Frequency Upgrade**: All users can now use high-frequency interfaces without a whitelist. The system is more stable, and the rate limits are more relaxed.
- **User Type API**: Added `GET /api/v1/hf/accounts/opened` to determine the user type.
- **Fetch Announcements** API: Added `GET /api/v3/announcements` to retrieve news and announcements.

### Modified
- **Get Currency Details API**: `GET /api/v3/currencies/{currency}` now includes additional fields: `withdrawPrecision`, `needTag`, `maxWithdraw`, and `maxDeposit`.
- **Get Currency List API**: `GET /api/v3/currencies` now includes additional fields: `withdrawPrecision`, `needTag`, `maxWithdraw`, and `maxDeposit`.

### Deprecated
- **Get Deposit Address API**: Deprecated `GET /api/v1/deposit-addresses`, replaced by `GET /api/v3/deposit-addresses`.
- **Get Deposit Address API (V2)**: Deprecated `GET /api/v2/deposit-addresses`, replaced by `GET /api/v3/deposit-addresses`.
- **Apply for Deposit Address API**: Deprecated `POST /api/v1/deposit-addresses`, replaced by `POST /api/v3/deposit-address/create`.
- **Apply for Withdrawal API**: Deprecated `POST /api/v1/withdrawals`, replaced by `POST /api/v3/withdrawals`.

## [1.1.0] - 2024-06-15

### Added APIs
- `GET /api/v3/hf/margin/order/active/symbols`
- `GET /api/v3/margin/symbols`
- `POST /api/v3/position/update-user-leverage`
- `GET /api/v1/otc-loan/loan`
- `GET /api/v1/otc-loan/accounts`
- `POST /api/v1/earn/orders`
- `DELETE /api/v1/earn/orders`
- `GET /api/v1/earn/redeem-preview`
- `GET /api/v1/earn/saving/products`
- `GET /api/v1/earn/hold-assets`
- `GET /api/v1/earn/promotion/products`
- `GET /api/v1/earn/kcs-staking/products`
- `GET /api/v1/earn/staking/products`
- `GET /api/v1/earn/eth-staking/products`
- `POST /api/v3/hf/margin/order`
- `POST /api/v3/hf/margin/order/test`
- `DELETE /api/v3/hf/margin/orders/{orderId}`
- `DELETE /api/v3/hf/margin/orders/client-order/{clientOid}`
- `DELETE /api/v3/hf/margin/orders`
- `GET /api/v3/hf/margin/orders/active`
- `GET /api/v3/hf/margin/orders/done`
- `GET /api/v3/hf/margin/orders/{orderId}`
- `GET /api/v3/hf/margin/orders/client-order/{clientOid}`
- `GET /api/v3/hf/margin/fills`

- **TOPIC**: `/margin/isolatedPosition` (Isolated Margin Position Push)

### Modified APIs
- `POST /api/v3/margin/borrow` - Added `isHf` field
- `POST /api/v3/margin/repay` - Added `isHf` field

### Deprecated APIs
- **TOPIC**: `/margin/fundingBook`

## [1.0.9] - 2024-05-30

### Added APIs
#### Universal Transfer API
- **Added**: `POST /api/v3/accounts/universal-transfer`

#### Margin Borrowing APIs
- **Added**: `POST /api/v3/margin/borrow`
- **Added**: `GET /api/v3/margin/borrow`

#### Margin Repayment APIs
- **Added**: `POST /api/v3/margin/repay`
- **Added**: `GET /api/v3/margin/repay`

#### Margin Interest APIs
- **Added**: `GET /api/v3/margin/interest`

#### Project APIs
- **Added**: `GET /api/v3/project/list`
- **Added**: `GET /api/v3/project/marketInterestRate`

#### Purchase APIs
- **Added**: `POST /api/v3/purchase`
- **Added**: `POST /api/v3/redeem`
- **Added**: `POST /api/v3/lend/purchase/update`
- **Added**: `GET /api/v3/redeem/orders`
- **Added**: `GET /api/v3/purchase/orders`

#### Test Order APIs
- **Added**: `POST /api/v1/hf/orders/test`
- **Added**: `POST /api/v1/margin/order/test`
- **Added**: `POST /api/v1/orders/test`

### Deprecated APIs
#### Margin Borrowing APIs
- **Deprecated**: Publish Borrow Order, deprecated `POST /api/v1/margin/borrow`
- **Deprecated**: Query Borrow Orders, deprecated `GET /api/v1/margin/borrow`
- **Deprecated**: Query Repaid Records, deprecated `GET /api/v1/margin/borrow/repaid`
- **Deprecated**: One-Click Repayment, deprecated `POST /api/v1/margin/repay/all`
- **Deprecated**: Single Repayment, deprecated `POST /api/v1/margin/repay/single`

#### Margin Lending APIs
- **Deprecated**: Publish Lend Order, deprecated `POST /api/v1/margin/lend`
- **Deprecated**: Cancel Lend Order, deprecated `DELETE /api/v1/margin/lend/{orderId}`
- **Deprecated**: Set Auto-Lend, deprecated `POST /api/v1/margin/toggle-auto-lend`
- **Deprecated**: Query Active Lend Orders, deprecated `GET /api/v1/margin/lend/active`
- **Deprecated**: Query Historical Lend Orders, deprecated `GET /api/v1/margin/lend/done`
- **Deprecated**: Query Unsettled Lend Records, deprecated `GET /api/v1/margin/lend/trade/unsettled`
- **Deprecated**: Query Settled Lend Records, deprecated `GET /api/v1/margin/lend/trade/settled`
- **Deprecated**: Asset Lend Records, deprecated `GET /api/v1/margin/lend/assets`
- **Deprecated**: Lend Market Information, deprecated `GET /api/v1/margin/market`
- **Deprecated**: Lending Market Transaction Information, deprecated `GET /api/v1/margin/trade/last`

#### Isolated Margin Borrowing APIs
- **Deprecated**: Isolated Borrowing, deprecated `POST /api/v1/isolated/borrow`
- **Deprecated**: One-Click Repayment, deprecated `POST /api/v1/isolated/repay/all`
- **Deprecated**: Single Repayment, deprecated `POST /api/v1/isolated/repay/single`
- **Deprecated**: Query Repaid Records, deprecated `GET /api/v1/isolated/borrow/repaid`
- **Deprecated**: Query Outstanding Isolated Borrow Records, deprecated `GET /api/v1/isolated/borrow/outstanding`
- **Deprecated**: Query Outstanding Borrow Records, deprecated `GET /api/v1/margin/borrow/outstanding`

## [1.0.8] - 2024-04-15
### Added
- Added `getCurrencyDetail_V3` Request via this endpoint to get the currency details of a specified currency.

## [1.0.7] - 2024-01-29
### Added
- Added `placeOrder` API endpoint for placing a new order.
- Added `cancelOrder` API endpoint for cancelling an order by orderId.
- Added `cancelOrderByClientOid` API endpoint for cancelling an order by clientOid.
- Added `cancelAllOrders` API endpoint for cancelling all orders.
- Added `getOrder` API endpoint for getting an order by orderId.
- Added `getOrderByClientOid` API endpoint for getting an order by clientOid.
- Added `getOrders` API endpoint for getting all orders.
- Added `getOrderDetails` API endpoint for getting order details by orderId.
- Added `cancelAllHfOrders` Cancel all high-frequency orders
- Added `getMarginCurrencies` Get margin currencies
- Added `getEtfInfo` Get ETF information
## [1.0.5-beta](https://github.com/Kucoin/kucoin-node-sdk/compare/v1.0.4...v1.0.5-beta) (2023-06-25)


### Features

* changelog update ([26c7b58](https://github.com/Kucoin/kucoin-node-sdk/commit/26c7b5868d010145e6772adeb93318db0f9ca421))
* readme update ([beec87d](https://github.com/Kucoin/kucoin-node-sdk/commit/beec87d2e941ed23cec99968fc223f186f236198))
* readme update ([48eed92](https://github.com/Kucoin/kucoin-node-sdk/commit/48eed9266f85d078290de26371e7aa1c6af33851))
* readme update ([a63be9c](https://github.com/Kucoin/kucoin-node-sdk/commit/a63be9c9283b927afcd1aec404a5179851a75f5b))
* readme update ([c9832f6](https://github.com/Kucoin/kucoin-node-sdk/commit/c9832f6764d8987e77ae9e8a5d7039f299c404ff))
* update api sdk done ([c89f572](https://github.com/Kucoin/kucoin-node-sdk/commit/c89f572f92455185cfb9c441ed6bd025c2462e08))
* update demo ([58f3f7b](https://github.com/Kucoin/kucoin-node-sdk/commit/58f3f7b945ac63046cff97b28cc752e6b88e61e2))
* update updateTime ([428aba7](https://github.com/Kucoin/kucoin-node-sdk/commit/428aba71ed84e7dd6f3af911978772e3c07511e6))
* update updateTime ([957234d](https://github.com/Kucoin/kucoin-node-sdk/commit/957234d8c26b09faee3a374f4b611b23dde5273c))
* update updateTime ([e0feb20](https://github.com/Kucoin/kucoin-node-sdk/commit/e0feb20577123be35fdd0835b684ca21e233ad84))
* update updateTime ([3cab49b](https://github.com/Kucoin/kucoin-node-sdk/commit/3cab49b4b122e82c6cefaf8a207a0b1851cdb23a))



## [1.0.5-beta](https://github.com/Kucoin/kucoin-node-sdk/compare/v1.0.4...v1.0.5-beta) (2023-05-31)


### Features

* changelog update ([26c7b58](https://github.com/Kucoin/kucoin-node-sdk/commit/26c7b5868d010145e6772adeb93318db0f9ca421))
* readme update ([beec87d](https://github.com/Kucoin/kucoin-node-sdk/commit/beec87d2e941ed23cec99968fc223f186f236198))
* readme update ([48eed92](https://github.com/Kucoin/kucoin-node-sdk/commit/48eed9266f85d078290de26371e7aa1c6af33851))
* readme update ([a63be9c](https://github.com/Kucoin/kucoin-node-sdk/commit/a63be9c9283b927afcd1aec404a5179851a75f5b))
* readme update ([c9832f6](https://github.com/Kucoin/kucoin-node-sdk/commit/c9832f6764d8987e77ae9e8a5d7039f299c404ff))
* update api sdk done ([c89f572](https://github.com/Kucoin/kucoin-node-sdk/commit/c89f572f92455185cfb9c441ed6bd025c2462e08))
* update updateTime ([428aba7](https://github.com/Kucoin/kucoin-node-sdk/commit/428aba71ed84e7dd6f3af911978772e3c07511e6))
* update updateTime ([957234d](https://github.com/Kucoin/kucoin-node-sdk/commit/957234d8c26b09faee3a374f4b611b23dde5273c))
* update updateTime ([e0feb20](https://github.com/Kucoin/kucoin-node-sdk/commit/e0feb20577123be35fdd0835b684ca21e233ad84))
* update updateTime ([3cab49b](https://github.com/Kucoin/kucoin-node-sdk/commit/3cab49b4b122e82c6cefaf8a207a0b1851cdb23a))



## [1.0.5-beta](https://github.com/Kucoin/kucoin-node-sdk/compare/v1.0.4...v1.0.5-beta) (2023-05-25)


### Features

* changelog update ([26c7b58](https://github.com/Kucoin/kucoin-node-sdk/commit/26c7b5868d010145e6772adeb93318db0f9ca421))
* readme update ([beec87d](https://github.com/Kucoin/kucoin-node-sdk/commit/beec87d2e941ed23cec99968fc223f186f236198))
* readme update ([48eed92](https://github.com/Kucoin/kucoin-node-sdk/commit/48eed9266f85d078290de26371e7aa1c6af33851))
* readme update ([a63be9c](https://github.com/Kucoin/kucoin-node-sdk/commit/a63be9c9283b927afcd1aec404a5179851a75f5b))
* readme update ([c9832f6](https://github.com/Kucoin/kucoin-node-sdk/commit/c9832f6764d8987e77ae9e8a5d7039f299c404ff))
* update api sdk done ([c89f572](https://github.com/Kucoin/kucoin-node-sdk/commit/c89f572f92455185cfb9c441ed6bd025c2462e08))
* update updateTime ([3cab49b](https://github.com/Kucoin/kucoin-node-sdk/commit/3cab49b4b122e82c6cefaf8a207a0b1851cdb23a))



## [1.0.5-beta](https://github.com/Kucoin/kucoin-node-sdk/compare/v1.0.4...v1.0.5-beta) (2023-05-25)


### Features

* readme update ([beec87d](https://github.com/Kucoin/kucoin-node-sdk/commit/beec87d2e941ed23cec99968fc223f186f236198))
* readme update ([48eed92](https://github.com/Kucoin/kucoin-node-sdk/commit/48eed9266f85d078290de26371e7aa1c6af33851))
* readme update ([a63be9c](https://github.com/Kucoin/kucoin-node-sdk/commit/a63be9c9283b927afcd1aec404a5179851a75f5b))
* readme update ([c9832f6](https://github.com/Kucoin/kucoin-node-sdk/commit/c9832f6764d8987e77ae9e8a5d7039f299c404ff))
* update api sdk done ([c89f572](https://github.com/Kucoin/kucoin-node-sdk/commit/c89f572f92455185cfb9c441ed6bd025c2462e08))



