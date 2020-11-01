const mongoose = require('mongoose');

const refreshToken = mongoose.model('RefreshToken', new mongoose.Schema({
  token: { type: String, required: true },
  userEmail: { type: String, required: true },
}));

const getRefreshToken = async (id) => {
  try {
    return await refreshToken.findOne({ token: id });
  } catch (e) {
    return undefined;
  }
};

const removeRefreshToken = async (id) => {
  try {
    await refreshToken.findOneAndDelete({ token: id });
    return true;
  } catch (e) {
    return undefined;
  }
};

const createRefreshToken = async (data) => {
  try {
    return (await refreshToken.create(data)).token;
  } catch (e) {
    return undefined;
  }
};

module.exports = {
  getRefreshToken,
  createRefreshToken,
  removeRefreshToken,
};
