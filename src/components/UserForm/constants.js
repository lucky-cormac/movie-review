import * as Yup from 'yup';

export const FORM_MODE = {
  REGISTER: 'register',
  LOGIN: 'login',
};

export const FORM_TITLE_MAP = {
  [FORM_MODE.REGISTER]: 'Register',
  [FORM_MODE.LOGIN]: 'Login',
};

const authShape = {
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
};

export const AUTH_SCHEMA = Yup.object().shape(authShape);
