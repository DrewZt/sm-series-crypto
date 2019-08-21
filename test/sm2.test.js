var sm2 = require('../lib/sm2');
utils = require('../lib/utils')
var key = sm2.genKeyPair();
var result = key.encrypt('a', 'hex');

console.warn('pri', key.pri.toString(16, 32));
console.warn('pub x', key.pub.getX().toString(16, 32));
console.warn('pub y', key.pub.getY().toString(16, 32));
console.warn('pub', key.pubToString());
// console.warn('c1', result.slice(0, 128));
// console.warn('c3', result.slice(128, 192));
// console.warn('c2', result.slice(192));

console.warn('dec', key.decrypt(result, 'hex'));

var key2 = sm2.SM2KeyPair(null, key.pri.toString(16, 32))
console.warn('dec 2', key2.decrypt(result, 'hex'));


var key3 = sm2.SM2KeyPair(key.pubToString())
var result3 = key.encrypt('b', 'hex');
console.warn('enc 3', result3);
console.warn('dec 3', key.decrypt(result3, 'hex'));

var key4 = sm2.SM2KeyPair('048a0a981301c519c61c1b6af15742dd758e6af9aef0a6857311d1ffaf702035448c8c079114c5e968ae938a8af3b56e3f162293250948bcf2214f98f3ffb81378')
console.log([...Buffer.from('abcdefgh')])
console.log(utils.strToBytes('abcdefgh'))
console.warn('ver 4', key4.verifyRaw(
    [...Buffer.from('abcdefgh', 'hex')],
    'b405ad77a936a2ceffb622d47a4e769ffa16f231d7f7130126cd655b02746731',
    'bc486fc3f12d3130633cb4c9c55aac8c6d56d9abf4ca91b0f1f2bd2480d292f2'
));
console.warn('ver 4', key4.verifyDigest(
  '1ae6ddd99950030e1f6a0aa9b364a804a2e97c899ad59d8bde923ebf557e5cae',
  'EFFAAD2B1327BD8576E0121B76B562AD920E7641E57E0E6BBEA9400015706F06',
  '24B5333883EBF5EEE1548C455EC4A0E9EBA2A1F83611ED5BFA02C4502D63BA7F'
));

var key5 = sm2.SM2KeyPair('048a0a981301c519c61c1b6af15742dd758e6af9aef0a6857311d1ffaf702035448c8c079114c5e968ae938a8af3b56e3f162293250948bcf2214f98f3ffb81378','ee29d8c34219607a0ef8b35c8c3821bff8341ddd0d1888f580884805e877cf2c')

a= key5.signDigest('1ae6ddd99950030e1f6a0aa9b364a804a2e97c899ad59d8bde923ebf557e5cae')
console.log('a rs',a.r,a.s)

console.warn('ver 5', key4.verifyDigest(
    '1ae6ddd99950030e1f6a0aa9b364a804a2e97c899ad59d8bde923ebf557e5cae',
    a.r,
    a.s
));
