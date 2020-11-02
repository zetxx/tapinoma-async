const d = require('./index');

const justPrint = (device, data) => console.log(data, device);

d({
    log: {level: 'error'},
    remote: {
        devices: [
            // 'cadence',
            'heart rate'
        ]
    },
    pipeOut: justPrint
});


// const decimalToHex1 = (d, numDigits) => {
//     let hex = Number(d).toString(16);
//     if(typeof(numDigits) === 'undefined' || numDigits === null) {
//         numDigits = 2;
//     }
//     const totalLen = numDigits + (hex.length / 2);
//     return Array.from({length: totalLen})
//         .fill('0')
//         .concat(hex)
//         .join('')
//         .slice(totalLen * -1);
// }

// var decimalToHex2 = function(d, numDigits) {
//     let hex = Number(d).toString(16);
//     if(typeof(numDigits) === "undefined" || numDigits === null) {
//         numDigits = 2;
//     }
//     while(hex.length < numDigits) {
//         hex = "0" + hex;
//     }
//     return hex;
// }

// console.log(decimalToHex1(8070, 2))
// console.log(decimalToHex2(8070, 2))