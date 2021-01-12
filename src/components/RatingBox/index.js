import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Rating from '@material-ui/lab/Rating';

const RatingBox = ({ label, rate, comment }) => (
  <Box component="fieldset" mb={3} borderColor="transparent">
    <Typography component="legend" variant="h6">
      {label}
    </Typography>
    <Tooltip title={rate} placement="top-end" aria-label="rate">
      <Rating name="simple-controlled" value={rate} precision={0.1} readOnly />
    </Tooltip>
    {comment && (
      <Typography variant="body2" gutterBottom>
        {comment}
      </Typography>
    )}
  </Box>
);

RatingBox.propTypes = {
  label: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  comment: PropTypes.string,
};

export default RatingBox;
