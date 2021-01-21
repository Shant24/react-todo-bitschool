import * as actionTypes from '../types/authTypes';
import { LOADING } from '../types/taskTypes';
import { checkLoginStatus } from '../../helpers/auth';

const defaultState = {
  userInfo: null,
  loading: false,
  errorMessage: null,
  successMessage: null,
  isAuthenticated: checkLoginStatus(),
  isUserModalOpen: false,
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

    case actionTypes.TOGGLE_USER_SETTINGS_MODAL:
      return { ...state, isUserModalOpen: !state.isUserModalOpen };

    case actionTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        isUserModalOpen: false,
        userInfo: action.userInfo,
        successMessage: 'Your information is successfully updated!!!',
      };

    case LOADING:
      return { ...state, errorMessage: null, successMessage: null };

    default:
      return state;
  }
};

export default authReducer;
