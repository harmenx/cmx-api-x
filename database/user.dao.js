const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  avatar_url: { type: String, required: false },
  password: { type: String, required: true },
}));

const createUser = async (body) => {
  try {
    const user = await User.create({
      name: body.email, email: body.email, avatar_url: body.avatar_url, password: body.password,
    });
    return user;
  } catch (e) {
    return false;
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = User.findOne({ email });
    return user;
  } catch (e) {
    return false;
  }
};

module.exports = {
  createUser,
  findUserByEmail,
};
