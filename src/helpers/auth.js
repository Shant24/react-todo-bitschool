import decode from 'jwt-decode';
import store from '../store/store';
import history from './history';
import { LOGOUT_SUCCESS } from '../store/types/authTypes';

let apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
if (process.env.NODE_ENV === 'development') {
  const PORT = apiUrl.split(':').slice(-1)[0];
  apiUrl = `http://${window.location.hostname}:${PORT}`;
}

export const saveJWT = (data) => {
  localStorage.setItem('token', JSON.stringify(data));
};

export const removeJWT = () => {
  localStorage.removeItem('token');
};

export const getJWT = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    logout();
    return null;
  }

  const parsedToken = JSON.parse(token);

  const decodedToken = decode(parsedToken.jwt);

  if (decodedToken.exp - Date.now() / 1000 < 60) {
    return fetch(`${apiUrl}/user/${decodedToken.userId}/token`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: parsedToken.refreshToken }),
    })
      .then((res) => res.json())
      .then((newToken) => {
        if (newToken.error) throw newToken.error;

        saveJWT(newToken);

        return newToken.jwt;
      })
      .catch(() => {
        logout();
        return null;
      });
  }

  return Promise.resolve(parsedToken.jwt);
};

export const checkLoginStatus = () => !!localStorage.getItem('token');

export const loginRequest = (data) => request(data, 'login');

export const registerRequest = (data) => request(data, 'register');

export const contactRequest = (data) => request(data, 'contact');

function request(data, type) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  let url;
  type === 'login' && (url = `${apiUrl}/user/sign-in`);
  type === 'register' && (url = `${apiUrl}/user`);
  type === 'contact' && (url = `${apiUrl}/form`);

  return fetch(url, config)
    .then((response) => response.json())
    .then((result) => {
      if (result.error) throw result.error;

      return result;
    });
}

function logout() {
  removeJWT();
  store.dispatch({ type: LOGOUT_SUCCESS });
  history.push('/login');
}
