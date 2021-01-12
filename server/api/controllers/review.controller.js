const httpStatus = require('http-status');
const ReviewModel = require('../models/review.model');

exports.getMovieReviews = (req, res, next) => {
  const { movie } = req.params;
  const promises = [ReviewModel.find({ movie }), ReviewModel.findOne({ movie }).sort('-updatedAt')];

  Promise.all(promises)
    .then(([reviews, latestReview]) => {
      const minRate = Math.min(...reviews.map((review) => review.rate));
      const maxRate = Math.max(...reviews.map((review) => review.rate));
      const averageRate =
        reviews.length === 0
          ? 0
          : reviews.reduce((acc, cur) => acc + cur.rate, 0) / reviews.length;

      res.status(httpStatus.OK).json({
        reviews: {
          averageRate,
          maxRate,
          minRate,
          latestReview: latestReview ? latestReview.toObject() : null,
        },
      });
    })
    .catch((err) => next(err));
};
