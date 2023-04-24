const { Movie, Cast, Genre } = require('../models');

class ControllerUser {
  static async fetchMovies(req, res, next) {
    try {
      const { filter } = req.query;

      const options = {
        include: {
          model: Genre,
        },
      };

      if (filter) {
        options.where = {
          genreId: filter,
        };
      }

      const movies = await Movie.findAll(options);

      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async fetchGenres(req, res, next) {
    try {
      const genres = await Genre.findAll();

      res.status(200).json(genres);
    } catch (error) {
      next(error);
    }
  }

  static async detailMovie(req, res, next) {
    try {
      const { id } = req.params;

      const movie = await Movie.findByPk(id, {
        include: [
          {
            model: Cast,
          },
          {
            model: Genre,
          },
        ],
      });

      if (!movie) {
        throw { name: 'NotFound' };
      }

      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerUser;
