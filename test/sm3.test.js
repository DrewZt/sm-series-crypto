var sm3 = require('../lib/sm3');
var utils = require('../lib/utils')
var sm2 = require('../lib/sm2');
var key = sm2.genKeyPair();
console.warn('pub-pri', key.priToString(),key.pubToString());
// var d1 = new sm3().sum([0x31])
// var d2 = new sm3().sum(new Uint8Array(Buffer.from([0x31])))
// var d3 = new sm3().sum(new Uint8Array(Buffer.from('31', 'hex')))
//
// console.log('d1', Buffer.from(d1).toString('hex'))
// console.log('d2', Buffer.from(d2).toString('hex'))
// console.log('d3', Buffer.from(d3).toString('hex'))


pubkey=key.pubToString().slice(-128)
a=utils.hexToBytes(pubkey)
var d4 = new sm3().sum(a)
b=utils.bytesTohex(d4)
console.log(b.slice(-40))
// console.log('d4', Buffer.from(d4).toString('hex'))


// // X
// var d5 = new sm3().sum(new Uint8Array(Buffer.from(
//   '3131', 'hex')))
// console.log('d5', Buffer.from(d5).toString('hex'))
// // X
// var num7 = new Uint8Array(2)
// num7[0] = 0x31
// num7[1] = 0x31
// var d7 = new sm3().sum(num7)
// console.log('d7', Buffer.from(d7).toString('hex'))
// // Y
// var d6 = new sm3().sum([0x31, 0x31])
// console.log('d6', Buffer.from(d6).toString('hex'))
// // Y
// var num8 = []
// num8[0] = 0x31
// num8[1] = 0x31
// var d8 = new sm3().sum(num8)
// console.log('d8', Buffer.from(d8).toString('hex'))
// // Y
// var d9 = new sm3().sum([...Buffer.from('3131', 'hex')])
// console.log('d9', Buffer.from(d9).toString('hex'))