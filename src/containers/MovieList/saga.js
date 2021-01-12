import { call, fork, takeLatest } from 'redux-saga/effects';
import { pickBy, isNil } from 'lodash';
import { makeUrlQueryParams, makeJsonRequestOptions } from 'utils/request';
import { appApiSaga } from 'containers/App/saga';
import {
  FETCH_MOVIES,
  DELETE_MOVIE,
  DELETE_MOVIES,
} from './constants';
import {
  fetchMoviesSucceeded,
  fetchMoviesFailed,
  deleteMovieSucceeded,
  deleteMovieFailed,
  deleteMoviesSucceeded,
  deleteMoviesFailed,
} from './actions';

/**
 * FETCH_MOVIES saga
 */
export function* fetchMovies(action) {
  const urlQueryParams = makeUrlQueryParams(
    pickBy(action.payload, (value, key) => !isNil(value)),
  );
  const options = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: `movies${urlQueryParams}`,
  });

  yield call(
    appApiSaga,
    options,
    [fetchMoviesSucceeded],
    fetchMoviesFailed,
  );
}

export function* fetchMoviesWatcher() {
  yield takeLatest(FETCH_MOVIES, fetchMovies);
}

/**
 * DELETE_MOVIE saga
 */
export function* deleteMovie(action) {
  const { _id } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'DELETE',
    requestUrlPath: `movies/${_id}`,
  });

  yield call(
    appApiSaga,
    options,
    [deleteMovieSucceeded],
    deleteMovieFailed,
  );
}

export function* deleteMovieWatcher() {
  yield takeLatest(DELETE_MOVIE, deleteMovie);
}

/**
 * DELETE_MOVIES saga
 */
export function* deleteMovies(action) {
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: `movies/deleteBatch`,
    data: action.payload,
  });

  yield call(
    appApiSaga,
    options,
    [deleteMoviesSucceeded],
    deleteMoviesFailed,
  );
}

export function* deleteMoviesWatcher() {
  yield takeLatest(DELETE_MOVIES, deleteMovies);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* movieListMainSaga() {
  yield fork(fetchMoviesWatcher);
  yield fork(deleteMovieWatcher);
  yield fork(deleteMoviesWatcher);
}
