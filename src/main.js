import {createMenuTemplate} from './view/menu.js';
import {createWayTemplate} from './view/way.js';
import {createCostTemplate} from './view/cost.js';
import {createFiltersTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createEventsTemplate} from './view/events.js';
import {createPointTemplate} from './view/point-create.js';
import {editPointTemplate} from './view/point-edit.js';
import {createEventsList} from './view/events-list.js';
import {data} from './mock/data.js';

const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripInfo = document.querySelector('.trip-info');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

//Отрисовка меню
render(tripControlsNavigation, createMenuTemplate(), 'beforeend');

//Отрисовка марштрута
render(tripInfo, createWayTemplate(data[0]), 'beforeend');

//Отрисовка стоимости
render(tripInfo, createCostTemplate(data[0]), 'beforeend');

//Отрисовка фильтра
render(tripControlsFilters, createFiltersTemplate(), 'beforeend');

//Отрисовка сортировки
render(tripEvents, createSortTemplate(), 'afterbegin');

//Отрисовка списка точек
render(tripEvents, createEventsList(), 'beforeend');
const tripEventsList = document.querySelector('.trip-events__list');

//Отрисовка посещаемых точек
for (let i = 0; i < 5; i++) {
  render(tripEventsList, createEventsTemplate(data[i]), 'beforeend');
}

//Отрисовка формы создания точки
render(tripEventsList, createPointTemplate(data[0]), 'afterbegin');

//Отрисовка формы редактирование точки
render(tripEventsList, editPointTemplate(data[0]), 'beforeend');

