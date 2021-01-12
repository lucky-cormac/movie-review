import { toastr } from 'react-redux-toastr';
import {
  FETCH_MOVIE,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_ERROR,
  FETCH_REVIEWS,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_ERROR,
  CREATE_MOVIE,
  CREATE_MOVIE_SUCCESS,
  CREATE_MOVIE_ERROR,
  UPDATE_MOVIE,
  UPDATE_MOVIE_SUCCESS,
  UPDATE_MOVIE_ERROR,
} from './constants';

/**
 * Fetch movie
 */
export function fetchMovie(payload) {
  return {
    type: FETCH_MOVIE,
    payload,
  };
}

export function fetchMovieSucceeded(payload) {
  return {
    type: FETCH_MOVIE_SUCCESS,
    payload,
  };
}

export function fetchMovieFailed(error) {
  toastr.error('Fetch Movie', error.message);

  return {
    type: FETCH_MOVIE_ERROR,
    payload: { error },
  };
}

/**
 * Fetch reviews
 */
export function fetchReviews(payload) {
  return {
    type: FETCH_REVIEWS,
    payload,
  };
}

export function fetchReviewsSucceeded(payload) {
  return {
    type: FETCH_REVIEWS_SUCCESS,
    payload,
  };
}

export function fetchReviewsFailed(error) {
  toastr.error('Fetch Reviews', error.message);

  return {
    type: FETCH_REVIEWS_ERROR,
    payload: { error },
  };
}

/**
 * Create movie
 */
export function createMovie(payload) {
  return {
    type: CREATE_MOVIE,
    payload,
  };
}

export function createMovieSucceeded(payload) {
  toastr.success('Create Movie', 'Movie created successfully.');

  return {
    type: CREATE_MOVIE_SUCCESS,
    payload,
  };
}

export function createMovieFailed(error) {
  toastr.error('Create Movie', error.message);

  return {
    type: CREATE_MOVIE_ERROR,
    payload: { error },
  };
}

/**
 * Update movie
 */
export function updateMovie(payload) {
  return {
    type: UPDATE_MOVIE,
    payload,
  };
}

export function updateMovieSucceeded(payload) {
  if (payload.isReview) {
    toastr.success('Review', 'Review saved successfully.');
  } else {
    toastr.success('Update Movie', 'Movie updated successfully.');
  }

  return {
    type: UPDATE_MOVIE_SUCCESS,
    payload,
  };
}

export function updateMovieFailed(error) {
  toastr.error('Update Movie', error.message);

  return {
    type: UPDATE_MOVIE_ERROR,
    payload: { error },
  };
}
