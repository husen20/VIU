'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, { foreignKey: 'authorId' });
      Movie.belongsTo(models.Genre, { foreignKey: 'genreId' });
      Movie.hasMany(models.Cast, { foreignKey: 'movieId' });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Title is Required',
          },
          notEmpty: {
            msg: 'Title is Required',
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Slug is Required',
          },
          notEmpty: {
            msg: 'Slug is Required',
          },
        },
      },
      synopsis: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Synopsis is Required',
          },
          notEmpty: {
            msg: 'Synopsis is Required',
          },
        },
      },
      trailerUrl: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      rating: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Rating is Required',
          },
          notEmpty: {
            msg: 'Rating is Required',
          },
          min: {
            args: 1,
            msg: 'Rating minimum 1',
          },
          max: {
            args: 100,
            msg: 'Rating maximum 100',
          },
        },
      },
      genreId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Movie',
    }
  );
  return Movie;
};
