import request from '../../helpers/request';
import * as actionTypes from '../types/authTypes';
import {
  getJWT,
  saveJWT,
  removeJWT,
  loginRequest,
  registerRequest,
  contactRequest,
} from '../../helpers/auth';
import history from '../../helpers/history';
import sendFeedbackToEmail from '../../helpers/sendFeedbackToEmail';

let apiUrl = process.env.REACT_APP_API_URL;
if (process.env.NODE_ENV === 'development') {
  apiUrl = `http://${window.location.hostname}:3001`;
}

export const register = (data) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_LOADING });

  registerRequest(data)
    .then(() => {
      dispatch({ type: actionTypes.REGISTER_SUCCESS });
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

export const logout = () => async (dispatch) => {
  dispatch({ type: actionTypes.AUTH_LOADING });

  const jwt = await getJWT();

  if (jwt) {
    request(`${apiUrl}/user/sign-out`, 'POST', { jwt })
      .then(() => {
        removeJWT();
        dispatch({ type: actionTypes.LOGOUT_SUCCESS });
        history.push('/login');
      })
      .catch((err) =>
        dispatch({ type: actionTypes.AUTH_ERROR, error: err.message })
      );
  } else {
    dispatch({ type: actionTypes.LOGOUT_SUCCESS });
    history.push('/login');
  }
};

export const getUserInfo = () => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_LOADING });

  request(`${apiUrl}/user`)
    .then((userInfo) => {
      dispatch({ type: actionTypes.GET_USER_INFO_SUCCESS, userInfo });
    })
    .catch((err) =>
      dispatch({ type: actionTypes.AUTH_ERROR, error: err.message })
    );
};

export const userIsEditMode = (bool) => (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_USER_EDIT_MODE, bool });
};

export const updateUserInfo = (name, surname) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_LOADING });

  request(`${apiUrl}/user`, 'PUT', { name, surname })
    .then((userInfo) => {
      dispatch({ type: actionTypes.UPDATE_USER_INFO_SUCCESS, userInfo });
    })
    .catch((err) =>
      dispatch({ type: actionTypes.AUTH_ERROR, error: err.message })
    );
};

export const passwordIsEditMode = (bool) => (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_PASSWORD_EDIT_MODE, bool });
};

export const updateUserPassword = (data) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_LOADING });

  request(`${apiUrl}/user/password`, 'PUT', data)
    .then(() => dispatch({ type: actionTypes.UPDATE_USER_PASSWORD_SUCCESS }))
    .catch((err) =>
      dispatch({ type: actionTypes.AUTH_ERROR, error: err.message })
    );
};

export const sendContactForm = (data) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_LOADING });

  contactRequest(data)
    .then(async () => {
      try {
        if (
          process.env.REACT_APP_YOUR_NAME_FOR_EMAIL_TEMPLATE &&
          process.env.REACT_APP_EMAIL_SERVICE_ID &&
          process.env.REACT_APP_EMAIL_TEMPLATE_ID &&
          process.env.REACT_APP_EMAIL_USER_ID
        ) {
          await sendFeedbackToEmail(data);
          dispatch({ type: actionTypes.SEND_CONTACT_FORM_SUCCESS });
        } else {
          dispatch({ type: actionTypes.SEND_CONTACT_FORM_SUCCESS });
        }
      } catch (err) {
        const errText = { message: err.text || 'Failed to fetch!' };
        throw errText;
      }
    })
    .catch((err) =>
      dispatch({ type: actionTypes.AUTH_ERROR, error: err.message })
    );
};

export const resetContactSended = () => (dispatch) => {
  dispatch({ type: actionTypes.RESET_CONTACT_SENDED });
};
