import { FilterType } from './const.js';

export const filter = {
  [FilterType.EVERYTHING]: (point) => point,
  [FilterType.FUTURE]: (point) => point.filter((point) => point.dateFrom > Date.now()),
  [FilterType.PAST]: (point) => point.filter((point) => point.dateFrom < Date.now()),
};
