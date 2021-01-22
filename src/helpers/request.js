import { getJWT } from './auth';
import { defaultError } from './errors';

const request = async (url, method = 'GET', body) => {
  const jwt = await getJWT();

  if (!jwt) return Promise.reject(defaultError);

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };

  body && (config.body = JSON.stringify(body));

  return fetch(url, config)
    .then((response) => response.json())
    .then((result) => {
      if (result.error) throw result.error;

      return result;
    });
};

export default request;

export const requestWithoutToken = (url, method = 'GET', body) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  return fetch(url, config)
    .then((response) => response.json())
    .then((result) => {
      if (result.error) throw result.error;

      return result;
    });
};
