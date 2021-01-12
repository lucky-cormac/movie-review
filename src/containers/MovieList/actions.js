import { toastr } from 'react-redux-toastr';
import {
  FETCH_MOVIES,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  DELETE_MOVIE,
  DELETE_MOVIE_SUCCESS,
  DELETE_MOVIE_ERROR,
  DELETE_MOVIES,
  DELETE_MOVIES_SUCCESS,
  DELETE_MOVIES_ERROR,
} from './constants';

/**
 * Fetch movies
 */
export function fetchMovies(payload) {
  return {
    type: FETCH_MOVIES,
    payload,
  };
}

export function fetchMoviesSucceeded(payload) {
  return {
    type: FETCH_MOVIES_SUCCESS,
    payload,
  };
}

export function fetchMoviesFailed(error) {
  toastr.error('Fetch Movies', error.message);

  return {
    type: FETCH_MOVIES_ERROR,
    payload: { error },
  };
}

/**
 * Delete movie
 */
export function deleteMovie(payload) {
  return {
    type: DELETE_MOVIE,
    payload,
  };
}

export function deleteMovieSucceeded(payload) {
  toastr.success('Delete Movie', 'Movie deleted successfully.');

  return {
    type: DELETE_MOVIE_SUCCESS,
    payload,
  };
}

export function deleteMovieFailed(error) {
  toastr.error('Delete Movie', error.message);

  return {
    type: DELETE_MOVIE_ERROR,
    payload: { error },
  };
}

/**
 * Delete movies
 */
export function deleteMovies(payload) {
  return {
    type: DELETE_MOVIES,
    payload,
  };
}

export function deleteMoviesSucceeded(payload) {
  toastr.success('Delete Movies', 'Movie(s) deleted successfully.');

  return {
    type: DELETE_MOVIES_SUCCESS,
    payload,
  };
}

export function deleteMoviesFailed(error) {
  toastr.error('Delete Movies', error.message);

  return {
    type: DELETE_MOVIES_ERROR,
    payload: { error },
  };
}
