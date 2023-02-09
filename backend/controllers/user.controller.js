const User = require("../models/User");
const { throwError, responseError } = require("../util/errorFunctions");
const { createToken } = require("../services/jwt");
const { validateUserInfo, encryptPassword, matchPassword } = require("../util/userFunctions");

const signIn = async (req, res) => {
  try {
    const { user: userInfo } = req.body;
    await validateUserInfo(userInfo);

    const user = new User(userInfo);
    user.email = user.email.toLowerCase();
    user.password = await encryptPassword(userInfo.password);

    user.save((error, user) => {
      if (user) return res.status(200).send(user);
      throwError('Error trying to store the user, please try again!', 500, error);
    });

  } catch (error) { return responseError(res, error) }
}

const logIn = async (req, res) => {
  try {
    const { password } = req.body;
    const email = req.body.email.toLowerCase();

    const user = await User.findOne({ email });
    if (!user) throwError('There is no user registered with this email in the database, please sign up!', 404);

    const passwordIsCorrect = await matchPassword(password, user.password);
    if (!passwordIsCorrect) throwError('Your password is incorrect!', 401);
    delete user.password;

    const token = createToken(user);
    return res.status(200).send({ user, token });

  } catch (error) { return responseError(res, error) }
}


module.exports = { signIn, logIn }
