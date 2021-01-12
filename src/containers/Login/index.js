import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import { login } from 'containers/App/actions';
import UserForm, { FORM_MODE } from 'components/UserForm';

export default () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.global.currentUser);
  const loginUser = useCallback((payload) => dispatch(login(payload)), [
    dispatch,
  ]);

  return (
    <Box width={540} my={5} mx="auto">
      <UserForm
        mode={FORM_MODE.LOGIN}
        user={currentUser}
        onSubmit={loginUser}
      />
    </Box>
  );
};
