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

export const initialState = {
  needRefresh: false,
  movies: {
    loading: undefined,
    error: undefined,
    data: undefined,
    total: 0,
  },
};

function movieListReducer(state = initialState, action) {
  const { error, deletedId, deletedIds, result = {} } = action.payload || {};
  let newData = null;
  let newTotal = null;

  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: {
          loading: true,
          error: false,
          data: [],
          total: 0,
        },
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        needRefresh: false,
        movies: {
          loading: false,
          error: false,
          data: result.movies,
          total: result.total,
        },
      };
    case FETCH_MOVIES_ERROR:
      return {
        needRefresh: false,
        movies: {
          loading: false,
          error,
          data: [],
          total: 0,
        },
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: {
          ...state.movies,
          loading: true,
          error: false,
        },
      };
    case DELETE_MOVIE_SUCCESS:
      newData = state.movies.data.filter((item) => item._id !== deletedId);
      newTotal = state.movies.total - 1;

      return {
        needRefresh: true,
        movies: {
          loading: false,
          error: false,
          data: newData,
          total: newTotal,
        },
      };
    case DELETE_MOVIE_ERROR:
      return {
        needRefresh: true,
        movies: {
          ...state.movies,
          loading: false,
          error,
        },
      };
    case DELETE_MOVIES:
      return {
        ...state,
        movies: {
          ...state.movies,
          loading: true,
          error: false,
        },
      };
    case DELETE_MOVIES_SUCCESS:
      newData = state.movies.data.filter(
        (item) => deletedIds.includes(item._id) === false,
      );
      newTotal = state.movies.total - deletedIds.length;

      return {
        needRefresh: true,
        movies: {
          loading: false,
          error: false,
          data: newData,
          total: newTotal,
        },
      };
    case DELETE_MOVIES_ERROR:
      return {
        needRefresh: true,
        movies: {
          ...state.movies,
          loading: false,
          error,
        },
      };
    default:
      return state;
  }
}

export default movieListReducer;
