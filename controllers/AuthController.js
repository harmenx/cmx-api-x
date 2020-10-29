const bcrypt = require('bcrypt');
const userDao = require('../database/user.dao');
const authDao = require('../database/auth.dao');
const authService = require('../services/authService');

const refreshToken = async (req, res) => {
  const refToken = await authDao.getRefreshToken(req.body.refresh_token);
  if (refToken) {
    const accessToken = await authService.generateAccessToken(refToken.userEmail);
    res.status(200).send({ jwt: accessToken });
  } else {
    res.status(404).send({ message: 'No Refresh Token Found' });
  }
};

const loginUser = async (req, res) => {
  const user = await userDao.findUserByEmail(req.body.email);
  if (user) {
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (isMatch === true) {
      const userJwt = await authService.generateAccessToken(user.email);
      const refToken = await authService.createRefreshToken(user.email);
      res.status(200).send({ refresh_token: refToken, jwt: userJwt });
    } else {
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(404).send();
  }
};

const logoutUser = async (req, res) => {
  const refToken = await authDao.getRefreshToken(req.body.refresh_token);
  if (refToken) {
    await authDao.removeRefreshToken(refToken.token);
    res.status(204).send();
  } else {
    res.status(404).send('User does not exist');
  }
};

module.exports = {
  loginUser,
  logoutUser,
  refreshToken,
};
