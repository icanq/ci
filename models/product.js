"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User);
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name is required, cannot be blank",
          },
          notNull: {
            msg: "Name cannot be null"
          }
        },
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "ImageUrl is required, cannot be blank",
          },
          notNull: {
            msg: "ImageUrl cannot be null"
          }
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            args: true,
            msg: "Price must be number",
          },
          min: {
            args: [0],
            msg: "Cannot set to minus",
          },
          notNull: {
            msg: "Price is required, cannot be blank",
          }
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            args: true,
            msg: "Stock must be number",
          },
          min: {
            args: [0],
            msg: "Cannot set to minus"
          },
          notNull: {
            msg: "Stock is required, cannot be blank"
          }
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
