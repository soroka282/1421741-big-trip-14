import Observer from '../utils/observer.js';

export default class Points extends Observer {
  constructor() {
    super();
    this._data = [];
  }

  setPoints(updatePoint, data) {
    this._data = data.slice();

    this._notify(updatePoint);
  }

  getPoints() {
    return this._data;
  }

  updatePoint(updatePoint, update) {
    const index = this._data.findIndex((data) => data.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._data = [
      ...this._data.slice(0, index),
      update,
      ...this._data.slice(index + 1),
    ];

    this._notify(updatePoint, update);
  }

  addPoint(updatePoint, update) {
    this._data = [
      update,
      ...this._data,
    ];

    this._notify(updatePoint, update);
  }

  deletePoint(updatePoint, update) {
    const index = this._data.findIndex((data) => data.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._data = [
      ...this._data.slice(0, index),
      ...this._data.slice(index + 1),
    ];

    this._notify(updatePoint);
  }

  static adaptToClient(point) {
    const adaptedPoint= Object.assign(
      {},
      point,
      {
        dateFrom: point.date_from !== null ? new Date(point.date_from) : point.date_from,
        dateTo: point.date_to !== null ? new Date(point.date_to) : point.date_to,
        price: point.base_price,
        favorite: point.is_favorite,
        id: point.id,
      },
    );

    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.base_price;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        date_from: point.dateFrom instanceof Date ? point.dateFrom.toISOString() : new Date(),
        date_to: point.dateTo instanceof Date ? point.dateTo.toISOString() : new Date(),
        is_favorite: point.favorite ? point.favorite : false,
        base_price: point.price,
        id: point.id,
        type: point.type ? point.type : 'transport',
        offers: point.offers ? point.offers : [],
      },
    );

    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.favorite;
    delete adaptedPoint.price;

    return adaptedPoint;
  }
}
