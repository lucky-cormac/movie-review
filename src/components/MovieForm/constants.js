import * as Yup from 'yup';

export const FORM_MODE = {
  CREATE: 'create',
  EDIT: 'edit',
};

const movieShape = {
  title: Yup.string().required('Required'),
  plot: Yup.string().required('Required'),
  castAndCrew: Yup.string().required('Required'),
  genre: Yup.string().required('Required'),
  releaseDate: Yup.date().required('Required'),
  language: Yup.string().required('Required'),
};

export const MOVIE_SCHEMA = Yup.object().shape(movieShape);
