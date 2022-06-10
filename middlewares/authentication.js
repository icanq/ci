const { User } = require("../models");
const { verifyToken } = require("../helpers/tokenHandler");

const extractBearerToken = (token) => {
  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTQ4Njc5MTN9.tUKPKjD9jMZgPvn_j0GSbx1uU8IVSJUHguXtJjU_0RI
  return token.substring(7, token.length)
}

const authentication = async (req, res, next) => {
  try {
    // if using bearer token as authentication methods
    // const { authorization } = req.headers;
    // if (authorization.startsWith("Bearer ")) {
    //   access_token = extractBearerToken(authorization)
    // } else {
    //   return;
    // }

    // if using cookies as authentication methods
    const { access_token } = req.cookies;

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