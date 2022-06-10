const { User } = require("../models");
const { verifyToken } = require("../helpers/tokenHandler");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
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