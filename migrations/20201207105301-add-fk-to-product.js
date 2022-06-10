"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Users",
          key: "id",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "UserId", {});
  },
};
