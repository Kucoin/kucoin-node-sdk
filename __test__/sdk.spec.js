const API = require('../src');
API.init(require('../demo/config'));
// 引入Jest测试框架
// 使用Jest进行单元测试
describe('API.rest.Others', () => {
  it('should returns 200000 status code', async() => {
    const result = await API.rest.Others.getTimestamp();
  // 断言返回的状态码是否为200
   expect(result.code).toBe('200000');
  });
});
describe('API.rest.User', () => {
  it('getDepositAddressV2 should returns 200000 status code', async() => {
    const result = await API.rest.User.Deposit.getDepositAddressV2('BTC');
    expect(result.code).toBe('200000');
  });
  it('getPaginatedSubUsers should returns 200000 status code', async() => {
    const result = await API.rest.User.UserInfo.getPaginatedSubUsers({currentPage:1,pageSize:10});
    expect(result.code).toBe('200000');
  });
  it('getAccountSummaryInfo should returns 200000 status code', async() => {
    const result = await API.rest.User.Account.getAccountSummaryInfo()
    expect(result.code).toBe('200000');
  });
  it('createSubAccount should returns 200000 status code', async() => {
    const result = await API.rest.User.Account.createSubAccount({password:'Gwd19911023',remarks:'remarks',subName:'AAAAAAAAAA0008',access:'Futures'})
    expect(result.code).toBe('200000');
  });
  it('getSubAccountSpotApiList should returns 200000 status code', async() => {
    const result = await API.rest.User.Account.getSubAccountSpotApiList({apiKey:'6476a9a457f5170001f13726',subName:'AAAAAAAAAA0008'})
    expect(result.code).toBe('200000');
  });
  it('createSpotAPIsForSubAccount should not returns null status code', async() => {
    const result = await API.rest.User.Account.createSpotAPIsForSubAccount({subName:'AAAAAAAAAA0007',passphrase:'12345678',remark:'remarks',permission:'General',ipWhitelist:'127.0.0.1',expire:'30'});
    expect(result.code).not.toBe(null);
  });
  it('updateSubAccountSpotApis should not returns null status code', async() => {
    const result = await API.rest.User.Account.updateSubAccountSpotApis({subName:'AAAAAAAAAA0007',apiKey:"6476a9a457f5170001f13726",passphrase:'12345678',permission:'Trade',ipWhitelist:'127.0.0.1',expire:'90'})
    expect(result.code).not.toBe(null);
  });
  it('deleteSubAccountSpotApis should not returns null status code', async() => {
    const result = await API.rest.User.Account.deleteSubAccountSpotApis({apiKey:"6476a9a457f5170001f13726",passphrase:"12345678",subName:"AAAAAAAAAA0007"})
    expect(result.code).not.toBe(null);
  });
  it('getPaginatedSubAccountInformation should returns 200000 status code', async() => {
    const result = await API.rest.User.Account.getPaginatedSubAccountInformation({currentPage:1,pageSize:10});
    expect(result.code).toBe('200000');
  });
  it('transferToHFAccount should returns 200000 status code', async() => {
    const result = await API.rest.User.Account.transferToHFAccount({clientOid:"178511867",type:"MARGIN",currency:"BTC",from:"main",to:"trade",amount:'5'});
    expect(result.code).not.toBe(null);
  });
  /////高频////////////
  it('innerTransfer should not returns null status code', async() => {
    const result = await API.rest.User.Account.innerTransfer("17851186789",'BTC','main','trade','4');
    expect(result.code).not.toBe(null);
  });
  it('getAccountsList should returns 200000 status code', async() => {
    const result = await API.rest.User.Account.getAccountsList({type:'pool',currency:"USDT"});
    expect(result.code).toBe('200000');
  });
  it('getAccountInformation should not returns null status code', async() => {
    const result = await API.rest.User.Account.getAccountInformation('5bd6e9286d99522a52e458de');
    expect(result.code).not.toBe(null);
  });
  it('getTransferable should returns 200000 status code', async() => {
    const result = await API.rest.User.Account.getTransferable('TRADE_HF','USDT');
    expect(result.code).toBe('200000');
  });
  it('getHighFrequencyAccountLedger should not returns null status code', async() => {
    const result = await API.rest.User.Account.getHighFrequencyAccountLedger({
      currency:"USDT",
      direction:"in",
      bizType:'TRADE_EXCHANGE',
      lastId:123,
      limit:200,
      startAt:1685460570499,
      endAt:1685460597110
    });
    expect(result.code).not.toBe(null);
  });
});

describe('API.rest.Trade', () => {
  it('getSingleStopOrderInfo should returns 200000 status code', async() => {
    const result = await API.rest.Trade.StopOrder.getSingleStopOrderInfo({orderId:"5c35c02703aa673ceec2a168"});
    expect(result.code).toBe('200000');
  });
  it('cancelStopOrder should not returns null status code', async() => {
    const result = await API.rest.Trade.StopOrder.cancelStopOrder({orderId:"5c35c02703aa673ceec2a168"});
    expect(result.code).not.toBe(null);
  });
  ////高频///////////////
  it('getHfTransactionRecords should returns 200000 status code', async() => {
    const result = await API.rest.Trade.Fills.getHfTransactionRecords({
      orderId:'5bd6e9286d99522a52e458de',
      symbol:"BTC-USDT",
      side:"buy",
      type:'limit',
      startAt:1601395200000,
      endAt:1901395200000,
      lastId:123456,
      limit:10
    })
    expect(result.code).toBe('200000');
  });
  it('placeHfOrder should not returns null status code', async() => {
    const result = await API.rest.Trade.Orders.placeHfOrder({
      clientOid:'123456',
      symbol:"ETH-BTC",
      type:'limit',
      side:"buy",
      stp:"DC",
      tags:"tags",
      remark:"remark"
    })
    expect(result.code).not.toBe(null);
  });
  it('syncPlaceHfOrder should not returns null status code', async() => {
    const result = await API.rest.Trade.Orders.syncPlaceHfOrder({
      clientOid:'123456',
      symbol:"ETH-BTC",
      type:'limit',
      side:"buy",
      stp:"DC",
      tags:"tags",
      remark:"remark"
    })
    expect(result.code).not.toBe(null);
  });
  it('placeMultipleHfOrders should returns 200000 status code', async() => {
    const result = await API.rest.Trade.Orders.placeMultipleHfOrders({
      clientOid:"123456",
      symbol:"BTC-USDT",
      type:"market",
      timeInForce:"GTC",
      stp:"CN",
      side:"sell",
      price:"50",
      size:"20",
      cancelAfter:20,
      postOnly:true,
      hidden:true,
      iceberg:true,
      visibleSize:"20",
      tags:"tags",
      remark:"remark"
    })
    expect(result.code).toBe('200000');
  });
  it('syncPlaceMultipleHfOrders should returns 200000 status code', async() => {
    const result = await API.rest.Trade.Orders.syncPlaceMultipleHfOrders({
      clientOid:"123456",
      symbol:"BTC-USDT",
      type:"market",
      timeInForce:"GTC",
      stp:"CN",
      side:"sell",
      price:"50",
      size:"20",
      cancelAfter:20,
      postOnly:true,
      hidden:true,
      iceberg:true,
      visibleSize:"20",
      tags:"tags",
      remark:"remark"
    })
    expect(result.code).toBe('200000');
  });
  it('modifyOrder should not returns null status code', async() => {
    const result = await API.rest.Trade.Orders.modifyOrder({
      symbol:"ETH-BTC",
      clientOid:"clientOid",
      orderId:"5bd6e9286d99522a52e458de",
      newPrice:"1",
      newSize:"2"
    })
    expect(result.code).not.toBe(null);
  });
  it('cancelOrdersByOrderId should not returns null status code', async() => {
    const result = await API.rest.Trade.Orders.cancelOrdersByOrderId({
      orderId:"5bd6e9286d99522a52e458de",
      symbol:"BTC-USDT",
    })
    expect(result.code).not.toBe(null);
  });
  it('syncCancelOrdersByOrderId should not returns null status code', async() => {
    const result = await API.rest.Trade.Orders.syncCancelOrdersByOrderId({
      orderId:"5bd6e9286d99522a52e458de",
      symbol:"BTC-USDT",
    })
    expect(result.code).not.toBe(null);
  });
  it('cancelOrderByClientOid should not returns null status code', async() => {
    const result = await API.rest.Trade.Orders.cancelOrderByClientOid({
      clientOid:"6d539dc614db3",
      symbol:"BTC-USDT",
    })
    expect(result.code).not.toBe(null);
  });
  it('syncCancelOrdersByClientOid should not returns null status code', async() => {
    const result = await API.rest.Trade.Orders.syncCancelOrdersByClientOid({
      clientOid:"6d539dc614db3",
      symbol:"BTC-USDT",
    })
    expect(result.code).not.toBe(null);
  });
  it('cancelSpecifiedNumberOfOrdersByOrderId should not returns null status code', async() => {
    const result = await API.rest.Trade.Orders.cancelSpecifiedNumberOfOrdersByOrderId({
      orderId:"5bd6e9286d99522a52e458de",
      symbol:"BTC-USDT",
      cancelSize:"10.01"
    })
    expect(result.code).not.toBe(null);
  });
  it('cancelAllHfOrdersBySymbol should not returns null status code', async() => {
    const result = await API.rest.Trade.Orders.cancelAllHfOrdersBySymbol({
      symbol:"BTC-USDT",
    })
    expect(result.code).not.toBe(null);
  });
  it('obtainListOfActiveHfOrders should not returns null status code', async() => {
    const result = await API.rest.Trade.Orders.obtainListOfActiveHfOrders({
      symbol:"BTC-USDT",
    })
    expect(result.code).not.toBe(null);
  });
  it('obtainListOfSymbolWithActiveHfOrders should not returns null status code', async() => {
    const result = await API.rest.Trade.Orders.obtainListOfSymbolWithActiveHfOrders()
    expect(result.code).not.toBe(null);
  });
  it('obtainListOfFilledHfOrders should returns 200000 status code', async() => {
    const result = await API.rest.Trade.Orders.obtainListOfFilledHfOrders({
      symbol:"BTC-USDT",
      side:"buy",
      type:"market",
      startAt:1601395200000,
      endAt:1901395200000,
      lastId:123,
      limit:20
    })
    expect(result.code).toBe('200000');
  });
  it('detailsOfAsingleHfOrder should not returns null status code', async() => {
    const result = await API.rest.Trade.Orders.detailsOfAsingleHfOrder({
      orderId:"5c35c02703aa673ceec2a168",
      symbol:"BTC-USDT",
    })
    expect(result.code).not.toBe(null);
  });
  it('obtainDetailsOfASingleHfOrder should not returns null status code', async() => {
    const result = await API.rest.Trade.Orders.obtainDetailsOfASingleHfOrder({
      clientOid:"6d539dc614db312",
      symbol:"BTC-USDT",
    })
    expect(result.code).not.toBe(null);
  });
  it('hfAutoCancelSetting should not returns null status code', async() => {
    const result = await API.rest.Trade.Orders.hfAutoCancelSetting({
      timeout:3000,
      symbols:"BTC-USDT",
    })
    expect(result.code).not.toBe(null);
  });
  it('queryHfAutoCancelOrderSetting should returns 200000 status code', async() => {
    const result = await API.rest.Trade.Orders.queryHfAutoCancelOrderSetting()
    expect(result.code).toBe('200000');
  });

})
describe('API.rest.Market', () => {
  it('getSymbolsList should returns 200000 status code', async() => {
    const result = await API.rest.Market.Symbols.getSymbolsList({market:"market"});
    expect(result.code).toBe('200000');
  });
  it('getCurrencyDetail should returns 200000 status code', async() => {
    const result = await API.rest.Market.Currencies.getCurrencyDetail({currency:"BTC",chain:"chain"});
    expect(result.code).toBe('200000');
  });
  it('queryIsolatedMarginTradingPairConfiguration should returns 200000 status code', async() => {
    const result = await API.rest.Margin.Isolated.queryIsolatedMarginTradingPairConfiguration();
    expect(result.code).toBe('200000');
  });
  it('queryIsolatedMarginAccountInfo should not returns null status code', async() => {
    const result = await API.rest.Margin.Isolated.queryIsolatedMarginAccountInfo({balanceCurrency:"USDT"})
    expect(result.code).not.toBe(null);
  });
  it('querySingleIsolatedMarginAccountInfo should not returns null status code', async() => {
    const result = await API.rest.Margin.Isolated.querySingleIsolatedMarginAccountInfo({symbol:"BTC-USDT"});
    expect(result.code).not.toBe(null);
  });
  it('isolatedMarginBorrowing should not returns null status code', async() => {
    const result = await API.rest.Margin.Isolated.isolatedMarginBorrowing({symbol:"BTC-USDT",currency:'USDT',size:"10",borrowStrategy:"FOK",maxRate:"",period:""});
    expect(result.code).not.toBe(null);
  });
  it('queryOutstandingRepaymentRecords should returns 200000 status code', async() => {
    const result = await API.rest.Margin.Isolated.queryOutstandingRepaymentRecords({symbol:"BTC-USDT",currency:'USDT',pageSize:10,currentPage:1});
    expect(result.code).toBe('200000');
  });
  it('queryRepaymentRecords should returns 200000 status code', async() => {
    const result = await API.rest.Margin.Isolated.queryRepaymentRecords({symbol:"BTC-USDT",currency:'USDT',pageSize:10,currentPage:1});
    expect(result.code).toBe('200000');
  });
  it('quickRepayment should not returns null status code', async() => {
    const result = await API.rest.Margin.Isolated.quickRepayment({symbol:"BTC-USDT",currency:'USDT',size:"10",seqStrategy:"HIGHEST_RATE_FIRST"});
    expect(result.code).not.toBe(null);
  });
  it('singleRepayment should not returns null status code', async() => {
    const result = await API.rest.Margin.Isolated.singleRepayment({symbol:"BTC-USDT",currency:'USDT',size:"10",loanId:"loanId123456789123456789"});
    expect(result.code).not.toBe(null);
  });
})