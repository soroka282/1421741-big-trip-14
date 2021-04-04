import {createMenuTemplate} from './view/menu.js';
import {createWayTemplate} from './view/way.js';
import {createCostTemplate} from './view/cost.js';
import {createFiltersTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createEventsTemplate} from './view/events.js';
import {createFormTemplate} from './view/form-create.js';
import {createFormEditTemplate} from './view/form-edit.js';

const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripInfo = document.querySelector('.trip-info');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tripEventsList = document.querySelector('.trip-events__list');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripControlsNavigation, createMenuTemplate(), 'beforeend');
render(tripInfo, createWayTemplate(), 'beforeend');
render(tripInfo, createCostTemplate(), 'beforeend');
render(tripControlsFilters, createFiltersTemplate(), 'beforeend');
render(tripEvents, createSortTemplate(), 'afterbegin');

const tripEventsItem = document.querySelector('.trip-events__item');
for (let i = 0; i < 3; i++) {
  render(tripEventsList, createEventsTemplate(), 'beforeend');
}

render(tripEventsList, createFormTemplate(), 'beforeend');
render(tripEventsList, createFormEditTemplate(), 'beforeend');
