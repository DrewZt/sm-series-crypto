SM2=require('./index')

a=SM2.createkey()
console.log(a)

b='ee29d8c34219607a0ef8b35c8c3821bff8341ddd0d1888f580884805e877cf2c'
c=SM2.getAddress(b)
console.log(c)
msg='abcdef'
pri=c.privateKey
pub=c.publicKey
msg2=utils.hexToBytes(msg)
key1=SM2.getsm3(msg)
key2=SM2.getsm3(msg2)
console.log(key1,key2)
key3=SM2.sm2SignRaw(msg,pri)
// console.log(key3)
console.log(SM2.sm2VerifyRaw(msg,pub,key3))


key4=SM2.sm2SignHex(msg,pri)
// console.log(key4)
console.log(SM2.sm2VerifyHex(msg,pub,key4))

key5=SM2.sm2SignHash(key2,pri)
console.log(SM2.sm2VerifyHash(key2,pub,key5))