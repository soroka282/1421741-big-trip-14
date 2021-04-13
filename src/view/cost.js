import {createElement} from '../util.js';

const createCostTemplate = (data) => {

  const {price} = data;

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>`;
};

export default class CostElement {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createCostTemplate(this._data);
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

