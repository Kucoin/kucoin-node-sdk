const CryptoJS = require('crypto');
const path =  require('path');
const fs = require('fs');
const uuid =  require('uuid');

exports.sign = function sign(text, secret, outputType = 'base64') {
  return CryptoJS
    .createHmac('sha256', secret)
    .update(text)
    .digest(outputType);
}

// kucoin auth
exports.auth =  function auth(ApiKey, method, url, data) {
  const timestamp = Date.now();
  const signature = sign(timestamp + method.toUpperCase() + url + data, ApiKey.secret);

  return {
    'KC-API-KEY': ApiKey.key,
    'KC-API-SIGN': signature,
    'KC-API-TIMESTAMP': timestamp.toString(),
    'KC-API-PASSPHRASE': ApiKey.passphrase || '',
    'Content-Type': 'application/json',
  };
}


exports.readFile = async function readFile(filePath) {
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

exports.writeFile = async function writeFile(filePath, content) {
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


exports.genClientOid = function genClientOid() {
  return uuid.v4();
}

exports.strTo2String = function strTo2String(str) {
  var result = [];
  var list = str.split("");
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var binaryStr = item.charCodeAt(0).toString(8);
    result.push(binaryStr);
  }
  return result.join("");
}
