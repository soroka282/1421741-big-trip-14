import PointEditView from '../view/point-edit.js';
import {nanoid} from 'nanoid';
import {remove, renderElement, RenderPosition} from '../utils/render.js';
import {UserAction, UpdatePoint} from '../utils/const.js';

export default class NewPoint {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;

    this._pointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._onEventEscKeyDown = this._onEventEscKeyDown.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init() {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new PointEditView();
    this._pointEditComponent.setEditFormClickHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._pointEditComponent.setCloseFormButtonClickHandler(this._handleDeleteClick);

    renderElement(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this._onEventEscKeyDown);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener('keydown', this._onEventEscKeyDown);
  }

  _onEventEscKeyDown(evt) {
    if( evt.key === 'Escape' ||  evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleFormSubmit(point) {

    this._changeData(
      UserAction.ADD_POINT,
      UpdatePoint.MINOR,
      Object.assign({id: nanoid()}, point),
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }
}
