const SortType = {
  DEFAULT: 'default',
  DATE_PRICE: 'price',
  DATE_TIME: 'time',
};

const SET_FLATPICKR = {
  dateFormat: 'Y/m/d H:i',
  enableTime: true,
  time_24hr: true,
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdatePoint = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST',
};

const MenuItem = {
  TABLE : 'TABLE',
  STATS : 'STATS',
};

export {SortType, SET_FLATPICKR, UserAction, UpdatePoint, FilterType, MenuItem};
