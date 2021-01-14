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

export const checkLoginStatus = () => {
  const token = localStorage.getItem('token');

  return !!token;
};
