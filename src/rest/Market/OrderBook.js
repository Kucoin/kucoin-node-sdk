
const Http = require('../../lib/http');

/**
 * @name getLevel2_20
 * @description Get Part Order Book(aggregated) level2_20
 * @param {string} symbol - symbol
 * @return {Object} { code, success, data }
 */
exports.getLevel2_20 = async function getLevel2_20(symbol) {
  /*
  {
    "code": "200000",     
    "data": {
      "sequence": "3262786978",
      "time": 1550653727731,
      "bids": [["6500.12", "0.45054140"],
              ["6500.11", "0.45054140"]],  //[price，size]
      "asks": [["6500.16", "0.57753524"],
              ["6500.15", "0.57753524"]]   
    }
  }
  */
  return await Http().GET('/api/v1/market/orderbook/level2_20', { symbol });
};

/**
 * @name getLevel2_100
 * @description Get Part Order Book(aggregated) level2_100
 * @param {string} symbol - symbol
 * @return {Object} { code, success, data }
 */
exports.getLevel2_100 = async function getLevel2_100(symbol) {
  /*
  {
    "code": "200000",     
    "data": {
      "sequence": "3262786978",
      "time": 1550653727731,
      "bids": [["6500.12", "0.45054140"],
              ["6500.11", "0.45054140"]],  //[price，size]
      "asks": [["6500.16", "0.57753524"],
              ["6500.15", "0.57753524"]]   
    }
  }
  */
  return await Http().GET('/api/v1/market/orderbook/level2_100', { symbol });
};


/**
 * @name getLevel2_full
 * @description Get Full Order Book(aggregated)
 * @param {string} symbol - symbol
 * @return {Object} { code, success, data }
 */
exports.getLevel2_full = async function getLevel2_full(symbol) {
  /*
  {
    "code": "200000",     
    "data": {
      "sequence": "3262786978",
      "time": 1550653727731,
      "bids": [["6500.12", "0.45054140"],
              ["6500.11", "0.45054140"]],  //[price，size]
      "asks": [["6500.16", "0.57753524"],
              ["6500.15", "0.57753524"]]   
    }
  }
  */
  return await Http().GET('/api/v3/market/orderbook/level2', { symbol });
};


/**
 * @deprecated
 * @name getLevel3_full_v1
 * @description Get Full Order Book(atomic)
 * @param {string} symbol - symbol
 * @return {Object} { code, success, data }
 */
// exports.getLevel3_full_v1 = async function getLevel3_full_v1(symbol) {
//   /*
//   {
//     "code": "200000",     
//     "data": {
//         "sequence": "1573503933086",
//         "asks": [
//             [
//                 "5e0d672c1f311300093ac522",   //orderId
//                 "0.1917",                     //price
//                 "390.9275",                   //size
//                 "1577936689346546088"         //time,nanoseconds
//             ],
//             [
//                 "5e0d672891432f000819ecc3",
//                 "0.19171",
//                 "1456.1316",
//                 "1577936685718811031"
//             ]
//         ],
//         "bids": [
//             [
//                 "5e0d672cdc53860007f30262",
//                 "0.19166",
//                 "178.1936",
//                 "1577936689166023452"
//             ],
//             [
//                 "5e0d671a91432f000819d1b0",
//                 "0.19165",
//                 "583.6298",
//                 "1577936671595901518"
//             ]
//         ],
//         "time": 1577936685107
//     }
//   }
//   */
//   return await Http().GET('/api/v1/market/orderbook/level3', { symbol });
// };


/**
 * @name getLevel3_full
 * @description Get Full Order Book(atomic)(revision)
 * @param {string} symbol - symbol
 * @return {Object} { code, success, data }
 */
exports.getLevel3_full = async function getLevel3_full(symbol) {
  /*
  {
    "code": "200000",     
    "data": {
        "sequence": 1573503933086,
        "asks": [
            [
                "5e0d672c1f311300093ac522",   //orderId
                "0.1917",                     //price
                "390.9275",                   //size
                1577936689346546088           //time,nanoseconds
            ],
            [
                "5e0d672891432f000819ecc3",
                "0.19171",
                "1456.1316",
                1577936685718811031
            ]
        ],
        "bids": [
            [
                "5e0d672cdc53860007f30262",
                "0.19166",
                "178.1936",
                1577936689166023452
            ],
            [
                "5e0d671a91432f000819d1b0",
                "0.19165",
                "583.6298",
                1577936671595901518
            ]
        ],
        "time": 1577936689346546088
    }
  }
  */
  return await Http().GET('/api/v2/market/orderbook/level3', { symbol });
};

