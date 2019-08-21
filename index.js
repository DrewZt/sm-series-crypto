sm2 = require('./lib/sm2');
sm3 = require('./lib/sm3');
// sm4 = require('./lib/sm4')
utils = require('./lib/utils')

//计算sm3
function getsm3(str) {
    if (typeof str == "string"){
        str = utils.hexToBytes(str);
    }
    var b = sm3().sum(str);
    var c = utils.bytesTohex(b)
    return c;
}

//用公钥算地址
function pub2address(str) {
    var a = utils.hexToBytes(str);
    var b = sm3().sum(a);
    var addr = utils.bytesTohex(b).slice(-40);
    return addr;
}

//生成秘钥对和地址
function createkey(){
    var key = sm2.genKeyPair();
    var keypair={};
    keypair.privateKey=key.priToString();
    keypair.publicKey=key.pubToString().slice(-128);
    var address1 = pub2address(keypair.publicKey);
    keypair.address=address1;
    return keypair
}

//用私钥计算公钥和地址
function getAddress(str){
    var keypair2={};
    pvkey=str.replace(/^0x/i,'');
    pbkey=sm2.SM2KeyPair(null,pvkey).getpub();
    keypair2.privateKey=str.replace(/^0x/i,'');
    keypair2.publicKey=pbkey.slice(-128);
    keypair2.address=pub2address(keypair2.publicKey);
    return keypair2
}

//对字符串直接签名
function sm2SignRaw(msg,pri){
    publicKey=null;
    privateKey=pri;
    key1=sm2.SM2KeyPair(publicKey,privateKey);
    result1=key1.signRaw(msg);
    return result1;
}

//验证直接签名结果
function sm2VerifyRaw(msg,pub,result){
    publicKey='04' + pub.slice(-128);
    privateKey=null;
    key2=sm2.SM2KeyPair(publicKey,privateKey);
    result2=key2.verifyRaw(msg,result.r,result.s);
    return result2;
}

//将字符串转换为bytes后签名
function sm2SignHex(msg,pri){
    publicKey=null;
    privateKey=pri;
    key1=sm2.SM2KeyPair(publicKey,privateKey);
    msg2=utils.hexToBytes(msg);
    result1=key1.signRaw(msg2);
    return result1;
}

//验证字符串转换为bytes后的签名
function sm2VerifyHex(msg,pub,result){
    publicKey='04' + pub.slice(-128);
    privateKey=null;
    msg2=utils.hexToBytes(msg);
    key2=sm2.SM2KeyPair(publicKey,privateKey);
    result2=key2.verifyRaw(msg2,result.r,result.s);
    return result2;
}

function sm2SignHash(msg,pri){
    publicKey=null;
    privateKey=pri;
    key1=sm2.SM2KeyPair(publicKey,privateKey);
    // msg2=utils.hexToBytes(msg);
    result1=key1.signDigest(msg);
    return result1;
}

function sm2VerifyHash(msg,pub,result){
    publicKey='04' + pub.slice(-128);
    privateKey=null;
    // msg2=utils.hexToBytes(msg);
    key2=sm2.SM2KeyPair(publicKey,privateKey);
    result2=key2.verifyDigest(msg,result.r,result.s);
    return result2;
}


module.exports = {
    utils,
    pub2address,
    getsm3,
    createkey,
    getAddress,
    sm2SignRaw,
    sm2VerifyRaw,
    sm2SignHex,
    sm2VerifyHex,
    sm2SignHash,
    sm2VerifyHash,
};

