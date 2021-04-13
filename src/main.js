import SiteMenuView from './view/menu.js';
import WayPointView from './view/way.js';
import CostElementView from './view/cost.js';
import FilterPointView from './view/filter.js';
import SortView from './view/sort.js';
import PointView from './view/events.js';
import CreatePointView from './view/point-create.js';
import PointEditView from './view/point-edit.js';
import ListView from './view/events-list.js';
import {data} from './mock/data.js';
import {renderElement, RenderPosition} from './util.js';

const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripInfo = document.querySelector('.trip-info');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

//Отрисовка меню
renderElement(tripControlsNavigation, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

//Отрисовка марштрута
renderElement(tripInfo, new WayPointView(data[0]).getElement(), RenderPosition.BEFOREEND);

//Отрисовка стоимости
renderElement(tripInfo, new CostElementView(data[0]).getElement(), RenderPosition.BEFOREEND);

//Отрисовка фильтра
renderElement(tripControlsFilters, new FilterPointView().getElement(), RenderPosition.BEFOREEND);

//Отрисовка сортировки
renderElement(tripEvents, new SortView().getElement(), RenderPosition.AFTERBEGIN);

//Отрисовка списка точек
const PointListComponent = new ListView();

renderElement(tripEvents, PointListComponent.getElement(), RenderPosition.BEFOREEND);

//Отрисовка формы редактирование точки
const renderEvent = (EventListElement, event) => {
  const EventComponent = new PointView(event).getElement();
  const eventEditComponent = new PointEditView(event).getElement();
  const eventButton = EventComponent.querySelector('.event__rollup-btn');
  const editForm = eventEditComponent.querySelector('form');
  const closeFormButton = eventEditComponent.querySelector('.event__rollup-btn');

  const replaceCardToForm = () => {
    EventListElement.replaceChild(eventEditComponent, EventComponent);
  };

  const replaceFormToCard = () => {
    EventListElement.replaceChild(EventComponent, eventEditComponent);
  };

  eventButton.addEventListener('click', () => {
    replaceCardToForm();
  });

  editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  closeFormButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  renderElement(EventListElement, EventComponent, RenderPosition.BEFOREEND);
};

//Отрисовка посещаемых точек
data.forEach((event) => {
  renderEvent(PointListComponent.getElement(), event);
});

//Отрисовка формы создания точки
renderElement(PointListComponent.getElement(), new CreatePointView(data[0]).getElement(), RenderPosition.AFTERBEGIN);
