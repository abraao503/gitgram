const bcrypt = require('bcryptjs');

async function checkPassword(password, passwordHash){
  return await bcrypt.compare(password, passwordHash);
}

module.exports = checkPassword;
