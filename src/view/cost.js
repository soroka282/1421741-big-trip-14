import {createElement} from '../util.js';

const getSumMoneyWay = (data) => {
  const money = data.map((event) => {
    return event.price;
  });
  return money.reduce((a, b) => {
    return a + b;
  });
};

const createCostTemplate = (data) => {

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getSumMoneyWay(data)}</span>
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

