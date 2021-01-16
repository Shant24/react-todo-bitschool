import { isMobile } from 'react-device-detect';

export const saveJWT = (data) => {
  localStorage.setItem('token', JSON.stringify(data));
};

export const removeJWT = () => {
  localStorage.removeItem('token');
};

export const getJWT = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // throw error
  }

  return JSON.parse(token).jwt;
};

export const checkLoginStatus = () => !!localStorage.getItem('token');

export const loginRequest = (data) => request(data, 'login');

export const registerRequest = (data) => request(data);

function request(data, type) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  let apiUrl = process.env.REACT_APP_API_URL;
  if (process.env.NODE_ENV === 'development' && isMobile) {
    apiUrl = process.env.REACT_APP_API_MOBILE_URL;
  }

  const url = `${apiUrl}/user${type === 'login' ? '/sign-in' : ''}`;

  return fetch(url, config)
    .then((response) => response.json())
    .then((result) => {
      if (result.error) throw result.error;

      return result;
    });
}
