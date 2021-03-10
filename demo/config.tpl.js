/**
 * copy to config.js, and write configure
 */
module.exports = {
  /** set API baseUrl, */
  /**   if not set this key, or empty, or false, or undefined, */
  /**   default baseUrl will be set by `process.env.PRODUCTION` */
  /**   if process.env.PRODUCTION === 'prod', the default value will be https://api.kucoin.io */
  /**   else use sandbox as https://openapi-sandbox.kucoin.io */
  baseUrl: 'https://openapi-sandbox.kucoin.cc',
  /** Auth infos */
  /**   key is API key */
  /**   secret is API secret */
  /**   passphrase as API passphrase */
  apiAuth: {
    key: '',
    secret: '',
    passphrase: ''
  },
  authVersion: 2
}
