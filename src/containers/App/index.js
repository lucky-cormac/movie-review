import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import isNil from 'lodash/isNil';
import routes from './routes';
import { logout, fetchRoles } from './actions';
import AppBar from 'components/AppBar';
import Spinner from 'components/Spinner';

const theme = createMuiTheme({});

const App = () => {
  const dispatch = useDispatch();
  const fetchUserRoles = useCallback(() => dispatch(fetchRoles()), [dispatch]);
  const logoutUser = useCallback(() => dispatch(logout()), [dispatch]);
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);
  const roles = useSelector((state) => state.global.roles);
  const currentUser = useSelector((state) => state.global.currentUser);

  const { loading: rolesLoading, error: rolesError, data: rolesData } = roles;
  const { data: currentUserData } = currentUser;

  useEffect(() => {
    fetchUserRoles();
  }, []); // eslint-disable-line

  if (isNil(rolesData) || rolesLoading) {
    return <Spinner />;
  }

  if (rolesError) {
    return <Alert severity="error">{rolesError.message}</Alert>;
  }

  if (
    rolesData === false ||
    (Array.isArray(rolesData) && rolesData.length === 0)
  ) {
    return (
      <Alert severity="error">No roles found. Please try again later.</Alert>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Helmet>
          <meta name="description" content="Movie Reviews" />
          <title>Movie Reviews</title>
        </Helmet>
        <AppBar
          isAuthenticated={isAuthenticated}
          currentUserData={currentUserData}
          rolesData={rolesData}
          logout={logoutUser}
        />
        {routes(isAuthenticated)}
      </div>
    </ThemeProvider>
  );
};

export default withRouter(App);
