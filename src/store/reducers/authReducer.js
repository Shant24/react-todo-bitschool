import * as actionTypes from '../types/authTypes';
import { LOADING } from '../types/taskTypes';
import { checkLoginStatus } from '../../helpers/auth';

const defaultState = {
  userInfo: null,
  loading: false,
  errorMessage: null,
  successMessage: null,
  isAuthenticated: checkLoginStatus(),
  isUserEditMode: false,
  isPasswordEditMode: false,
  isContactSanded: false,
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
        successMessage: 'You have successfully registered!!!',
      };

    case actionTypes.LOGIN_SUCCESS:
      return { ...state, loading: false, isAuthenticated: true };

    case actionTypes.LOGOUT_SUCCESS:
      return { ...defaultState, isAuthenticated: false };

    case actionTypes.GET_USER_INFO_SUCCESS:
      return { ...state, loading: false, userInfo: action.userInfo };

    case actionTypes.TOGGLE_USER_EDIT_MODE:
      return {
        ...state,
        isUserEditMode: action.bool,
      };

    case actionTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        isUserEditMode: false,
        userInfo: action.userInfo,
        successMessage: 'Your information is successfully updated!!!',
      };

    case actionTypes.TOGGLE_PASSWORD_EDIT_MODE:
      return {
        ...state,
        isPasswordEditMode: action.bool,
      };

    case actionTypes.UPDATE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isPasswordEditMode: false,
        successMessage: 'Your password is successfully updated!!!',
      };

    case actionTypes.SEND_CONTACT_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        isContactSanded: true,
        successMessage: 'Your message is successfully sent!',
      };

    case actionTypes.RESET_CONTACT_SENDED:
      return { ...state, isContactSanded: false };

    case LOADING:
      return { ...state, errorMessage: null, successMessage: null };

    default:
      return state;
  }
};

export default authReducer;
