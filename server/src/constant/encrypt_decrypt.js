const CryptoJS = require('crypto-js');

const encrypt = (data,key) => {
    const cipherText = CryptoJS.AES.encrypt(data, key).toString();
    return cipherText;
}

const decrypt=(cipherText,key)=>{
    try{
        const bytes= CryptoJS.AES.decrypt(cipherText,key);
        const originalText=bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
        
    }
    catch(err){
        throw new Error('Invalid Key Entered')
    }
}
module.exports={encrypt,decrypt};