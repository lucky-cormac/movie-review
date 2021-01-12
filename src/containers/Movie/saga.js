import { call, fork, takeLatest } from 'redux-saga/effects';
import { makeJsonRequestOptions } from 'utils/request';
import { appApiSaga } from 'containers/App/saga';
import {
  FETCH_MOVIE,
  FETCH_REVIEWS,
  CREATE_MOVIE,
  UPDATE_MOVIE,
} from './constants';
import {
  fetchMovieSucceeded,
  fetchMovieFailed,
  fetchReviewsSucceeded,
  fetchReviewsFailed,
  createMovieSucceeded,
  createMovieFailed,
  updateMovieSucceeded,
  updateMovieFailed,
} from './actions';

/**
 * FETCH_MOVIE saga
 */
export function* fetchMovie(action) {
  const { _id } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: `movies/${_id}`,
  });

  yield call(
    appApiSaga,
    options,
    [fetchMovieSucceeded],
    fetchMovieFailed,
  );
}

export function* fetchMovieWatcher() {
  yield takeLatest(FETCH_MOVIE, fetchMovie);
}

/**
 * FETCH_REVIEWS saga
 */
export function* fetchReviews(action) {
  const { _id } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: `reviews/${_id}`,
  });

  yield call(appApiSaga, options, [fetchReviewsSucceeded], fetchReviewsFailed);
}

export function* fetchReviewsWatcher() {
  yield takeLatest(FETCH_REVIEWS, fetchReviews);
}

/**
 * CREATE_MOVIE saga
 */
export function* createMovie(action) {
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: 'movies',
    data: action.payload,
  });

  yield call(
    appApiSaga,
    options,
    [createMovieSucceeded],
    createMovieFailed,
  );
}

export function* createMovieWatcher() {
  yield takeLatest(CREATE_MOVIE, createMovie);
}

/**
 * UPDATE_MOVIE saga
 */
export function* updateMovie(action) {
  const { _id, ...data } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'PUT',
    requestUrlPath: `movies/${_id}`,
    data,
  });

  yield call(
    appApiSaga,
    options,
    [updateMovieSucceeded],
    updateMovieFailed,
  );
}

export function* updateMovieWatcher() {
  yield takeLatest(UPDATE_MOVIE, updateMovie);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* movieMainSaga() {
  yield fork(fetchMovieWatcher);
  yield fork(fetchReviewsWatcher);
  yield fork(createMovieWatcher);
  yield fork(updateMovieWatcher);
}
