import dayjs from 'dayjs';

const MILLISECONDS_IN_DAY = 86400000;
const MILLISECONDS_IN_HOURS = 3600000;

const getDateFormat = ((date) => dayjs(date).format('YYYY/MM/DD HH:mm'));
const getDateISO = ((date) => dayjs(date).format('YYYY-MM-DDTHH:mm'));
const getDateHoursMinutes = ((date) => dayjs(date).format('HH:mm'));
const getDateMonthDay = ((date) => dayjs(date).format('MMM DD'));

const getDiffDate = (dateTo, dateFrom) => {
  const diff = dateTo - dateFrom;
  if (diff <= MILLISECONDS_IN_DAY) {
    return dayjs(diff).format('hh') + 'H ' + dayjs(diff).format('mm') + 'M';
  } if (diff > MILLISECONDS_IN_DAY) {
    return dayjs(diff).format('DD') + 'D ' + dayjs(diff).format('DD') + 'H ' + dayjs(diff).format('mm') + 'M';
  } if (diff <= MILLISECONDS_IN_HOURS) {
    return dayjs(diff).format('mm') + 'M';
  }
};

const getMarkupIsElemHave = (elem, markup) => {
  return elem.length ? markup : '';
};

export {
  getDateFormat,
  getDateISO,
  getDateHoursMinutes,
  getDateMonthDay,
  getDiffDate,
  getMarkupIsElemHave
};
