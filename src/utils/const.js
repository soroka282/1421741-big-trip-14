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
  INIT: 'INIT',
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

const ChartSet = {
  TYPE: 'horizontalBar',
  COLOR: {
    WHITE: '#ffffff',
    BLACK: '#000000',
  },
  ANCHOR: {
    START: 'start',
    END: 'end',
  },
  FONT_SIZE: {
    DATA_LABELS: 13,
    TITLE: 23,
    SCALES: 13,

  },
  ALIGN: 'start',
  DISPLAY: {
    TRUE: true,
    FALSE: false,
  },
  TEXT: {
    MONEY: 'MONEY',
    TYPE: 'TYPE',
    TIME_SPEND: 'TIME-SPEND',
  },
  POSITION: 'left',
  PADDING: 5,
  DRAW_BORDER: false,
  BAR_THICKNESS: 44,
  BEGIN_AT_ZERO: true,
  MIN_BAR_LENGTH: 50,
  TOOLTIPS_ENABLED: false,
};

export {SortType, SET_FLATPICKR, UserAction, UpdatePoint, FilterType, MenuItem, ChartSet };
