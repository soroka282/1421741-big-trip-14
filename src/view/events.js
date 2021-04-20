import {
  getDateISO,
  getDateMonthDay,
  getDateHoursMinutes,
  getDiffDate
} from '../utils/events.js';

import AbstractView from '../abstract.js';

const createOfferMarkup = (offer) => {
  return `
  <li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>
  `;
};

const createEventsTemplate = (data) => {
  const {type, name, price, dateFrom, dateTo, offer, favorite} = data;

  const offersMarkup = offer.map((item) => createOfferMarkup(item)).join(' ');

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime=${getDateISO(dateFrom)}>${getDateMonthDay(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${getDateISO(dateFrom)}>${getDateHoursMinutes(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime=${getDateISO(dateTo)}>${getDateHoursMinutes(dateTo)}</time>
        </p>
        <p class="event__duration">${getDiffDate(dateTo, dateFrom)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${offersMarkup}
      </ul>
      <button class="event__favorite-btn ${favorite ? 'event__favorite-btn--active' : ''} " type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn event__favorite-btn--active" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div></li>`;
};

export default class Point extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._editFavoriteClickHandler = this._editFavoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createEventsTemplate(this._data);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  _editFavoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.editFavoriteClick();
  }

  setEditFavoriteClickHandler(callback) {
    this._callback.editFavoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._editFavoriteClickHandler);
  }
}
