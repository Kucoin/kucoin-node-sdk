const API = require('../src');
API.init(require('../demo/config'));
// 引入Jest测试框架
// 使用Jest进行单元测试
describe('API.rest.Others.getTimestamp', () => {
  it('should returns 200 status code', async() => {
    const result = await API.rest.Others.getTimestamp();
  // 断言返回的状态码是否为200
   expect(result.code).toBe('200000');
  });
});