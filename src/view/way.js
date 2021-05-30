import {getDateMonthDay} from '../utils/events.js';
import AbstractView from '../abstract.js';

const getWayInfo = (data) => {
  const ways = Array.from(new Set(data.map((event) => {
    return event.destination.name;
  })));
  if (ways.length > 3) {
    return `${ways[0]} &mdash; ... &mdash; ${ways[ways.length -1]}`;
  } else {
    return ways.join('&mdash;');
  }
};

const getTimeFromWay = (data) => {
  const dates = data.map((event) => {
    return event.dateFrom;
  });
  return dates[0];
};

const getTimeToWay = (data) => {
  const dates = data.map((event) => {
    return event.dateTo;
  });
  return dates[dates.length -1];
};

const createWayTemplate = (data) => {
  const dataSort = data.sort((el1, el2) => el1.dateFrom - el2.dateFrom);
  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${getWayInfo(dataSort)}</h1>
    <p class="trip-info__dates">${getDateMonthDay(getTimeFromWay(dataSort))}&nbsp;&mdash;&nbsp;${getDateMonthDay(getTimeToWay(dataSort))}</p>
  </div>`;
};

export default class WayPoint extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createWayTemplate(this._data);
  }
}
