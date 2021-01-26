export const formatDate = (date = '', length = 0) => {
  return date.slice(0, length).split('-').reverse().join('.');
};

export const shortStr = (str = '', length = 0) => {
  return length >= str.length || !length ? str : str.slice(0, length) + '...';
};

export const uppercaseFirstLetter = (str) => {
  return str
    ? str
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';
};
