import {renderElement, RenderPosition} from '../utils/render.js';
import ListView from '../view/events-list.js';
import NoEventMsgView from '../view/no-events.js';
import SortView from '../view/sort.js';
import PointPresenter from './point.js';
import {updateItem} from '../utils/common.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._noEventComponent = new NoEventMsgView();
    this._listPointsComponent = new ListView();
    this._sortComponent = new SortView();
    this._pointPresenter = {};

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(data) {
    this._data = data;

    renderElement(this._tripContainer, this._listPointsComponent, RenderPosition.BEFOREEND);

    this._renderContainer();
  }

  _handlePointChange(updatePoint) {
    this._data = updateItem(this._data, updatePoint);
    this._pointPresenter[updatePoint.id].init(updatePoint);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    renderElement(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(data) {
    const pointPresenter = new PointPresenter(this._listPointsComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(data);
    this._pointPresenter[data.id] = pointPresenter;
  }

  _renderPoints() {
    this._data.forEach((data) => {
      this._renderPoint(data);
    });
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
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
