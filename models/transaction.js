"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.belongsTo(models.Library);
      this.belongsTo(models.User);
    }
  }
  Transaction.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      LibraryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("on borrow", "returned"),
        defaultValue: "on borrow",
      },
      isLateReturn: {
        type: DataTypes.TINYINT(1),
      },
      returnAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
