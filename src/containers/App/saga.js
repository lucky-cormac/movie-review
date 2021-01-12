import HttpStatus from 'http-status';
import { put, call, fork, takeLatest } from 'redux-saga/effects';
import { FETCH_ROLES } from 'containers/App/constants';
import {
  authTokenFailed,
  fetchRolesSucceeded,
  fetchRolesFailed,
} from 'containers/App/actions';
import { getAuthHeader } from 'utils/auth';
import request, { makeJsonRequestOptions } from 'utils/request';

/**
 * Base saga
 */
export function* appApiSaga(options, successHandlers, errorHandler) {
  try {
    options.headers = {
      ...options.headers,
      ...getAuthHeader(),
    };
    const response = yield call(request, options);
    for (let i = 0; i < successHandlers.length; i++) {
      yield put(successHandlers[i](response.data));
    }
  } catch (err) {
    const { response: errResponse } = err;

    if (errResponse && errResponse.status === HttpStatus.UNAUTHORIZED) {
      yield put(authTokenFailed());
    }
    if (errResponse) {
      yield put(errorHandler(errResponse.data));
    } else {
      yield put(errorHandler(new Error('Unknown Error')));
    }
  }
}

/**
 * FETCH_ROLES saga
 */
export function* fetchRoles() {
  const options = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: 'roles',
  });

  yield call(appApiSaga, options, [fetchRolesSucceeded], fetchRolesFailed);
}

export function* fetchRolesWatcher() {
  yield takeLatest(FETCH_ROLES, fetchRoles);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* appMainSaga() {
  yield fork(fetchRolesWatcher);
}
