import SiteMenuView from './view/menu.js';
import WayPointView from './view/way.js';
import CostElementView from './view/cost.js';
import FilterModel from './model/filter.js';

import {data} from './mock/data.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import {renderElement, RenderPosition} from './utils/render.js';

import PointsModel from './model/points.js';

const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripInfo = document.querySelector('.trip-info');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

//Отрисовка меню
renderElement(tripControlsNavigation, new SiteMenuView(), RenderPosition.BEFOREEND);

//Отрисовка марштрута
renderElement(tripInfo, new WayPointView(data), RenderPosition.BEFOREEND);

const pointsModel = new PointsModel();
pointsModel.setPoints(data);

const filterModel = new FilterModel();

//Отрисовка стоимости
renderElement(tripInfo, new CostElementView(data), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel);

const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);
filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
