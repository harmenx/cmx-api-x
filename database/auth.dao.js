const mongoose = require('mongoose');

const refreshToken = mongoose.model('RefreshToken', new mongoose.Schema({
    token: { type: String, required: true },
    userEmail: { type: String, required: true }
}));

getRefreshToken = async (id) => {
    let rToken = await refreshToken.findOne({ token: id });
    return rToken;
}

removeRefreshToken = async (id) => {
    await refreshToken.findOneAndDelete({ token: id });
    return true;
}

createRefreshToken = async (data) => {
    let rToken = await refreshToken.create(data);
    return rToken.token;
}

module.exports = {
    getRefreshToken,
    createRefreshToken,
    removeRefreshToken
}