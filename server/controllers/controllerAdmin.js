const { Movie, User, Cast, Genre, sequelize } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

class ControllerAdmin {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: 'emailOrPasswordRequired' };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: 'emailOrPasswordNotFound' };
      }

      const compare = comparePassword(password, user.password);

      if (!compare) {
        throw { name: 'emailOrPasswordNotFound' };
      }

      const payload = {
        id: user.id,
      };

      const access_token = createToken(payload);

      res.status(200).json({ access_token: access_token, user: user.username });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      res.status(201).json('success');
    } catch (error) {
      next(error);
    }
  }

  static async fetchMoviesList(req, res, next) {
    try {
      const movies = await Movie.findAll({
        include: [
          {
            model: Genre,
          },
          {
            model: User,
          },
          {
            model: Cast,
          },
        ],
        order: [['createdAt', 'DESC']],
      });

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

  static async addMovies(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { formMovies, casts } = req.body;
      const { title, genreId, synopsis, imgUrl, trailerUrl, rating } = formMovies;

      const authorId = req.user.id;
      const movie = await Movie.create(
        {
          title,
          genreId,
          synopsis,
          imgUrl,
          trailerUrl,
          rating,
          slug: title.toLowerCase().split(' ').join('-'),
          authorId: authorId,
        },
        { transaction: t }
      );

      const cast = casts.map((el) => {
        el.movieId = movie.id;
        return el;
      });

      await Cast.bulkCreate(cast, {
        transaction: t,
        validate: true,
      });

      await t.commit();

      res.status(201).json('success');
    } catch (err) {
      t.rollback();
      next(err);
    }
  }

  static async editMovies(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { formMovies, casts } = req.body;
      const { id, title, genreId, synopsis, imgUrl, trailerUrl, rating } = formMovies;

      const authorId = req.user.id;
      await Movie.update(
        {
          title,
          genreId,
          synopsis,
          imgUrl,
          trailerUrl,
          rating,
          slug: title.toLowerCase().split(' ').join('-'),
          authorId: authorId,
        },
        {
          where: {
            id: id,
          },
          transaction: t,
        }
      );

      const cast = casts.map((el) => {
        delete el.id, el.createdAt, el.updatedAt;
        return el;
      });

      await Cast.destroy({
        where: {
          movieId: id,
        },
        transaction: t,
      });

      await Cast.bulkCreate(cast, {
        transaction: t,
        validate: true,
      });

      await t.commit();

      res.status(200).json('success');
    } catch (error) {
      t.rollback();
      next(error);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;

      const movie = Movie.findByPk(id);

      if (!movie) {
        throw { name: 'NotFound' };
      }

      await Movie.destroy({
        where: {
          id: id,
        },
      });

      await Cast.destroy({
        where: {
          movieId: id,
        },
      });

      res.status(200).json('success');
    } catch (error) {
      next(error);
    }
  }

  static async addGenre(req, res, next) {
    try {
      const { name } = req.body;

      await Genre.create({
        name,
      });

      res.status(201).json('success');
    } catch (error) {
      next(error);
    }
  }

  static async editGenre(req, res, next) {
    try {
      const { id, name } = req.body;

      const genre = Genre.findByPk(id);

      if (!genre) {
        throw { name: 'NotFound' };
      }

      await Genre.update(
        {
          name: name,
        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).json('success');
    } catch (error) {
      next(error);
    }
  }

  static async deleteGenre(req, res, next) {
    try {
      const { id } = req.params;

      const genre = Genre.findByPk(id);

      if (!genre) {
        throw { name: 'NotFound' };
      }

      await Genre.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json('success');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerAdmin;
