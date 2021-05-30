import { remove, renderElement, RenderPosition, replace } from '../utils/render.js';
import Cost from '../view/cost.js';

export default class CostPresenter {
  constructor(costContainer, pointsModel) {
    this._costContainer = costContainer;
    this._pointsModel = pointsModel;
    this._points = null;
    this._costComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const prevCostComponent = this._costComponent;

    this._points = this._pointsModel.get();
    this._costComponent = new Cost(this._points);

    if (prevCostComponent === null) {
      renderElement(this._costContainer, this._costComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._costComponent, prevCostComponent);
    remove(prevCostComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
