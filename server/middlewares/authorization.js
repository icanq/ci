const { User } = require("../models");

async function authorize(req, res, next) {
  try {
    const user = await User.findOne({
      where: { id: req.loggedin.id, role: "admin" },
    });
    if (user) {
      next();
    } else {
      throw {
        status: 401,
        message: "Unauthorized",
      };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authorize;
