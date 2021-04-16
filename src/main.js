import SiteMenuView from './view/menu.js';
import WayPointView from './view/way.js';
import CostElementView from './view/cost.js';
import FilterPointView from './view/filter.js';
import SortView from './view/sort.js';
import PointView from './view/events.js';
import CreatePointView from './view/point-create.js';
import PointEditView from './view/point-edit.js';
import ListView from './view/events-list.js';
import NoEventMsgView from './view/no-events.js';
import {data} from './mock/data.js';
import {renderElement, RenderPosition, replace} from './utils/render.js';

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

//Отрисовка сортировки
renderElement(tripEvents, new SortView(), RenderPosition.AFTERBEGIN);

//Отрисовка списка точек
const pointListComponent = new ListView();

if(data.length == 0) {
  renderElement(tripEvents, new NoEventMsgView(), RenderPosition.BEFOREEND);
} else {
  renderElement(tripEvents, pointListComponent, RenderPosition.BEFOREEND);

  //Отрисовка формы редактирование точки
  const renderEvent = (eventListElement, event) => {
    const eventComponent = new PointView(event);
    const eventEditComponent = new PointEditView(event);

    const replaceCardToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToCard = () => {
      replace(eventComponent, eventEditComponent);
    };

    const onEventEscKeyDown = (evt) => {
      if( evt.key === 'Escape' ||  evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEventEscKeyDown);
      }
    };

    eventComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEventEscKeyDown);
    });

    eventEditComponent.setEditFormClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEventEscKeyDown);
    });

    eventEditComponent.setCloseFormButtonClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEventEscKeyDown);
    });

    renderElement(eventListElement, eventComponent, RenderPosition.BEFOREEND);
  };

  //Отрисовка посещаемых точек
  data.forEach((event) => {
    renderEvent(pointListComponent, event);
  });

  //Отрисовка формы создания точки
  renderElement(pointListComponent, new CreatePointView(data[0]).getElement(), RenderPosition.AFTERBEGIN);
}
