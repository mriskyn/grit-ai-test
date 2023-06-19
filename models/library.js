"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Library extends Model {
    static associate(models) {
      this.hasMany(models.Transaction);
    }
  }
  Library.init(
    {
      bookName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Library",
    }
  );
  return Library;
};
