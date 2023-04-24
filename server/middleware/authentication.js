const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

async function authentication(req, res, next) {
  try {
    access_token = req.headers.access_token;

    if (!access_token) {
      throw { name: 'InvalidToken' };
    }

    const payload = verifyToken(access_token);
    const user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: 'InvalidToken' };
    }

    req.user = {
      id: user.id,
      name: user.username,
      email: user.email,
    };

    next();
  } catch (err) {
    next(err);
  }
}
module.exports = authentication;
