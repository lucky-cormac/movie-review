const express = require('express');
const { checkRole } = require('../../middlewares/permission.middleware');
const { ROLES } = require('../../utils/constants');
const movieController = require('../../controllers/movie.controller');
const router = express.Router();

router
  .route('/')
  .get(movieController.getMovies)
  .post(checkRole([ROLES.ADMIN]), movieController.createMovie);

router
  .route('/deleteBatch')
  .post(checkRole([ROLES.ADMIN]), movieController.deleteMovies);

router
  .route('/:id')
  .get(movieController.getMovie)
  .put(movieController.updateMovie)
  .delete(checkRole([ROLES.ADMIN]), movieController.deleteMovie);

module.exports = router;
