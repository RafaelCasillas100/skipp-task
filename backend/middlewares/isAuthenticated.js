const jwt = require('jwt-simple');
const moment = require('moment');

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(403).send({ message: 'There is no authorization token, please sign up again!' });

  try {
    const payload = jwt.decode(token, process.env.JWT_SECRET_KEY);
    if (payload.exp <= moment().unix())
      return res.status(401).send({ message: 'Your token has expired, please sign up again!' });

    req.user = payload;
    next();

  } catch (error) {
    return res.status(401).send({ message: 'This token is not valid' });
  }
};

module.exports = { isAuthenticated };
