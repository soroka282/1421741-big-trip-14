import {getDateMonthDay} from '../util.js';

export const createWayTemplate = (data) => {

  const {name, dateFrom, dateTo} = data;

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${name} &mdash; ${name} &mdash; ${name}</h1>
    <p class="trip-info__dates">${getDateMonthDay(dateFrom)}&nbsp;&mdash;&nbsp;${getDateMonthDay(dateTo)}</p>
  </div>`;
};
