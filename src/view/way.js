import {getDateMonthDay} from '../utils/events.js';
import AbstractView from '../abstract.js';

const getWayInfo = (data) => {
  const way = Array.from(new Set(data.map((event) => {
    return event.name;
  })));
  if (way.length > 3) {
    return `${way[0]} &mdash; ... &mdash; ${way[way.length -1]}`;
  } else {
    return way.join('&mdash;');
  }
};

const getTimeFromWay = (data) => {
  const time = data.map((event) => {
    return event.dateFrom;
  });
  return time[0];
};

const getTimeToWay = (data) => {
  const time = data.map((event) => {
    return event.dateTo;
  });
  return time[time.length -1];
};

const createWayTemplate = (data) => {

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${getWayInfo(data)}</h1>
    <p class="trip-info__dates">${getDateMonthDay(getTimeFromWay(data))}&nbsp;&mdash;&nbsp;${getDateMonthDay(getTimeToWay(data))}</p>
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
