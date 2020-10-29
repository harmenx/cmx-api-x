
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const authDao = require('../database/auth.dao');

const createRefreshToken = async (email) => {
    const data = {
        token: randomstring.generate(),
        userEmail: email
    };
    let refreshToken = await authDao.createRefreshToken(data);
    return refreshToken;
}

const refreshAccessToken = async (refreshToken) => {
    const data = {
        token: randomstring.generate(),
        userEmail: email
    };
    let updatedRefreshToken = await authDao.createRefreshToken(data);
    return updatedRefreshToken;
}

const generateAccessToken = async (email) => {
    const secret = process.env.secret;
    return jwt.sign(
        { userEmail: email },
        secret,
        { expiresIn: 10 * 60 } // expires in 10 minutes
    );
}

module.exports = {
    createRefreshToken,
    refreshAccessToken,
    generateAccessToken
}