const jwt = require('jwt-simple');
const moment = require('moment');

const createToken = (user) => {
  const payload = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix
  };

  return jwt.encode(payload, process.env.JWT_SECRET_KEY);
};

module.exports = { createToken };
