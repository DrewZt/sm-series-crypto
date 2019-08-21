sm2 = require('./lib/sm2');
sm3 = require('./lib/sm3');
// sm4 = require('./lib/sm4')
utils = require('./lib/utils')

function pub2address(str) {
    var a = utils.hexToBytes(str);
    var b = sm3().sum(a);
    var addr = utils.bytesTohex(b).slice(-40);
    return addr;
}

function createkey(){
    var key = sm2.genKeyPair();
    var keypair={};
    keypair.privateKey=key.priToString();
    keypair.publicKey=key.pubToString().slice(-128);
    var address1 = pub2address(keypair.publicKey);
    keypair.address=address1;
    return keypair
}


function getAddress(str){
    var keypair2={};
    pvkey=str.replace(/^0x/i,'');
    pbkey=sm2.SM2KeyPair(null,pvkey).getpub();
    keypair2.privateKey=str.replace(/^0x/i,'');
    keypair2.publicKey=pbkey.slice(-128);
    keypair2.address=pub2address(keypair2.publicKey);
    return keypair2
}


function sm2SignRaw(msg,pri){
    publicKey=null;
    privateKey=pri;
    key1=sm2.SM2KeyPair(publicKey,privateKey);
    result1=key1.signRaw(msg);
    return result1;
}

function sm2VerifyRaw(msg,pub,result){
    publicKey='04' + pub.slice(-128);
    privateKey=null;
    key2=sm2.SM2KeyPair(publicKey,privateKey);
    result2=key2.verifyRaw(msg,result.r,result.s);
    return result2;
}

function sm2SignHex(msg,pri){
    publicKey=null;
    privateKey=pri;
    key1=sm2.SM2KeyPair(publicKey,privateKey);
    msg2=utils.hexToBytes(msg);
    result1=key1.signRaw(msg2);
    return result1;
}

function sm2VerifyHex(msg,pub,result){
    publicKey='04' + pub.slice(-128);
    privateKey=null;
    msg2=utils.hexToBytes(msg);
    key2=sm2.SM2KeyPair(publicKey,privateKey);
    result2=key2.verifyRaw(msg2,result.r,result.s);
    return result2;
}

module.exports = {
    pub2address,
    createkey,
    getAddress,
    sm2SignRaw,
    sm2VerifyRaw,
    sm2SignHex,
    sm2VerifyHex,
};

