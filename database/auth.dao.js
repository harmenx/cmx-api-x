const mongoose = require('mongoose');

const refreshToken = mongoose.model('RefreshToken', new mongoose.Schema({
  token: { type: String, required: true },
  userEmail: { type: String, required: true },
}));

const getRefreshToken = async (id) => {
  try {
    const rToken = await refreshToken.findOne({ token: id });
    return rToken;
  } catch (e) {
    return false;
  }
};

const removeRefreshToken = async (id) => {
  try {
    await refreshToken.findOneAndDelete({ token: id });
    return true;
  } catch (e) {
    return false;
  }
};

const createRefreshToken = async (data) => {
  try {
    const rToken = await refreshToken.create(data);
    return rToken.token;
  } catch (e) {
    return false;
  }
};

module.exports = {
  getRefreshToken,
  createRefreshToken,
  removeRefreshToken,
};
