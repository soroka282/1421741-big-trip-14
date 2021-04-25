import dayjs from 'dayjs';

const SECONDS_IN_DAY = 86400000;
const SECONDS_IN_HOURS = 3600000;

const SortType = {
  DEFAULT: 'default',
  PRICE: 'price',
  TIME: 'time',
};

const getDateFormat = ((date) => dayjs(date).format('YYYY/MM/DD HH:mm'));
const getDateISO = ((date) => dayjs(date).format('YYYY-MM-DDTHH:mm'));
const getDateHoursMinutes = ((date) => dayjs(date).format('HH:mm'));
const getDateMonthDay = ((date) => dayjs(date).format('MMM DD'));

const getDiffDate = (dateTo, dateFrom) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));
  if (diff === 0) {
    return '';
  } if (diff > SECONDS_IN_DAY) {
    return dayjs(diff).format('DD') + 'D ' + dayjs(diff).format('hh') + 'H ' + dayjs(diff).format('mm') + 'M';
  } if (diff <= SECONDS_IN_HOURS) {
    return dayjs(diff).format('mm') + 'M';
  } if (diff <= SECONDS_IN_DAY) {
    return dayjs(diff).format('hh') + 'H ' + dayjs(diff).format('mm') + 'M';
  }
};

const getMarkupIsElemHave = (elem, markup) => {
  return elem.length ? markup : '';
};

const getSortTimeMax = (elem1, elem2) => {
  return dayjs(elem2.dateTo).diff(dayjs(elem2.dateFrom)) - dayjs(elem1.dateTo).diff(dayjs(elem1.dateFrom));
};

const getSortPriceMax = (elem1, elem2) => {
  return elem2.price - elem1.price;
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
  SortType
};
