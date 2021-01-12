import React, { Fragment, useState } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './styles';
import { ROLES } from 'utils/constants';

const TopAppBar = ({
  history,
  classes,
  isAuthenticated,
  currentUserData,
  logout,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleAccountMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleAccountMenuClose = () => setAnchorEl(null);
  const logoutUser = () => {
    handleAccountMenuClose();
    logout();
  };
  const getAuthenticatedMenuItems = () => {
    const { email, firstName, lastName, role } = currentUserData;
    const mainMenuItems = [];
    let currentUserLabel = (
      <Box component="span" className={classes.menuButtonEmail}>
        {email}
      </Box>
    );

    if ([ROLES.ADMIN, ROLES.USER].includes(role.name)) {
      mainMenuItems.push(
        <Link key="movies" to="/movies" className={classes.menuItem}>
          <Typography variant="h6" color="inherit">
            Movies
          </Typography>
        </Link>,
      );
    }

    if (firstName) {
      currentUserLabel = (
        <Box component="span" className={classes.menuButtonName}>
          {firstName} {lastName}
        </Box>
      );
    }

    const accountMenuItems = [
      <Fragment key="authenticated-account">
        <Button
          className={classes.menuButton}
          aria-owns={anchorEl ? 'account-menu-items' : undefined}
          aria-haspopup="true"
          onClick={handleAccountMenuClick}
        >
          {currentUserLabel}
        </Button>
        <Menu
          id="account-menu-items"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleAccountMenuClose}
        >
          <MenuItem onClick={logoutUser}>Logout</MenuItem>
        </Menu>
      </Fragment>,
    ];

    return { mainMenuItems, accountMenuItems };
  };

  let mainMenuItems = [];
  let accountMenuItems = [
    <Link key="register" to="/register" className={classes.menuItem}>
      Register
    </Link>,
    <Link key="login" to="/login" className={classes.menuItem}>
      Login
    </Link>,
  ];

  if (isAuthenticated) {
    mainMenuItems = getAuthenticatedMenuItems().mainMenuItems;
    accountMenuItems = getAuthenticatedMenuItems().accountMenuItems;
  }

  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Box>
            <Link to="/" className={classes.brandText}>
              Movie Review
            </Link>
          </Box>
          <Box className={classes.mainMenu}>{mainMenuItems}</Box>
          <Box>{accountMenuItems}</Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

TopAppBar.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  currentUserData: PropTypes.any,
  logout: PropTypes.func.isRequired,
};

TopAppBar.defaultProps = {
  currentUserData: null,
};

export default compose(withRouter, withStyles(styles))(TopAppBar);
