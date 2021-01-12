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

const initialState = {
  movie: {
    loading: undefined,
    error: undefined,
    data: undefined,
  },
  reviews: {
    loading: undefined,
    error: undefined,
    data: undefined,
  },
};

function movieReducer(state = initialState, action) {
  const { error, movie, reviews } = action.payload || {};

  switch (action.type) {
    case FETCH_MOVIE:
    case CREATE_MOVIE:
      return {
        ...state,
        movie: {
          loading: true,
          error: false,
          data: false,
        },
      };
    case FETCH_REVIEWS:
      return {
        ...state,
        reviews: {
          loading: true,
          error: false,
          data: false,
        },
      };
    case UPDATE_MOVIE:
      return {
        ...state,
        movie: {
          ...state.movie,
          loading: true,
          error: false,
        },
      };
    case FETCH_MOVIE_SUCCESS:
    case CREATE_MOVIE_SUCCESS:
    case UPDATE_MOVIE_SUCCESS:
      return {
        ...state,
        movie: {
          loading: false,
          error: false,
          data: movie,
        },
      };
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: {
          loading: false,
          error: false,
          data: reviews,
        },
      };
    case FETCH_MOVIE_ERROR:
    case CREATE_MOVIE_ERROR:
      return {
        ...state,
        movie: {
          loading: false,
          error,
          data: false,
        },
      };
    case FETCH_REVIEWS_ERROR:
      return {
        ...state,
        reviews: {
          loading: false,
          error,
          data: false,
        },
      };
    case UPDATE_MOVIE_ERROR:
      return {
        ...state,
        movie: {
          ...state.movie,
          loading: false,
          error,
        },
      };
    default:
      return state;
  }
}

export default movieReducer;
