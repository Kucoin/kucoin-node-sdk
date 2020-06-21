const createHttp = require('./createHttp');
const { getConfig } = require('./config');
const utils = require('./utils');

function auth(ApiKey, method, url, data) {
  const timestamp = Date.now();
  const signature = utils.sign(timestamp + method.toUpperCase() + url + data, ApiKey.secret);

  return {
    'KC-API-KEY': ApiKey.key,
    'KC-API-SIGN': signature,
    'KC-API-TIMESTAMP': timestamp.toString(),
    'KC-API-PASSPHRASE': ApiKey.passphrase || '',
    'Content-Type': 'application/json',
  };
}

let httpInstance = null;
const constructHttp = () => {

  /** Gen Http Instance */
  if (!httpInstance) {
    const { baseUrl } = getConfig();
    let _baseUrl = baseUrl;
    if (!_baseUrl) {
      _baseUrl = process.env.PRODUCTION === 'prod'
        ? 'https://api.kucoin.io'
        : 'https://openapi-sandbox.kucoin.io';
    }
    
    const Http = createHttp({
      baseUrl: _baseUrl,
    });
    
    // insert auth hook
    Http.useBefore(async (ctx, next) => {
      // console.log('ctx.body', typeof ctx.body);
      const { apiAuth } = getConfig();
      const authHeaders = auth(
        apiAuth,
        ctx.method,
        ctx.url + (!ctx.query ? '' : ((/\?/g.test(ctx.url) ? '&' : '?') + (ctx.query || ''))),
        ctx.body || ''
      );
      ctx.headers = {
        ...ctx.headers,
        ...authHeaders,
      };
      next(ctx);
    });
    httpInstance = Http;
  }

  return httpInstance;
};

module.exports = constructHttp;
