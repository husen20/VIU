function errorHandler(err, req, res, next) {
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ message: err.errors[0].message });
  } else if (err.name === 'emailOrPasswordRequired') {
    res.status(400).send({ message: 'Email or password is required' });
  } else if (err.name === 'InvalidToken' || err.name === 'JsonWebTokenError') {
    res.status(401).json({ message: 'Invalid Token' });
  } else if (err.name === 'emailOrPasswordNotFound') {
    res.status(401).json({ message: 'Invalid email or password' });
  } else if (err.name === 'Forbidden') {
    res.status(403).json({ message: 'Not Allowed!' });
  } else if (err.name === 'NotFound') {
    res.status(404).json({ message: 'File not found' });
  } else if (err.errors[0].errors.name === 'SequelizeValidationError') {
    res.status(400).json({ message: err.errors[0].errors.errors[0].message });
  } else {
    res.status(500).send('Internal server error');
  }
}

module.exports = errorHandler;
