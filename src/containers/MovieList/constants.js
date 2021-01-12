export const FETCH_MOVIES = 'MovieList/FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS =
  'MovieList/FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_ERROR = 'MovieList/FETCH_MOVIES_ERROR';

export const DELETE_MOVIE = 'MovieList/DELETE_MOVIE';
export const DELETE_MOVIE_SUCCESS =
  'MovieList/DELETE_MOVIE_SUCCESS';
export const DELETE_MOVIE_ERROR = 'MovieList/DELETE_MOVIE_ERROR';

export const DELETE_MOVIES = 'MovieList/DELETE_MOVIES';
export const DELETE_MOVIES_SUCCESS =
  'MovieList/DELETE_MOVIES_SUCCESS';
export const DELETE_MOVIES_ERROR =
  'MovieList/DELETE_MOVIES_ERROR';

export const columns = [
  { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
  {
    id: 'plot',
    numeric: false,
    disablePadding: false,
    label: 'Plot',
  },
  { id: 'castAndCrew', numeric: false, disablePadding: false, label: 'Cast & Crew' },
  {
    id: 'genre',
    numeric: false,
    disablePadding: false,
    label: 'Genre',
  },
  {
    id: 'releaseDate',
    numeric: false,
    disablePadding: false,
    label: 'Release Date',
  },
  {
    id: 'language',
    numeric: false,
    disablePadding: false,
    label: 'Language',
  },
  { id: 'averageRate', numeric: true, disablePadding: false, label: 'Rate' },
];
