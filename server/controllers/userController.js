const { User } = require("../models");
const { generateToken } = require("../helpers/tokenHandler");
const { compare } = require("../helpers/passwordHandler");

class userController {
  // register
  static async register(req, res, next) {
    try {
      if (!req.body.username) {
        throw {
          status: 400,
          message: "Username must be filled",
        };
      }
      const payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      const data = await User.create(payload);
      res.status(201).json({
        id: data.id,
        username: data.username,
        email: data.email,
      });
    } catch (error) {
      next(error);
    }
  }

  // login
  static login(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email,
        role: "admin",
      },
    })
      .then((data) => {
        if (!data) {
          throw {
            status: 404,
            message: "Account not found!",
          };
        } else if (compare(req.body.password, data.password)) {
          const access_token = generateToken({
            id: data.id,
            email: data.email,
            role: data.role,
          });
          res.status(200).json({
            id: data.id,
            username: data.username,
            email: data.email,
            access_token,
          });
        } else {
          throw {
            status: 400,
            message: "Wrong email/password",
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  // login user
  static async loginUser(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email,
        role: "customer",
      },
    })
      .then((data) => {
        if (!data) {
          throw {
            status: 404,
            message: "Account not found!",
          };
        } else if (compare(req.body.password, data.password)) {
          const access_token = generateToken({
            id: data.id,
            email: data.email,
            role: data.role,
          });
          res.status(200).json({
            id: data.id,
            username: data.username,
            email: data.email,
            access_token,
          });
        } else {
          throw {
            status: 400,
            message: "Wrong email/password",
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = userController;
