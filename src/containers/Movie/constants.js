import { FORM_MODE } from '../../components/MovieForm/constants';

export const FETCH_MOVIE = 'Movie/FETCH_MOVIE';
export const FETCH_MOVIE_SUCCESS = 'Movie/FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIE_ERROR = 'Movie/FETCH_MOVIE_ERROR';

export const FETCH_REVIEWS = 'Movie/FETCH_REVIEWS';
export const FETCH_REVIEWS_SUCCESS = 'Movie/FETCH_REVIEWS_SUCCESS';
export const FETCH_REVIEWS_ERROR = 'Movie/FETCH_REVIEWS_ERROR';

export const CREATE_MOVIE = 'Movie/CREATE_MOVIE';
export const CREATE_MOVIE_SUCCESS = 'Movie/CREATE_MOVIE_SUCCESS';
export const CREATE_MOVIE_ERROR = 'Movie/CREATE_MOVIE_ERROR';

export const UPDATE_MOVIE = 'Movie/UPDATE_MOVIE';
export const UPDATE_MOVIE_SUCCESS = 'Movie/UPDATE_MOVIE_SUCCESS';
export const UPDATE_MOVIE_ERROR = 'Movie/UPDATE_MOVIE_ERROR';

export const FORM_TITLE_MAP = {
  [FORM_MODE.CREATE]: 'Create Movie',
  [FORM_MODE.EDIT]: 'Edit Movie',
};
