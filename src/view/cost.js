import AbstractView from '../abstract.js';

const getSumMoneyWay = (data) => {
  return data.reduce((acc , item ) => {
    return acc + item.price;
  }, 0);
};

const createCostTemplate = (data) => {

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getSumMoneyWay(data)}</span>
  </p>`;
};

export default class CostElement extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createCostTemplate(this._data);
  }
}

