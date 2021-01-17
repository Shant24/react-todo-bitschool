import { getJWT } from './auth';

const request = (url, method = 'GET', body) => {
  const jwt = getJWT();

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
