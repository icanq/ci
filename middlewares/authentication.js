const { User } = require("../models");
const { verifyToken } = require("../helpers/tokenHandler");

const extractBearerToken = (token) => {
  return token.substring(7, token.length)
}

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization, 'ini auth')
    if (authorization.startsWith("Bearer ")) {
      access_token = extractBearerToken(authorization)
    } else {
      return;
    }
    if (access_token) {
      const decoded = verifyToken(access_token);
      const findUser = await User.findOne({
        where: {
          id: decoded.id,
        },
      });
      if (findUser) {
        req.loggedin = decoded;
        next();
      } else {
        throw {
          status: 401,
          message: "login first",
        };
      }
    } else {
      throw {
        status: 401,
        message: "login first",
      };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authentication