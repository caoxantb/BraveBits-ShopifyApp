const dateParse = (str: string) => {
  const year = parseInt(str.substring(0, 4));
  const month = parseInt(str.substring(5, 7)) - 1;
  const day = parseInt(str.substring(8, 10));
  const hour = parseInt(str.substring(11, 13));
  const minutes = parseInt(str.substring(14, 16));

  const date = new Date(year, month, day);
  const dateStr = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const fullDateStr = `${hour % 12}:${minutes < 10 ? "0" : ""}${minutes} ${
    hour >= 12 ? "pm" : "am"
  }, ${dateStr}`;

  return fullDateStr;
};

export default dateParse;
