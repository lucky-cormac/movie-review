import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { connectRouter } from 'connected-react-router';
import appReducer from './containers/App/reducer';
import movieListReducer from './containers/MovieList/reducer';
import movieReducer from './containers/Movie/reducer';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    toastr: toastrReducer,
    global: appReducer,
    movieList: movieListReducer,
    movie: movieReducer,
  });
}
