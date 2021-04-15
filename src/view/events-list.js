import {createElement} from '../util.js';

const createEventsList = () => {
  return `<ul class="trip-events__list">
    </ul>`;
};

export default class ListPoints {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventsList(this._element);
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
