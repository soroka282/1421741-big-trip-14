import SiteMenuView from './view/menu.js';
import StatsView from './view/stats.js';
import FilterModel from './model/filter.js';
import PointsModel from './model/points.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import WayPresenter from './presenter/way-presenter.js';
import CostPresenter from './presenter/cost-presenter.js';
import {renderElement, RenderPosition, remove} from './utils/render.js';
import {MenuItem, UpdatePoint, FilterType} from './utils/const.js';
import Api from './api/api.js';
import Store from './data/store-data.js';

const AUTHORIZATION = 'Basic beloboka282';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripInfo = document.querySelector('.trip-info');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pageBodyContainer = document.querySelectorAll('.page-body__container');

const buttonNewEvent = document.querySelector('.trip-main__event-add-btn');

const StoreData = new Store();
const siteMenuComponent = new SiteMenuView();
const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const wayPresenter = new WayPresenter(tripInfo, pointsModel);
const costPresenter = new CostPresenter(tripInfo, pointsModel);
const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel, api);
const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);

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
      document.querySelector('.trip-tabs__btn-stats').style.pointerEvents = 'AUTO';
      remove(statsComponent);
      buttonNewEvent.disabled = false;
      pageBodyContainer.forEach((item) => item.classList.remove('page-body__container-line'));
      break;

    case MenuItem.STATS:
      document.querySelector('.trip-tabs__btn-stats').style.pointerEvents = 'NONE';
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

Promise.all([
  api.getDestinations(),
  api.getOffers(),
  api.getPoints(),
])
  .then((data) => {
    StoreData.setDestinations(data[0]);
    StoreData.setOffers(data[1]);
    pointsModel.setPoints(UpdatePoint.INIT, data[2]);
    wayPresenter.init();
    costPresenter.init();
    buttonNewEvent.disabled = false;
    filterPresenter.init();
  })
  .catch((data) => {
    StoreData.setDestinations(data[0]);
    StoreData.setOffers(data[1]);
    pointsModel.setPoints(UpdatePoint.INIT, []);
    wayPresenter.init();
    costPresenter.init();
    buttonNewEvent.disabled = false;
    filterPresenter.init();
  });

export {
  StoreData
};
