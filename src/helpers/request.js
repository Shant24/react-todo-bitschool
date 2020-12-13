const request = (url, method = 'GET', body) => {
  const config = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
