import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import MovieForm, { FORM_MODE } from 'components/MovieForm';
import RatingBox from 'components/RatingBox';
import Spinner from 'components/Spinner';
import { ROLES } from 'utils/constants';
import { FORM_TITLE_MAP } from './constants';
import {
  fetchMovie,
  fetchReviews,
  createMovie,
  updateMovie,
} from './actions';

const Movie = ({ mode, match }) => {
  const dispatch = useDispatch();
  const { data: currentUserData } = useSelector(
    (state) => state.global.currentUser,
  );
  const movie = useSelector((state) => state.movie.movie);
  const reviews = useSelector((state) => state.movie.reviews);
  const reviewsData = reviews.data;
  const fetchSelectedMovie = useCallback(
    (payload) => dispatch(fetchMovie(payload)),
    [dispatch],
  );
  const fetchSelectedReviews = useCallback(
    (payload) => dispatch(fetchReviews(payload)),
    [dispatch],
  );
  const createNewMovie = useCallback(
    (payload) => dispatch(createMovie(payload)),
    [dispatch],
  );
  const updateSelectedMovie = useCallback(
    (payload) => dispatch(updateMovie(payload)),
    [dispatch],
  );

  useEffect(() => {
    if (mode === FORM_MODE.EDIT) {
      fetchSelectedMovie({ _id: match.params.id });
      fetchSelectedReviews({ _id: match.params.id });
    }
  }, []); // eslint-disable-line

  let content = null;
  const onSubmit =
    mode === FORM_MODE.EDIT ? updateSelectedMovie : createNewMovie;

  let formTitle = FORM_TITLE_MAP[mode];
  let isEditable = true;
  if ([ROLES.USER].includes(currentUserData.role.name)) {
    formTitle = 'Review';
    isEditable = false;
  }

  if (mode === FORM_MODE.EDIT && (!movie.data || !reviewsData)) {
    if (movie.error) {
      content = <Alert severity="error">{movie.error.message}</Alert>;
    } else if (reviews.error) {
      content = <Alert severity="error">{reviews.error.message}</Alert>;
    } else {
      content = <Spinner />;
    }
  } else {
    content = (
      <>
        <Link to="/movies" style={{ textDecoration: 'none' }}>
          <Typography component="span" variant="subtitle1">
            &lt; Back
          </Typography>
        </Link>
        <Grid container spacing={2}>
          <Grid item xs={mode === FORM_MODE.EDIT ? 6 : 12}>
            <MovieForm
              title={formTitle}
              isEditable={isEditable}
              mode={mode}
              movie={movie}
              onSubmit={onSubmit}
            />
          </Grid>
          {mode === FORM_MODE.EDIT && (
            <Grid item xs={6}>
              {reviewsData && reviewsData.latestReview ? (
                <>
                  <RatingBox
                    rate={reviewsData.averageRate}
                    label="Average rate"
                  />
                  <RatingBox
                    rate={reviewsData.maxRate}
                    label="Highest rated review"
                  />
                  <RatingBox
                    rate={reviewsData.minRate}
                    label="Lowest rated review"
                  />
                  <RatingBox
                    rate={reviewsData.latestReview.rate}
                    label="Latest review"
                    comment={reviewsData.latestReview.comment}
                  />
                </>
              ) : (
                <Typography variant="h5">No reviews yet.</Typography>
              )}
            </Grid>
          )}
        </Grid>
      </>
    );
  }

  return (
    <Box width={mode === FORM_MODE.CREATE ? 540 : 1080} my={5} mx="auto">
      {content}
    </Box>
  );
};

Movie.propTypes = {
  mode: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(Movie);
