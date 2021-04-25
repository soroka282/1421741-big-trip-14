import PointView from '../view/events.js';
import PointEditView from '../view/point-edit.js';
import {renderElement, RenderPosition, replace, remove} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(pointListContainer, changeData, changeMode) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._onEventEscKeyDown = this._onEventEscKeyDown.bind(this);
  }

  init(data) {
    this._data = data;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(data);
    this._pointEditComponent = new PointEditView(data);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setEditFavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setEditFormClickHandler(this._handleFormSubmit);
    this._pointEditComponent.setCloseFormButtonClickHandler(this._handleFormSubmit);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      renderElement(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointEditComponent);
    remove(prevPointComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if(this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._onEventEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._onEventEscKeyDown);
    this._mode = Mode.DEFAULT;
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

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._data,
        {
          favorite: !this._data.favorite,
        },
      ),
    );
  }
}
