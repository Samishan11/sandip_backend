const jwt = require('jsonwebtoken');
const userModel = require("../model/user.model/user.model")
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY

const VerifyJWT = async (req, res, next) => {
  if (req.header('authorization') === undefined || req.header('authorization').length <= 9) {
    return res.status(401).send({
      message: "Token is empty !!"
    });
  }
  var accessToken = req.header('authorization')

  accessToken = accessToken.substr(7, accessToken.length);
  
  try {
    const _res = jwt.verify(accessToken, ACCESS_TOKEN_KEY, { expireIN: "24h" })
    userModel.findOne({ _id: _res?.userId }).then(function (result) {
      req.userInfo = result;
      next();
    });
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

module.exports = { VerifyJWT }