import { remove, renderElement, RenderPosition, replace } from '../utils/render.js';
import Way from '../view/way.js';

export default class WayPresenter {
  constructor(wayContainer, pointsModel) {
    this._wayContainer = wayContainer;
    this._pointsModel = pointsModel;
    this._points = null;
    this._wayComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const prevWayComponent = this._wayComponent;
    this._points = this._pointsModel.getPoints();

    this._wayComponent = new Way(this._points);

    if (prevWayComponent === null) {
      renderElement(this._wayContainer, this._wayComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._wayComponent, prevWayComponent);
    remove(prevWayComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
