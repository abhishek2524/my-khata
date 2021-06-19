const { response } = require("express");
const jwt = require("jsonwebtoken");

module.exports = {
  createToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        name: userId,
      };
      const secret = "asdfghjklqwertyuiopzxcvbnm";
      const options = {
        expiresIn: "1h",
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  verifyToken(token) {
    const secret = "asdfghjklqwertyuiopzxcvbnm";
    return jwt.verify(token, secret, function (err, decode) {
      if (err) return false;
      return true;
    });
  },
};
