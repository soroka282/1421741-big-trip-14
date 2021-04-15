import {getDateMonthDay, createElement} from '../util.js';

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

export default class WayPoint {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createWayTemplate(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
