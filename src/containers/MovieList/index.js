import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Alert from '@material-ui/lab/Alert';
import EntityTable, { ENTITY_TYPES } from 'components/EntityTable';
import { ROLES } from 'utils/constants';
import {
  fetchMovies,
  deleteMovie,
  deleteMovies,
} from './actions';
import { columns } from './constants';

const MovieList = () => {
  const dispatch = useDispatch();
  const { data: currentUserData } = useSelector(
    (state) => state.global.currentUser,
  );
  const { loading, error, data, total } = useSelector(
    (state) => state.movieList.movies,
  );
  const needRefresh = useSelector((state) => state.movieList.needRefresh);
  const fetchMovieList = useCallback(
    (payload) => dispatch(fetchMovies(payload)),
    [dispatch],
  );
  const deleteSelectedMovie = useCallback(
    (payload) => dispatch(deleteMovie(payload)),
    [dispatch],
  );
  const deleteSelectedMovies = useCallback(
    (payload) => dispatch(deleteMovies(payload)),
    [dispatch],
  );

  const dataSource = data
    ? data.map((movie) => ({
        ...movie,
        averageRate: (
          <Rating value={movie.averageRate} precision={0.1} readOnly />
        ),
      }))
    : [];

  return (
    <Box my={5} mx={4}>
      {error && <Alert severity="error">{error.message}</Alert>}
      <EntityTable
        loading={loading}
        entityType={ENTITY_TYPES.MOVIE}
        columns={columns}
        showAction={
          [ROLES.ADMIN].includes(currentUserData.role.name) ? true : false
        }
        dataSource={dataSource}
        needRefresh={needRefresh}
        totalCount={total}
        fetchData={fetchMovieList}
        deleteSelectedEntity={deleteSelectedMovie}
        deleteSelectedEntities={deleteSelectedMovies}
      />
    </Box>
  );
};

export default MovieList;
