import {renderElement, RenderPosition} from '../utils/render.js';
import ListView from '../view/events-list.js';
import NoEventMsgView from '../view/no-events.js';
import SortView from '../view/sort.js';
import PointPresenter from './point.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._noEventComponent = new NoEventMsgView();
    this._listPointsComponent = new ListView();
    this._sortComponent = new SortView();
  }

  init(data) {
    this._data = data;

    renderElement(this._tripContainer, this._listPointsComponent, RenderPosition.BEFOREEND);

    this._renderContainer();
  }

  _renderSort() {
    renderElement(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(data) {
    const pointPresenter = new PointPresenter(this._listPointsComponent);
    pointPresenter.init(data);
  }

  _renderPoints() {
    this._data.forEach((data) => {
      this._renderPoint(data);
    });
  }

  _renderNoPoint() {
    renderElement(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderTripList() {
    this._renderPoints();
  }

  _renderContainer() {
    this._renderSort();

    if(this._data.length == 0) {
      this._renderNoPoint();
      return;
    }

    this._renderTripList();
  }
}
