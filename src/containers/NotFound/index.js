import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import styles from 'styles/global';

const NotFound = ({ classes }) => (
  <Card className={classes.card}>
    <CardHeader className={classes.cardHeader} title="Not Found" />
    <CardContent className={classes.cardContent}>
      <h3>Not found what you wanted to see. Try different route.</h3>
    </CardContent>
  </Card>
);

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);
