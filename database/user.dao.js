const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  avatar_url: { type: String, required: false },
  password: { type: String, required: true },
}));

const createUser = async (body) => {
  try {
    return await User.create({
      name: body.name, email: body.email, avatar_url: body.avatar_url, password: body.password,
    });
  } catch (e) {
    return undefined;
  }
};

const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (e) {
    return undefined;
  }
};

module.exports = {
  createUser,
  findUserByEmail,
};
