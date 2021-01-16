import request from '../../helpers/request';
import * as actionTypes from '../types/authTypes';
import { isMobile } from 'react-device-detect';
import {
  getJWT,
  saveJWT,
  removeJWT,
  loginRequest,
  registerRequest,
} from '../../helpers/auth';
import history from '../../helpers/history';

let apiUrl = process.env.REACT_APP_API_URL;

if (process.env.NODE_ENV === 'development' && isMobile) {
  apiUrl = process.env.REACT_APP_API_MOBILE_URL;
}

export const register = (data) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_LOADING });

  registerRequest(data)
    .then((userId) => {
      dispatch({ type: actionTypes.REGISTER_SUCCESS, userId: userId._id });
      history.push('/login');
    })
    .catch((err) =>
      dispatch({ type: actionTypes.AUTH_ERROR, error: err.message })
    );
};

export const login = (data) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_LOADING });

  loginRequest(data)
    .then((token) => {
      if (token.message) throw token;

      saveJWT(token);
      dispatch({ type: actionTypes.LOGIN_SUCCESS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_LOADING });

  request(`${apiUrl}/user/sign-out`, 'POST', { jwt: getJWT() })
    .then(() => {
      removeJWT();
      dispatch({ type: actionTypes.LOGOUT_SUCCESS });
      history.push('/login');
    })
    .catch((err) =>
      dispatch({ type: actionTypes.AUTH_ERROR, error: err.message })
    );
};
