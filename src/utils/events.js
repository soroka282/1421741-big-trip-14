import dayjs from 'dayjs';

const MINUTES_IN_HOURS = 60;
const HOURS = 24;

export const getTimeFormat = (time) => {
  const day = Math.floor(time / MINUTES_IN_HOURS / HOURS);
  const hour = Math.floor((time - day * HOURS * MINUTES_IN_HOURS) / MINUTES_IN_HOURS);
  const minute = time % MINUTES_IN_HOURS;

  if (day) {
    return `${day}D ${hour ? hour : '00'}H ${minute ? minute : '00'}M`;
  }

  if (hour) {
    return `${hour}H ${minute ? minute : '00'}M`;
  }

  if (minute) {
    return `${minute}M`;
  }

  return '00M';
};

const getDateFormat = ((date) => dayjs(date).format('YYYY/MM/DD HH:mm'));
const getDateISO = ((date) => dayjs(date).format('YYYY-MM-DDTHH:mm'));
const getDateHoursMinutes = ((date) => dayjs(date).format('HH:mm'));
const getDateMonthDay = ((date) => dayjs(date).format('MMM DD'));

const getDiffDate = (dateTo, dateFrom) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));
  return diff;
};

const getMarkupIsElemHave = (elem, markup) => {
  return elem ? markup : '';
};

const getSortTimeMax = (elem1, elem2) => {
  return dayjs(elem2.dateTo).diff(dayjs(elem2.dateFrom)) - dayjs(elem1.dateTo).diff(dayjs(elem1.dateFrom));
};

const getSortPriceMax = (elem1, elem2) => {
  return elem2.price - elem1.price;
};

const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');
};

export {
  getDateFormat,
  getDateISO,
  getDateHoursMinutes,
  getDateMonthDay,
  getDiffDate,
  getMarkupIsElemHave,
  getSortTimeMax,
  getSortPriceMax,
  isDatesEqual
};
