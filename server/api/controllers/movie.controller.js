const mongoose = require('mongoose');
const httpStatus = require('http-status');
const MovieModel = require('../models/movie.model');
const ReviewModel = require('../models/review.model');
const APIError = require('../helpers/APIError');
const { ROLES } = require('../utils/constants');

exports.getMovie = (req, res, next) => {
  const promises = [MovieModel.findById(req.params.id), ReviewModel.findOne({ reviewer: req.user._id, movie: req.params.id })];

  Promise.all(promises)
    .then(([movie, review]) => {
      if (!movie) {
        return Promise.reject(
          new APIError('Movie not found.', httpStatus.NOT_FOUND, true),
        );
      }

      res.status(httpStatus.OK).json({
        movie: {
          ...movie.toObject(),
          rate: review ? review.rate : 0,
          comment: review ? review.comment : '',
          dateVisited: review ? review.updatedAt : '',
        },
      });
    })
    .catch((err) => next(err));
};

exports.getMovies = (req, res, next) => {
  const { order, orderBy, page: pageStr, limit: limitStr } = req.query;

  let page = parseInt(pageStr, 10);
  let limit = parseInt(limitStr, 10);
  if (isNaN(page)) page = 0;
  if (isNaN(limit)) limit = 10;

  let movieQuery = MovieModel.find()
    .skip(page * limit)
    .limit(limit);

  if ((order === 'asc' || order === 'desc') && orderBy) {
    movieQuery = movieQuery.sort({ [orderBy]: order });
  }

  const reviewQuery = ReviewModel.find();

  MovieModel.countDocuments()
    .then((total) =>
      Promise.all([movieQuery, reviewQuery]).then(
        ([movies, reviews]) => ({
          total,
          movies,
          reviews,
        }),
      ),
    )
    .then(({ total, movies, reviews }) => {
      const transformedMovies = movies.map((movie) => {
        const filteredReviews = reviews.filter(
          (review) =>
            review.movie.toString() === movie._id.toString(),
        );
        return {
          ...movie.toObject(),
          averageRate:
            filteredReviews.length === 0
              ? 0
              : filteredReviews.reduce((acc, cur) => acc + cur.rate, 0) /
                filteredReviews.length,
        };
      });
      res.status(httpStatus.OK).json({
        result: {
          movies: transformedMovies.sort((a, b) =>
            a.averageRate > b.averageRate
              ? 1
              : a.averageRate === b.averageRate
              ? a.createdAt < b.createdAt
                ? 1
                : -1
              : -1,
          ),
          total,
          page,
          limit,
        },
      });
    })
    .catch((err) => next(err));
};

exports.createMovie = (req, res, next) => {
  const { rate, comment, ...params } = req.body;

  MovieModel.create(params)
    .then((movie) =>
      ReviewModel.create({
        rate,
        comment,
        reviewer: req.user._id,
        movie: movie._id,
      }).then((review) => ({ movie, review })),
    )
    .then(({ movie, review }) => {
      res.status(httpStatus.CREATED).json({
        movie: {
          ...movie.toObject(),
          rate: review.rate,
          comment: review.comment,
        },
      });
    })
    .catch((err) => next(err));
};

exports.updateMovie = (req, res, next) => {
  const { rate, comment, ...params } = req.body;

  MovieModel.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    params,
    { new: true },
  )
    .then((movie) =>
      ReviewModel.findOneAndUpdate(
        {
          reviewer: mongoose.Types.ObjectId(req.user._id),
          movie: mongoose.Types.ObjectId(req.params.id),
        },
        {
          rate,
          comment,
          reviewer: req.user._id,
          movie: req.params.id,
        },
        { new: true, upsert: true },
      ).then((review) => ({ movie, review })),
    )
    .then(({ movie, review }) => {
      res.status(httpStatus.OK).json({
        movie: {
          ...movie.toObject(),
          rate: review.rate,
          comment: review.comment,
        },
        isReview: req.user.role.name === ROLES.USER ? true : false,
      });
    })
    .catch((err) => next(err));
};

exports.deleteMovie = (req, res, next) => {
  MovieModel.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) })
    .then(() => {
      ReviewModel.deleteMany({
        movie: mongoose.Types.ObjectId(req.params.id),
      }).then(() =>
        res.status(httpStatus.OK).json({ deletedId: req.params.id }),
      );
    })
    .catch((err) => next(err));
};

exports.deleteMovies = (req, res, next) => {
  const { selectedIds: deletedIds } = req.body;
  const ids = deletedIds.map((id) => mongoose.Types.ObjectId(id));

  MovieModel.deleteMany({ _id: { $in: ids } })
    .then(() => {
      ReviewModel.deleteMany({ movie: { $in: ids } }).then(() =>
        res.status(httpStatus.OK).json({ deletedIds }),
      );
    })
    .catch((err) => next(err));
};
