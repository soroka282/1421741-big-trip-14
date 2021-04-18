import AbstractView from '../abstract.js';

const createMsgTemplate = () => {
  return `<p class="trip-events__msg">
  Click New Event to create your first point
  </p>`;
};

export default class NoEventMsg extends AbstractView {
  getElement() {
    return createMsgTemplate();
  }
}
