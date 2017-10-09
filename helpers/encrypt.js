
const crypto = require('crypto')

function encrypt(text,salt){
  const cipher = crypto.createCipher('aes192', salt);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted
}

module.exports = encrypt;
