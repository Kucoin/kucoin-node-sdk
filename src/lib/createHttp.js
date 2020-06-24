// type Header
const fetch = require('node-fetch');
const _ = require('lodash');
const Middleware = require('./middleware');

const RequestMethods = {
  GET: 'GET',
  POST: 'POST',
  DEL: 'DELETE',
};

class HttpBase {

  // middleware = null;
  // afterMiddleware = null;
  // baseConfig = {};
  constructor(baseConfig) {
    this.baseConfig = baseConfig;
    this.middleware = new Middleware();
    this.afterMiddleware = new Middleware();
  }

  useBefore(middleFn) {
    this.middleware.use(middleFn);
  }

  useAfter(middleFn) {
    this.afterMiddleware.use(middleFn);
  }

  /**
   * resolve fetch data
   *
   * @param   {[type]}  method:         [method: RequestMethods Type]
   * @param   {[type]}  data:           [data: Data]
   *
   * @return  {RequestData}             [return description]
   */
  resolveData(method, data = {}) {
    const d = {};
    _.each(data || {}, (value, key) => {
      if (typeof value !== 'undefined') {
        d[key] = value;
      }
    });

    if(method === RequestMethods.POST) {
      return {
        query: '',
        body: JSON.stringify(d),
      }
    } else {
      return {
        query: Object.keys(d).map(v => `${v}=${d[v]}`).join('&'),
        body: undefined,
      }
    }
  }

  /**
   * Send request
   *
   * @param   {[type]}        method:         [method: description]
   * @param   {[type]}        RequestMethods  [RequestMethods description]
   * @param   {string}        url             [url description]
   * @param   {[type]}        data:          [data?: description]
   *
   * @return  {Promise<any>}                  [return description]
   */
  async makeRequest(method, url, data, headers) {

    const { body, query } = this.resolveData(method, data || {});
    const { baseUrl } = this.baseConfig;
    const [uri, _query = ''] = url.split('?');
    const ctx = {
      url,
      query: _query + (_query ? '&': '') + query ,
      baseUrl,
      body,
      method,
      headers: headers || '',
    };
    // run middleware
    await this.middleware.run(ctx);

    // console.log(ctx.query, ctx.body);
    // const authHeaders: CustomObject<string> = auth(method, url + query, body || '');
    const result = await fetch(ctx.baseUrl + uri + '?' +  ctx.query, {
      body: ctx.body,
      method,
      headers: ctx.headers,
    }).then(res => {
      if(res.json && typeof res.json === 'function'){
        return res.json();
      }else {
        return res;
      }
    })
    .then(async res => {
      await this.afterMiddleware.run(res);
      return res;
    });

    return result;
  }
}

/**
 * create Http Instance
 *
 * @return  {[type]}  [return description]
 */
module.exports = function createHttp(baseConfig) {
  const middlewares = [];
  const afterMiddlewares = [];

  class Http {

    // hook to push middleware
    static useBefore(middle) {
      middlewares.push(middle);
    }
    // hook to push middleware
    static useAfter(middle) {
      afterMiddlewares.push(middle);
    }

    static registerMiddle(httpIns) {
      middlewares.forEach((md) => {
        httpIns.useBefore(md);
      });
      afterMiddlewares.forEach((md) => {
        httpIns.useAfter(md);
      });
    }

    static createRequest(method, url, data, headers) {
      const http = new HttpBase(baseConfig);
      Http.registerMiddle(http);
      return http.makeRequest(method, url, data, headers);
    }

    static POST(url, data, headers) {
      return Http.createRequest(RequestMethods.POST, url, data, headers);
    }

    static GET(url, data, headers) {
      return Http.createRequest(RequestMethods.GET, url, data, headers);
    }

    static DEL(url, data) {
      return Http.createRequest(RequestMethods.DEL, url, data);
    }
  }

  return Http;
}
