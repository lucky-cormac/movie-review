import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  AUTH_TOKEN_ERROR,
  FETCH_ROLES,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_ERROR,
} from './constants';

import {
  getTokenInStorage,
  getUserInStorage,
  saveTokenInStorage,
  saveUserInStorage,
  deleteTokenInStorage,
  deleteUserInStorage,
} from 'utils/auth';

const initialState = {
  isAuthenticated: getTokenInStorage() ? true : false,
  roles: {
    loading: null,
    error: null,
    data: null,
  },
  currentUser: {
    loading: null,
    error: null,
    data: getUserInStorage(),
  },
};

function appReducer(state = initialState, action) {
  const { error, roles, token, user } = action.payload || {};

  switch (action.type) {
    case AUTH_TOKEN_ERROR:
    case LOGOUT:
      deleteTokenInStorage();
      deleteUserInStorage();

      return {
        ...state,
        isAuthenticated: false,
        currentUser: {
          loading: null,
          error: null,
          data: null,
        },
      };
    case FETCH_ROLES:
      return {
        ...state,
        roles: {
          loading: true,
          error: false,
          data: false,
        },
      };
    case FETCH_ROLES_SUCCESS:
      return {
        ...state,
        roles: {
          loading: false,
          error: false,
          data: roles,
        },
      };
    case FETCH_ROLES_ERROR:
      return {
        ...state,
        roles: {
          loading: false,
          error,
          data: false,
        },
      };
    case REGISTER:
    case LOGIN:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {
          loading: true,
          error: false,
          data: false,
        },
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      saveTokenInStorage(token);
      saveUserInStorage(user);

      return {
        ...state,
        isAuthenticated: true,
        currentUser: {
          loading: false,
          error: false,
          data: user,
        },
      };
    case REGISTER_ERROR:
    case LOGIN_ERROR:
      deleteTokenInStorage();
      deleteUserInStorage();

      return {
        ...state,
        isAuthenticated: false,
        currentUser: {
          loading: false,
          error,
          data: false,
        },
      };
    default:
      return state;
  }
}

export default appReducer;
