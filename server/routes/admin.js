const express = require('express');
const router = express.Router();
const ControllerAdmin = require('../controllers/controllerAdmin');
const authentication = require('../middleware/authentication');

router.post('/login', ControllerAdmin.login);

router.use(authentication);

router.post('/register', ControllerAdmin.register);
router.get('/movies-list', ControllerAdmin.fetchMoviesList);
router.post('/movies', ControllerAdmin.addMovies);
router.put('/movies', ControllerAdmin.editMovies);
router.delete('/movies/:id', ControllerAdmin.deleteMovie);
router.get('/genres', ControllerAdmin.fetchGenres);
router.post('/genres', ControllerAdmin.addGenre);
router.put('/genres/:id', ControllerAdmin.editGenre);
router.delete('/genres/:id', ControllerAdmin.deleteGenre);

module.exports = router;
