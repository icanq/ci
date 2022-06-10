const bcrypt = require("bcrypt");

const hash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const compare = (password, hash) => {
  const match = bcrypt.compareSync(password, hash);
  return match;
};

module.exports = {
  hash,
  compare,
};
