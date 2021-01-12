const express = require('express');
const reviewController = require('../../controllers/review.controller');
const router = express.Router();

router.route('/:movie').get(reviewController.getMovieReviews);

module.exports = router;
