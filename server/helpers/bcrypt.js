const bcrypt = require('bcrypt');

module.exports = {
  hash: (password) => {
    return bcrypt.hashSync(password, 8);
  },
  comparePassword: (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
  },
};
