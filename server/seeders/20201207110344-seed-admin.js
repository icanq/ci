"use strict";
const { hash } = require("../helpers/passwordHandler");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const admin = [
      {
        username: "admin",
        role: "admin",
        email: "admin@admin.com",
        password: hash('adminganteng'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Users", admin, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
