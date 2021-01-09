import request from '../../helpers/request';
import * as actionTypes from '../types/authTypes';
import { isMobile } from 'react-device-detect';

let apiUrl = process.env.REACT_APP_API_URL;

if (process.env.NODE_ENV === 'development' && isMobile) {
  apiUrl = process.env.REACT_APP_API_MOBILE_URL;
}

export const register = (data) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_LOADING });

  request(`${apiUrl}/user`, 'POST', data)
    .then((userId) => {
      dispatch({ type: actionTypes.REGISTER_SUCCESS, userId: userId._id });
    })
    .catch((err) =>
      dispatch({ type: actionTypes.AUTH_ERROR, error: err.message })
    );
};

export const reset = () => (dispatch) => {
  dispatch({ type: actionTypes.RESET_REGISTER_SUCCESS });
};
