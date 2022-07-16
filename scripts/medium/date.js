const monthNames = [
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

/**
 * Given a date object, return a formatted string
 * like July 11, 2022.
 *
 * @param {Date} date
 * @returns {string}
 */
const getFormattedDate = (date) => {
  let month = date.getMonth();
  month = monthNames[month];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

module.exports = {
  getFormattedDate,
};
