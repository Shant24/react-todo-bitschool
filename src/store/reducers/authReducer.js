import { checkLoginStatus } from '../../helpers/auth';
import * as actionTypes from '../types/authTypes';

const defaultState = {
  loading: false,
  errorMessage: null,
  successMessage: null,
  registerSuccess: false,
  isAuthenticated: checkLoginStatus(),
  userId: null,
  user: {
    name: 'Shant',
    surname: 'Sargsyan',
    avatar:
      'https://scontent.fevn1-4.fna.fbcdn.net/v/t1.0-1/c16.71.256.256a/p320x320/93404452_2966084290148011_477263264217038848_o.jpg?_nc_cat=106&ccb=2&_nc_sid=7206a8&_nc_ohc=LEhnmAyYXq0AX83jbou&_nc_ht=scontent.fevn1-4.fna&tp=27&oh=bc5fc5cdb93f8a3fea7e4ddfa5b6cef7&oe=6024FB6E',
  },
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOADING:
      return {
        ...state,
        loading: true,
        errorMessage: null,
        successMessage: null,
      };

    case actionTypes.AUTH_ERROR:
      return { ...state, errorMessage: action.error, loading: false };

    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registerSuccess: true,
        userId: action.userId,
        successMessage: 'You have successfully registered!!!',
      };

    case actionTypes.RESET_REGISTER_SUCCESS:
      return { ...state, registerSuccess: false };

    case actionTypes.LOGIN_SUCCESS:
      return { ...state, loading: false, isAuthenticated: true };

    case actionTypes.LOGOUT_SUCCESS:
      return { ...state, loading: false, isAuthenticated: false };

    default:
      return state;
  }
};

export default authReducer;
