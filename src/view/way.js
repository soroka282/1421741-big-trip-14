import {getDateMonthDay, createElement} from '../util.js';

const createWayTemplate = (data) => {

  const {name, dateFrom, dateTo} = data;

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${name} &mdash; ${name} &mdash; ${name}</h1>
    <p class="trip-info__dates">${getDateMonthDay(dateFrom)}&nbsp;&mdash;&nbsp;${getDateMonthDay(dateTo)}</p>
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
