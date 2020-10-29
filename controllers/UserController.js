const bcrypt = require('bcrypt');
const gravatarUrl = require('gravatar-url');

const userDao = require('../database/user.dao');
const authService = require('../services/authService');

const saltRounds = 10;

const passwordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

const register = async (req, res) => {
  const foundUser = await userDao.findUserByEmail(req.body.email);
  if (!foundUser) {
    if (!passwordRegex.test(req.body.password)) {
      res.status(401).send({ message: 'Unauthorized' });
    } else {
      const salt = await bcrypt.genSalt(saltRounds);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      req.body.avatar_url = gravatarUrl(req.body.email);

      const user = await userDao.createUser(req.body);

      const userJwt = await authService.generateAccessToken(user.email);
      const refreshToken = await authService.createRefreshToken(user.email);
      res.status(200).send({ jwt: userJwt, refresh_token: refreshToken });
    }
  } else {
    res.status(409).send({ message: 'User Already Exists' });
  }
};

const getProfile = async (req, res) => {
  const user = await userDao.findUserByEmail(req.decoded.userEmail);
  if (user) {
    user.password = undefined;
    user._id = undefined;
    user.__v = undefined;
    res.status(200).send(user);
  }
};

module.exports = {
  register,
  getProfile,
};
