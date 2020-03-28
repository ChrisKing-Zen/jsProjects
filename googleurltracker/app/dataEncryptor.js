const crypto = require('crypto');
const { performance } = require('perf_hooks');

const algorithm = 'aes-192-cbc';
const password = 'sG2Nbz.ujC.83XFAy@AP!GpTt_qkPzefmAU@RC.vfB9B-v98dP';
const iv = '.!hQxMkNiAfsDjF4';
exports.perfCheck = (t0, t1, fname) => {
  console.log(`Total time to process ${fname} is ${t1 - t0}ms`);
};
exports.encrypt = (url) => {
  const t0 = performance.now();
  if (url.includes('http')) {
    const key = crypto.scryptSync(password, 'salt', 24);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(`${url}`, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const t1 = performance.now();
    this.perfCheck(t0, t1, 'encrypt');
    return encrypted;
  }
  return 'DNE';
};

exports.decrypt = (hex) => {
  const t0 = performance.now();
  if (hex === 'DNE') {
    return 'No URL';
  }
  // Use the async `crypto.scrypt()` instead.
  const key = crypto.scryptSync(password, 'salt', 24);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(`${hex}`, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  const t1 = performance.now();
  this.perfCheck(t0, t1, 'decrypt');
  return decrypted;
  // return uHex;
  // Prints: e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa
};
