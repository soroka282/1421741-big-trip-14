import dayjs from 'dayjs';

const SECONDS_IN_DAY = 86400000;
const SECONDS_IN_HOURS = 3600000;

export const getTimeFormat = (diff) => {
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

export const getSumPriceFromType = (data) => {
  const dataSortByPrice = data.slice().sort((a, b) => b.price - a.price);

  let res = null;
  res = Object.fromEntries(dataSortByPrice.map((item) => [item.type, 0]));
  dataSortByPrice.forEach((item) => {
    res[item.type] += item.price;
  });
  return res;
};

export const getSumTimeFromType = (data) => {
  const dataSortByTime = data.slice()
    .sort((elem1, elem2) => dayjs(elem2.dateTo).
      diff(dayjs(elem2.dateFrom)) - dayjs(elem1.dateTo).diff(dayjs(elem1.dateFrom)));

  let res = null;
  res = Object.fromEntries(dataSortByTime.map((item) => [item.type, 0]));
  dataSortByTime.forEach((item) => {
    res[item.type] += (item.dateTo - item.dateFrom);
  });
  return res;
};

export const getQuantityType = (data) => {
  let res = null;
  res = Object.fromEntries(data.map((item) => [item.type, 0]));
  data.forEach((item) => {
    res[item.type] += 1;
  });
  return res;
};

export const getSortType = ((val) => {
  return Object.keys(val).sort((a, b) => val[b] - val[a]);
});
