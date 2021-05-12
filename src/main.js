import SiteMenuView from './view/menu.js';
import WayPointView from './view/way.js';
import CostElementView from './view/cost.js';
import StatsView from './view/stats.js';

import FilterModel from './model/filter.js';
import PointsModel from './model/points.js';

import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';

import {renderElement, RenderPosition, remove} from './utils/render.js';
import {data} from './mock/data.js';
import {MenuItem, UpdatePoint, FilterType} from './utils/const.js';

const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripInfo = document.querySelector('.trip-info');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const siteMenuComponent = new SiteMenuView();

//Отрисовка меню
renderElement(tripControlsNavigation, siteMenuComponent, RenderPosition.BEFOREEND);

//Отрисовка марштрута
renderElement(tripInfo, new WayPointView(data), RenderPosition.BEFOREEND);

const pointsModel = new PointsModel();
pointsModel.setPoints(data);

const filterModel = new FilterModel();

//Отрисовка стоимости
renderElement(tripInfo, new CostElementView(data), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel);

const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);

const buttonNewEvent = document.querySelector('.trip-main__event-add-btn');
buttonNewEvent.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
  buttonNewEvent.disabled = true;
});

let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {

  const inputFilterAll = document.querySelectorAll('.trip-filters__filter-input');

  switch(menuItem) {
    case MenuItem.TABLE:
      tripPresenter.init();
      filterModel.setFilter(UpdatePoint.MAJOR, FilterType.EVERYTHING);

      remove(statsComponent);
      buttonNewEvent.disabled = false;
      break;

    case MenuItem.STATS:
      tripPresenter.destroy();
      statsComponent = new StatsView(pointsModel.getPoints());
      renderElement(tripEvents, statsComponent, RenderPosition.BEFOREEND);
      buttonNewEvent.disabled = true;
      inputFilterAll.forEach((input) => {
        input.disabled = true;
      });
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();
