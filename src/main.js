import SiteMenuView from './view/menu.js';
import WayPointView from './view/way.js';
import CostElementView from './view/cost.js';
import StatsView from './view/stats.js';

import FilterModel from './model/filter.js';
import PointsModel from './model/points.js';

import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';

import Destination from './destination-data.js';
import Offers from './offers-data.js';

import {renderElement, RenderPosition, remove} from './utils/render.js';
//simport {data} from './mock/data.js';
import {MenuItem, UpdatePoint, FilterType} from './utils/const.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic beloboka_282';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripInfo = document.querySelector('.trip-info');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pageBodyContainer = document.querySelectorAll('.page-body__container');

const destinationData = new Destination();
const offersData = new Offers();

const siteMenuComponent = new SiteMenuView();

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel, api);

const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);

const buttonNewEvent = document.querySelector('.trip-main__event-add-btn');
buttonNewEvent.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
  buttonNewEvent.disabled = true;
});

let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {

  const inputFilterAll = tripControlsFilters.querySelectorAll('.trip-filters__filter-input');

  switch(menuItem) {
    case MenuItem.TABLE:

      tripPresenter.destroy();
      tripPresenter.init();
      filterModel.setFilter(UpdatePoint.MAJOR, FilterType.EVERYTHING);

      remove(statsComponent);
      buttonNewEvent.disabled = false;
      pageBodyContainer.forEach((item) => item.classList.remove('page-body__container-line'));
      break;

    case MenuItem.STATS:

      tripPresenter.destroy();
      statsComponent = new StatsView(pointsModel.getPoints());
      renderElement(tripEvents, statsComponent, RenderPosition.BEFOREEND);
      buttonNewEvent.disabled = true;
      inputFilterAll.forEach((input) => {
        input.disabled = true;
        pageBodyContainer.forEach((item) => item.classList.add('page-body__container-line'));
      });
      break;
  }
};

renderElement(tripControlsNavigation, siteMenuComponent, RenderPosition.BEFOREEND);
siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

tripPresenter.init();
buttonNewEvent.disabled = true;

api.getDestinations()
  .then((data) => {
    destinationData.setDestinations(data);
  })
  .then(() => {
    api.getOffers()
      .then((data) => {
        offersData.setOffers(data);
      });
  })
  .then(() => {
    api.getPoints()
      .then((data) => {
        pointsModel.setPoints(UpdatePoint.INIT, data);
        renderElement(tripInfo, new WayPointView(data), RenderPosition.BEFOREEND);
        renderElement(tripInfo, new CostElementView(data), RenderPosition.BEFOREEND);
        buttonNewEvent.disabled = false;
        filterPresenter.init();

      })
      .catch((data) => {
        pointsModel.setPoints(UpdatePoint.INIT, []);
        renderElement(tripInfo, new WayPointView(data), RenderPosition.BEFOREEND);
        renderElement(tripInfo, new CostElementView(data), RenderPosition.BEFOREEND);
        buttonNewEvent.disabled = false;
        filterPresenter.init();
      });
  });

export {
  offersData,
  destinationData
};
