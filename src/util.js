import dayjs from 'dayjs';

// Функция, возвращающая случайное число
const getRandomValue = (min, max) => {
  if (min < 0 || max < 0 || min >= max) {
    throw new Error('Ошибка');
  }
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomArray = (arr) => {
  const results = [];
  results.push(arr.slice(0, Math.ceil(Math.random() * arr.length)));
  return results;
};

const getDateFormat = ((date) => dayjs(date).format('YYYY/MM/DD HH:mm'));
const getDateISO = ((date) => dayjs(date).format('YYYY-MM-DDTHH:mm'));
const getDateHoursMinutes = ((date) => dayjs(date).format('HH:mm'));
const getDateMonthDay = ((date) => dayjs(date).format('MMM DD'));
export {
  getDateFormat,
  getDateISO,
  getDateHoursMinutes,
  getDateMonthDay,
  getRandomValue,
  getRandomArray
};
