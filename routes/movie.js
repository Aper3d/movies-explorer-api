const router = require('express').Router();
const { validateMovieId, validateAddMovie } = require('../middlewares/validation');
const { getMovies, addMovie, deleteMovie } = require('../controllers/movie');

router.get('/movies', getMovies);

router.post('/movies', validateAddMovie, addMovie);

router.delete('/movies/:_id', validateMovieId, deleteMovie);

module.exports = router;
