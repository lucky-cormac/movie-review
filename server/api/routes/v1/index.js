const express = require('express');
const passport = require('passport');
const authRoutes = require('./auth.route');
const roleRoutes = require('./role.route');
const movieRoutes = require('./movie.route');
const reviewRoutes = require('./review.route');
const router = express.Router();

/**
 * API status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * Auth
 */
router.use('/auth', authRoutes);

/**
 * Roles
 */
router.use('/roles', roleRoutes);

/**
 * Movies
 */
router.use(
  '/movies',
  passport.authenticate('jwt', { session: false }),
  movieRoutes,
);

/**
 * Reviews
 */
router.use(
  '/reviews',
  passport.authenticate('jwt', { session: false }),
  reviewRoutes,
);

module.exports = router;
