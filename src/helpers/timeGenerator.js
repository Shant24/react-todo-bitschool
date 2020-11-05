const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default (value = new Date()) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const monthNumber = date.getMonth() + 1;
  const week = weekDays[date.getDay()];
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  // const pushZeroToStart = (date) => ('0' + date).slice(-2);
  const pushZeroToStart = (date) => (date.length < 10 ? `0${date}` : date);

  return {
    year,
    month,
    monthNumber: pushZeroToStart(monthNumber),
    week,
    day,
    hour: pushZeroToStart(hour),
    minute: pushZeroToStart(minute),
    second: pushZeroToStart(second),
    data: {
      months,
      weekDays,
    },
  };
};
