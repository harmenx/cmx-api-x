const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
  const token = req.headers['x-access-token'];
  const { secret } = process.env;

  if (token) {
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      Object.defineProperty(req, 'decoded', {
        value: decoded,
      });

      return next();
    });
  }
  return res.status(403).send({
    message: 'Token is required',
  });
};
module.exports = { authorize };
