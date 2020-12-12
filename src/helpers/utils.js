export const formatDate = (date = '', length = 0) => date.slice(0, length);

export const shortStr = (str = '', length = 0) => {
  return length >= str.length || !length ? str : str.slice(0, length) + '...';
};
