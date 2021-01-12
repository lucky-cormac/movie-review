import { FORM_MODE as MOVIE_FORM_MODE } from 'components/MovieForm';
import Register from 'containers/Register';
import Login from 'containers/Login';
import MovieList from 'containers/MovieList';
import Movie from 'containers/Movie';
import NotFound from 'containers/NotFound';

export default [
  {
    exact: true,
    path: '/',
    redirectTo: '/login',
  },
  {
    controlled: true,
    path: '/register',
    redirectTo: '/movies',
    component: Register,
    shouldNotBeAuthenticated: true,
  },
  {
    controlled: true,
    path: '/login',
    redirectTo: '/movies',
    component: Login,
    shouldNotBeAuthenticated: true,
  },
  {
    controlled: true,
    exact: true,
    path: '/movies',
    redirectTo: '/login',
    component: MovieList,
    shouldBeAuthenticated: true,
  },
  {
    controlled: true,
    exact: true,
    path: '/movies/new',
    mode: MOVIE_FORM_MODE.CREATE,
    redirectTo: '/login',
    component: Movie,
    shouldBeAuthenticated: true,
  },
  {
    controlled: true,
    path: '/movies/:id',
    mode: MOVIE_FORM_MODE.EDIT,
    redirectTo: '/login',
    component: Movie,
    shouldBeAuthenticated: true,
  },
  {
    component: NotFound,
  },
];
