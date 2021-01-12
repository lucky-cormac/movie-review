import { all } from 'redux-saga/effects';
import appMainSaga from './containers/App/saga';
import registerMainSaga from './containers/Register/saga';
import loginMainSaga from './containers/Login/saga';
import movieListMainSaga from './containers/MovieList/saga';
import movieMainSaga from './containers/Movie/saga';

export default function* rootSaga() {
  yield all([
    appMainSaga(),
    registerMainSaga(),
    loginMainSaga(),
    movieListMainSaga(),
    movieMainSaga(),
  ]);
}
