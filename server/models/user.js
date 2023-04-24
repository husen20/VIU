'use strict';
const { Model } = require('sequelize');
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie, { foreignKey: 'authorId' });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Username is Required',
          },
          notEmpty: {
            msg: 'Username is Required',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email must be uniq',
        },
        validate: {
          notNull: {
            msg: 'Email is Required',
          },
          notEmpty: {
            msg: 'Email is Required',
          },
          isEmail: {
            msg: 'Email format must be correct',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password is Required',
          },
          notEmpty: {
            msg: 'Password is Required',
          },
          len: {
            args: [5, 255],
            msg: 'Password must greater equals 5',
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.beforeCreate((user, opstions) => {
    user.role = 'Admin';
    user.password = hash(user.password);
  });
  return User;
};
