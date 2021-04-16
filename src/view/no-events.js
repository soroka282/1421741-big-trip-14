import {createElement} from '../util.js';

const createMsgTemplate = () => {
  return `<p class="trip-events__msg">
  Click New Event to create your first point
  </p>`;
};

export default class NoEventMsg {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMsgTemplate();
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
