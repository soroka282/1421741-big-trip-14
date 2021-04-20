import SiteMenuView from './view/menu.js';
import WayPointView from './view/way.js';
import CostElementView from './view/cost.js';
import FilterPointView from './view/filter.js';
import {data} from './mock/data.js';
import TripPresenter from './presenter/trip.js';
import {renderElement, RenderPosition} from './utils/render.js';

const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripInfo = document.querySelector('.trip-info');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

//Отрисовка меню
renderElement(tripControlsNavigation, new SiteMenuView(), RenderPosition.BEFOREEND);

//Отрисовка марштрута
renderElement(tripInfo, new WayPointView(data), RenderPosition.BEFOREEND);


//Отрисовка стоимости
renderElement(tripInfo, new CostElementView(data), RenderPosition.BEFOREEND);

//Отрисовка фильтра
renderElement(tripControlsFilters, new FilterPointView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEvents);
tripPresenter.init(data);
