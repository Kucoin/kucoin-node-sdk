const _ = require('lodash');
const CryptoJS = require('crypto');
const path =  require('path');
const fs = require('fs');
const uuid =  require('uuid');
const { getConfig } = require('./config');
const { version } =  require('../../package.json');

function sign(text, secret, outputType = 'base64') {
  return CryptoJS
    .createHmac('sha256', secret)
    .update(text)
    .digest(outputType);
}

function auth(ApiKey, method, url, data) {
  const { authVersion } = getConfig();
  const timestamp = Date.now();
  const signature = sign(timestamp + method.toUpperCase() + url + data, ApiKey.secret);
  const returnData = {
    'KC-API-KEY': ApiKey.key,
    'KC-API-SIGN': signature,
    'KC-API-TIMESTAMP': timestamp.toString(),
    'KC-API-PASSPHRASE': ApiKey.passphrase || '',
    'Content-Type': 'application/json',
    'User-Agent': `KuCoin-Node-SDK/${version}`,
  };
  if (authVersion && (authVersion === 2 || authVersion === '2')) { // for v2 API-KEY
    returnData['KC-API-KEY-VERSION'] = 2;
    returnData['KC-API-PASSPHRASE'] = sign(ApiKey.passphrase || '', ApiKey.secret);
  }
  return returnData;
}

async function readFile(filePath) {
  const fileAbsolutePath = path.join(__dirname, filePath);
  // console.log(fileAbsolutePath);
  const readStream = fs.createReadStream(fileAbsolutePath);
  let chunk = "";
  return new Promise((resolve) => {
    readStream.on('data', data => {
      chunk += data;
    });
    readStream.on('end', () => {
      resolve(chunk);
    });
    readStream.on('error', (err) => {
      resolve(err.message);
    });
  });
}

async function writeFile(filePath, content) {
  const fileAbsolutePath = path.join(__dirname, filePath);
  const writeStream = fs.createWriteStream(fileAbsolutePath);


  return new Promise(resolve => {
    writeStream.write(content);
    writeStream.on('end', () => {
      resolve("");
    });
    writeStream.on('error', (err) => {
      resolve(err.message);
    });
  });
}

function genClientOid() {
  return uuid.v4();
}

function strTo2String(str) {
  var result = [];
  var list = str.split("");
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var binaryStr = item.charCodeAt(0).toString(8);
    result.push(binaryStr);
  }
  return result.join("");
}

function checkL2BufferContinue(arrBuffer = [], lastSeq) {
  if (arrBuffer.length) {
    if (arrBuffer[0].sequenceStart !== lastSeq +1) {
      return false;
    }
    
    for (let i = 0; i < arrBuffer.length; i++) {
      if (arrBuffer[i + 1] && arrBuffer[i + 1].sequenceStart !== arrBuffer[i].sequenceEnd + 1) {
        return false;
      }
    }
  }
  return true;
}

// ----> for level2
function mapArr(arr = [], parseKey = (str) => str) {
  const res = {};
  for (let i = 0; i< arr.length; i++) {
    const item = arr[i];
    res[parseKey(item[0])] = item[1];
  }
  return res;
}

// ----> for level2
function arrMap(map = {}, order = 'asc') {
  const res = [];
  _.each(map, (value, key) => {
    res.push([key, value]);
  });
  res.sort((a, b) => {
    if (order === 'desc') {
      return (+b[0]) - (+a[0]);
    } else {
      return (a[0]) - (b[0]);
    }
  });
  return res;
}

// ----> for level3
function mapl3Arr(arr = []) {
  const res = {};
  for (let i = 0; i< arr.length; i++) {
    const item = arr[i];
    res[item[1]] = item; // orderId
  }
  return res;
}

// ----> for level3
function arrl3Map(map = {}, side, order = 'asc', merge = 1) {
  const res = [];
  _.each(map, (item) => {
    // [下单时间, 订单号, 价格, 数量, 进入买卖盘时间]
    const [orderTime, orderId, price, size, ts] = item;
    res.push([price, size, ts, orderId]);
  });
  res.sort((a, b) => {
    if (a[0] === b[0]) {
      // 价格相同的订单以进入买卖盘的时间从低到高排序
      return a[2] - b[2];
    } else {
      // 价格排序
      if (order === 'desc') {
        return b[0] - a[0];
      } else {
        return a[0] - b[0];
      }
    }
  });
  return res;
}

module.exports = {
  sign,
  auth,
  readFile,
  writeFile,
  genClientOid,
  strTo2String,
  checkL2BufferContinue,
  mapArr,
  arrMap,
  mapl3Arr,
  arrl3Map,
};
