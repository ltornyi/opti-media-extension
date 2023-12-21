const { scryptSync, randomBytes } = require('crypto');

const generateKey = (size = 32, format = 'base64') => {
  const buffer = randomBytes(size);
  return buffer.toString(format);
}

const generateSecretHash = (key) => {
  const salt = randomBytes(16).toString('hex');
  const buffer = scryptSync(key, salt, 64);
  return `${buffer.toString('hex')}.${salt}`;
}

const key = generateKey();
const secretHash = generateSecretHash(key);
console.log('Use key in client:',key);
console.log('Add to config/apikeys.json:',secretHash);