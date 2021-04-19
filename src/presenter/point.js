import PointView from '../view/events.js';
import PointEditView from '../view/point-edit.js';
import {renderElement, RenderPosition, replace} from '../utils/render.js';

export default class Point {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._onEventEscKeyDown = this._onEventEscKeyDown.bind(this);
  }

  init(data) {
    this._data = data;

    this._pointComponent = new PointView(data);
    this._pointEditComponent = new PointEditView(data);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setEditFormClickHandler(this._handleFormSubmit);
    this._pointEditComponent.setCloseFormButtonClickHandler(this._handleFormSubmit);

    renderElement(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }

  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._onEventEscKeyDown.bind(this));
  }

  _replaceFormToCard() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._onEventEscKeyDown.bind(this));
  }

  _onEventEscKeyDown(evt) {
    if( evt.key === 'Escape' ||  evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }
}
