'use strict';

var {MessageTxSync} = require('./constants');

const buildMessage = (payload = [], msgID = 0x00) => {
    let m = [
        MessageTxSync,
        payload.length,
        msgID
    ].concat(payload);
    m.push(getChecksum(m));

    return Buffer.from(m);
}
  
const intToLEHexArray = (int, numBytes) => {
    if(typeof(numBytes) === 'undefined' || numBytes === null) {
        numBytes = 1;
    }
    let a = [];
    let b = Buffer.from(decimalToHex(int, numBytes * 2), 'hex');
    let i = b.length - 1;
    while(i >= 0) {
      a.push(b[i]);
      i--;
    }
    return a;
}
    
var decimalToHex = function(d, numDigits) {
    let hex = Number(d).toString(16);
    if(typeof(numDigits) === "undefined" || numDigits === null) {
        numDigits = 2;
    }
    while(hex.length < numDigits) {
        hex = "0" + hex;
    }
    return hex;
}

const getChecksum = (message) => message
    .reduce((cs, msg) => (cs ^ msg), 0);

module.exports = {
    buildMessage,
    intToLEHexArray,
    decimalToHex
}