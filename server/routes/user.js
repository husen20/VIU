const express = require('express');
const router = express.Router();
const ControllerUser = require('../controllers/controllerUser');

router.get('/movies', ControllerUser.fetchMovies);
router.get('/genres', ControllerUser.fetchGenres);
router.get('/movies/:id', ControllerUser.detailMovie);

module.exports = router;
