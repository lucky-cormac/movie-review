import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Spinner from 'components/Spinner';
import {
  FORM_MODE,
  FORM_TITLE_MAP,
  AUTH_SCHEMA,
} from './constants';
import styles from 'styles/global';

export * from './constants';

const renderFormContent = ({
  mode,
  classes,
  formInitialValues,
  onSubmit,
  submitting,
}) => {
  const formSchema = AUTH_SCHEMA;
  const submitLabel = mode;

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={formSchema}
      onSubmit={(values) => {
        const { email, password } = values;

        if (mode === FORM_MODE.REGISTER) {
          onSubmit({ email, password, role: 'user' });
        } else if (mode === FORM_MODE.LOGIN) {
          onSubmit({ email, password });
        }
      }}
    >
      {() => (
        <Form>
          <Field name="email">
            {({ field }) => (
              <TextField
                label="Email"
                type="email"
                fullWidth
                className={classes.textField}
                margin="normal"
                {...field}
              />
            )}
          </Field>
          <ErrorMessage
            name="email"
            component="div"
            className={classes.errorControl}
          />
          <Field name="password">
            {({ field }) => (
              <TextField
                label="Password"
                type="password"
                fullWidth
                className={classes.textField}
                margin="normal"
                {...field}
              />
            )}
          </Field>
          <ErrorMessage
            name="password"
            component="div"
            className={classes.errorControl}
          />
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            {submitting && <Spinner />}
            {!submitting && <span>{submitLabel}</span>}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const UserForm = ({ mode, classes, user, onSubmit }) => {
  const { loading: submitting } = user;
  const formInitialValues = { email: '', password: '' };

  return (
    <Box>
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={FORM_TITLE_MAP[mode]}
        />
        <CardContent className={classes.cardContent}>
          {renderFormContent({
            mode,
            classes,
            formInitialValues,
            onSubmit,
            submitting,
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

UserForm.propTypes = {
  mode: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserForm);
