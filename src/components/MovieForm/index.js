import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import Spinner from 'components/Spinner';
import styles from 'styles/global';
import { FORM_MODE, MOVIE_SCHEMA } from './constants';

export * from './constants';

const MovieForm = ({
  mode,
  classes,
  title,
  isEditable,
  movie,
  onSubmit,
}) => {
  const { loading: submitting, data } = movie;
  const formInitialValues = {
    title: '',
    plot: '',
    castAndCrew: '',
    genre: '',
    releaseDate: new Date(),
    rate: 0,
    ...(mode === FORM_MODE.CREATE ? {} : data),
  };

  return (
    <Box>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title={title} />
        <CardContent className={classes.cardContent}>
          <Formik
            initialValues={formInitialValues}
            validationSchema={MOVIE_SCHEMA}
            onSubmit={(values) => {
              if (mode === FORM_MODE.CREATE) {
                onSubmit(values);
              } else {
                onSubmit({ _id: data._id, ...values });
              }
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className={!isEditable ? classes.readOnly : null}>
                <Field name="title">
                  {({ field }) => (
                    <TextField
                      label="Title"
                      type="text"
                      fullWidth
                      className={classes.textField}
                      InputProps={{
                        readOnly: !isEditable ? true : false,
                      }}
                      margin="normal"
                      {...field}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="title"
                  component="div"
                  className={classes.errorControl}
                />
                <Field name="plot">
                  {({ field }) => (
                    <TextField
                      label="Plot"
                      type="text"
                      fullWidth
                      className={classes.textField}
                      InputProps={{
                        readOnly: !isEditable ? true : false,
                      }}
                      margin="normal"
                      {...field}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="plot"
                  component="div"
                  className={classes.errorControl}
                />
                <Field name="castAndCrew">
                  {({ field }) => (
                    <TextField
                      label="Cast and Crew"
                      type="text"
                      fullWidth
                      className={classes.textField}
                      InputProps={{
                        readOnly: !isEditable ? true : false,
                      }}
                      margin="normal"
                      {...field}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="castAndCrew"
                  component="div"
                  className={classes.errorControl}
                />
                <Field name="genre">
                  {({ field }) => (
                    <TextField
                      label="Genre"
                      type="text"
                      fullWidth
                      className={classes.textField}
                      InputProps={{
                        readOnly: !isEditable ? true : false,
                      }}
                      margin="normal"
                      {...field}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="genre"
                  component="div"
                  className={classes.errorControl}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Box>
                    <Field name="releaseDate">
                      {() => (
                        <KeyboardDatePicker
                          inputProps={{
                            readOnly: !isEditable,
                          }}
                          margin="normal"
                          label="Release Date"
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          value={values.releaseDate}
                          className={classes.datePicker}
                          onChange={(date) => {
                            setFieldValue('releaseDate', date);
                          }}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="releaseDate"
                      component="div"
                      className={classes.errorControl}
                    />
                  </Box>
                </MuiPickersUtilsProvider>
                <Field name="language">
                  {({ field }) => (
                    <TextField
                      label="Language"
                      type="text"
                      fullWidth
                      className={classes.textField}
                      InputProps={{
                        readOnly: !isEditable ? true : false,
                      }}
                      margin="normal"
                      {...field}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="language"
                  component="div"
                  className={classes.errorControl}
                />
                <Box display="flex" alignItems="center" mt={2}>
                  <Box flex={1} pr={1}>
                    <Typography
                      component="label"
                      className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled"
                    >
                      Rate
                    </Typography>
                    <Field name="rate">
                      {({ field }) => (
                        <Rating
                          margin="normal"
                          {...field}
                          onChange={(evt, rate) => {
                            setFieldValue('rate', rate);
                          }}
                        />
                      )}
                    </Field>
                  </Box>
                </Box>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting}
                >
                  {submitting && <Spinner />}
                  {!submitting && <span>Save</span>}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

MovieForm.propTypes = {
  mode: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  isEditable: PropTypes.bool,
  movie: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(MovieForm);
