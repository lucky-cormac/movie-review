import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import { register } from 'containers/App/actions';
import UserForm, { FORM_MODE } from 'components/UserForm';

export default () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.global.currentUser);
  const registerUser = useCallback((payload) => dispatch(register(payload)), [
    dispatch,
  ]);

  return (
    <Box width={540} my={5} mx="auto">
      <UserForm
        mode={FORM_MODE.REGISTER}
        user={currentUser}
        onSubmit={registerUser}
      />
    </Box>
  );
};
