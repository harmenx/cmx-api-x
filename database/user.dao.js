const mongoose = require('mongoose');

let User = mongoose.model('User', new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    avatar_url: { type: String, required: false },
    password: { type: String, required: true }
}));

createUser = async (body) => {
    let user = await User.create({ name: body.email, email: body.email, avatar_url: body.avatar_url, password: body.password })
    return user;
}

findUserByEmail = async (email) => {
    let user = User.findOne({ 'email': email });
    return user;
}

module.exports = {
    createUser,
    findUserByEmail,
}
