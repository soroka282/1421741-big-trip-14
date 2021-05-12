import {remove, renderElement, RenderPosition} from '../utils/render.js';
import {getSortTimeMax, getSortPriceMax} from '../utils/events.js';
import ListView from '../view/events-list.js';
import NoEventMsgView from '../view/no-events.js';
import SortView from '../view/sort.js';
import PointsView from '../view/events.js';
import PointPresenter from './point.js';
import {filter} from '../utils/filters.js';
import {SortType, UserAction, UpdatePoint, FilterType} from '../utils/const.js';
import PointNewPresenter from './point-new.js';

export default class Trip {
  constructor(tripContainer, pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._noEventComponent = new NoEventMsgView();
    this._listPointsComponent = new ListView();
    this._pointComponent = new PointsView();
    this._sortComponent = null;
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortChange = this._handleSortChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._listPointsComponent, this._handleViewAction);
  }

  init() {
    renderElement(this._tripContainer, this._listPointsComponent, RenderPosition.BEFOREEND);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderContainer();
  }

  destroy() {
    this._clearPointList({resetSortType: true});

    remove(this._listPointsComponent);


    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdatePoint.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const point = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](point);

    switch (this._currentSortType) {
      case SortType.DATE_TIME:
        return filteredPoints.sort(getSortTimeMax);
      case SortType.DATE_PRICE:
        return filteredPoints.sort(getSortPriceMax);
    }
    return filteredPoints.sort((currentPoint, nextPoint) => currentPoint.dateFrom - nextPoint.dateFrom);
  }

  _handleViewAction(actionType, updatePoint, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updatePoint, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updatePoint, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updatePoint, update);
        break;
    }
  }

  _handleModelEvent(updatePoint, data) {
    switch (updatePoint) {
      case UpdatePoint.PATCH:

        this._pointPresenter[data.id].init(data);
        break;
      case UpdatePoint.MINOR:
        this._clearPointList();
        this._renderContainer();
        break;
      case UpdatePoint.MAJOR:
        this._clearPointList({resetSortType: true});
        this._renderContainer();
        break;
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPointList();
    this._renderContainer();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortChangeHandler(this._handleSortChange);

    renderElement(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);

  }

  _renderPoint(data) {
    const pointPresenter = new PointPresenter(this._listPointsComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(data);
    this._pointPresenter[data.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => {
      this._renderPoint(point);
    });
  }

  _clearPointList({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderNoPoint() {
    renderElement(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderContainer() {
    const points = this._getPoints();

    if (!points.length) {
      this._renderNoPoint();
      return;
    }

    this._renderSort();
    this._renderPoints(points);
  }
}
