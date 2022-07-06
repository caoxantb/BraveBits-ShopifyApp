const toDate = (str) => {
  const year = parseInt(str.substring(0, 4));
  const month = parseInt(str.substring(5, 7)) - 1;
  const day = parseInt(str.substring(8, 10));
  const hour = parseInt(str.substring(11, 13));
  const minutes = parseInt(str.substring(14, 16));
  const seconds = parseInt(str.substring(17, 19));

  const date = new Date(year, month, day, hour, minutes, seconds);

  return date;
};

export default toDate;
