import {getDateFormat} from '../utils/events.js';

import Smart from '../smart.js';
import {CITY, offerExampleStatic, getDescription, getPicture} from '../mock/data.js';

import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

import he from 'he';

import { SET_FLATPICKR } from '../utils/const.js';

const createPictureMarkup = (elem) => {
  if (!elem.photo) {
    return '';
  }
  return elem.photo
    .map((item) => {
      return `<img class="event__photo" src="${item.src}" alt="${item.description}">`;
    })
    .join(' ');
};

const getSelectNameTemplate = (city) => {

  return city.map((name) => `<option value="${name}"></option>`);
};

const offersMarkup = (offer) => {
  return offer ? offer.map((item) => {
    return `<div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="${item.type}-${item.id}" " type="checkbox" name="event-offer-${item.type}"}>
                    <label class="event__offer-label" for="${item.type}-${item.id}">
                      <span class="event__offer-title">${item.offers.title}</span>
                      &plus;&euro;&nbsp;
                      <span class="even__offer-price">${item.offers.price}</span>
                    </label>
                  </div>`;
  }) : '';
};

const editPointTemplate = (data) => {

  const {type = 'transport', offer, name, price, dateFrom, dateTo, destination} = data;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="taxi" ${type.toLowerCase() === 'taxi' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>
                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="bus" ${type.toLowerCase() === 'bus' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>
                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="train" ${type.toLowerCase() === 'train' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>
                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type.toLowerCase() === 'ship' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>
                        <div class="event__type-item">
                          <input id="event-type-transport-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="transport" ${type.toLowerCase() === 'transport' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                        </div>
                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type.toLowerCase() === 'drive' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>
                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="flight" ${type.toLowerCase() === 'flight' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>
                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="check-in" ${type.toLowerCase() === 'check-in' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>
                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="sightseeing" ${type.toLowerCase() === 'sightseeing' ? 'checked' : ''} >
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>
                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="restaurant" ${type.toLowerCase() === 'restaurant' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>

                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" required value="${name ? he.encode(name) : ''}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${getSelectNameTemplate(CITY)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time event-start-time-1" id="event-start-time-1" readonly type="text" name="event-start-time" value="${getDateFormat(dateFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time event-end-time-1" id="event-end-time-1" readonly type="text" name="event-end-time" value="${getDateFormat(dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" required name="event-price" value="${price ? price : ''}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>

                <section class="event__details">

               <section class="event__section  event__section--offers">
               ${(offer ? offer.length : '') ? '<h3 class="event__section-title  event__section-title--offers">Offers</h3>' : ''}
                    <div class="event__available-offers">${offer ? offersMarkup(offer).join('') : ''}</div>
                  </section>

                  ${destination ? `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description ? destination.description : ''}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${destination ? createPictureMarkup(destination) : ''}
                      </div>
                    </div>
                  </section>` : ''}

                </section>
              </form></li>`;

};

export default class PointEdit extends Smart {
  constructor(data) {
    super();
    this._data = PointEdit.parsePointToData(data);
    this._offer = offerExampleStatic;
    this._startDatepicker = null;
    this._endDatepicker = null;
    this._setDate = null;

    this._editFormClickHandler = this._editFormClickHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._closeFormButtonClickHandler = this._closeFormButtonClickHandler.bind(this);

    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._editPointDestinationHandler = this._editPointDestinationHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offersSelectionHandler = this._offersSelectionHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  getTemplate() {
    return editPointTemplate(this._data);
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setEditFormClickHandler(this._callback.editFormClick);
    this.setCloseFormButtonClickHandler(this._callback.closeFormButtonClick);
    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  _setStartDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    this._setDate =  this._data.dateTo;

    this._startDatepicker = flatpickr(
      this.getElement().querySelector('.event-start-time-1'),
      Object.assign(
        {},
        SET_FLATPICKR,
        {
          minDate: Date.now(),
          defaultDate: this._data.dateFrom,
          onChange: this._startDateChangeHandler,
        },
      ),
    );
  }

  _setEndDatepicker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._endDatepicker = flatpickr(
      this.getElement().querySelector('.event-end-time-1'),
      Object.assign(
        {},
        SET_FLATPICKR,
        {
          minDate: this._data.dateFrom,
          onChange: this._endDateChangeHandler,
        },
      ),
    );
  }

  _startDateChangeHandler([userDate]) {

    this.updateData(
      {
        dateFrom: userDate,
      },
      true,
    );

    this._endDatepicker.set('minDate', userDate);
    this._endDatepicker.set('minTime', userDate);

    if(this._setDate <= userDate) {
      this._endDatepicker.setDate(userDate);
      this._setDate = userDate;
      this._data.dateTo = this._setDate;
    }
  }

  _endDateChangeHandler([userDate]) {

    this.updateData(
      {
        dateTo: userDate,
      },
      true,
    );
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('input', this._typeToggleHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._editPointDestinationHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._priceInputHandler);
    this.getElement().querySelector('.event__type-group').addEventListener('input', this._offersSelectionHandler);
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEdit.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
  }

  _editPointDestinationHandler(evt) {
    evt.preventDefault();

    document.querySelectorAll('#destination-list-1 option')
      .forEach((city) => {
        if (city.value !== evt.target.value) {
          evt.target.setCustomValidity('Select a destination from the list');
          evt.target.reportValidity();
        } else {
          this.updateData({
            name: evt.target.value,
            destination: {description: getDescription(), photo: getPicture() },
          });
        }
      });
  }

  _typeToggleHandler(evt) {
    evt.preventDefault();

    this.updateData({
      type: evt.target.value,
    });
  }

  _offersHandler(evt) {
    evt.preventDefault();
    this.updateData({
      name: evt.target.value,
      destination: {description: getDescription(), photo: getPicture()},
    });
  }

  _offersSelectionHandler(evt) {
    evt.preventDefault();

    const offerCopy = JSON.parse(JSON.stringify(this._offer));

    const getFilterOffersForType = () => {
      return offerCopy.filter((elem) => {
        return this._data.type === elem.type.toLowerCase();
      });
    };

    this.updateData({
      offer: getFilterOffersForType(),
    });
  }

  reset(data) {
    this.updateData(PointEdit.parsePointToData(data));
  }

  _priceInputHandler(evt) {
    evt.preventDefault();

    if (evt.target.value < 0) {
      evt.target.setCustomValidity('Must be a positive integer');
      evt.target.reportValidity();
    } else {
      this.updateData({
        price: evt.target.value,
      }, true);
    }
  }

  _editFormClickHandler(evt) {
    evt.preventDefault();
    this._callback.editFormClick(PointEdit.parseDataToPoint(this._data));
  }

  setEditFormClickHandler(callback) {
    this._callback.editFormClick = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._editFormClickHandler);
  }

  _closeFormButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeFormButtonClick();
  }

  setCloseFormButtonClickHandler(callback) {
    this._callback.closeFormButtonClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeFormButtonClickHandler);
  }

  static parsePointToData(data) {
    return Object.assign(
      {},
      data,
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    return data;
  }
}

export {
  editPointTemplate,
  createPictureMarkup
};
