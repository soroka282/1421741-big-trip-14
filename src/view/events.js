import {
  getDateISO,
  getDateMonthDay,
  getDateHoursMinutes,
  getDiffDate,
  createElement
} from '../util.js';


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

export default class Point {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createEventsTemplate(this._data);
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
