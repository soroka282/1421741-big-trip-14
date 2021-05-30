import FilterView from '../view/filter.js';
import {renderElement, RenderPosition, replace, remove} from '../utils/render.js';
import {filter} from '../utils/filters.js';
import {FilterType, UpdatePoint} from '../utils/const.js';

export default class Filter {
  constructor(filterContainer, filterModel, pointModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointModel = pointModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._pointModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._get();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.get());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      renderElement(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.get() === filterType) {
      return;
    }

    this._filterModel.set(UpdatePoint.MAJOR, filterType);
  }

  _get() {
    const point = this._pointModel.get();

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'EVERYTHING',
        count: filter[FilterType.EVERYTHING](point).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'FUTURE',
        count: filter[FilterType.FUTURE](point).length,
      },
      {
        type: FilterType.PAST,
        name: 'PAST',
        count: filter[FilterType.PAST](point).length,
      },
    ];
  }
}
