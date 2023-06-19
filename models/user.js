"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Transaction);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   min: 8,
        //   isAlphanumeric: true
        // }
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate("password hash", async (user, options) => {
    const hashPassword = await bcrypt.hash(
      user.password,
      await bcrypt.genSalt()
    );
    user.password = hashPassword;
  });

  User.afterFind("check password", async (user, options) => {
    console.log(options.password)
    const isPasswordMatch = await bcrypt.compare(
      options.password,
      user.password
    );
    if (!isPasswordMatch) {
      return Promise.reject(new Error("Invalid Email or Password"));
    }
  });
  return User;
};
