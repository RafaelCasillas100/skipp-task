const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { throwError } = require('./errorFunctions');

const validateUserInfo = async (user) => {
  const { firstName, lastName, phoneNumber, email, password } = user;
  if (!firstName || !lastName)
    throwError('Your name or last name information is not complete!', 400);

  if (phoneNumber.toString().length !== 10)
    throwError('Your phone number must be 10 digits long!', 400);

  if (password.length < 10)
    throwError('Your password must be at least 10 characters long!', 400);

  if (!emailIsValid(email))
    throwError('Your email is not valid!', 400);

  const emailAlreadyExists = await userWithThisEmailAlreadyExists(email);
  if (emailAlreadyExists)
    throwError('This email already exists in the database, please try with a different one!', 400);
}

const emailIsValid = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return true;
  else return false;
}

const userWithThisEmailAlreadyExists = async (email) => {
  try {
    const users = await User.find({ email: email.toLowerCase() });
    return users.length > 0;
  } catch (error) {
    throwError('An unespected error ocurred, please try again!', 500, error);
  }
}

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
}

const matchPassword = async (password, storedPassword) => {
  const passwordMatched = await bcrypt.compare(password, storedPassword);
  return passwordMatched;
}

module.exports = { validateUserInfo, encryptPassword, matchPassword }
