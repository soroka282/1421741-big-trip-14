import {getRandomValue, getRandomArray} from '../utils/common.js';

const TYPE = [
  'taxi',
  'bus',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const CITY = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
  'St-Petersburg',
];

const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const TITLE = [
  'Order Uber',
  'Add luggage',
  'Switch to comfort',
  'Add breakfast',
  'Rent a car',
];

const PRICE = [50, 30, 40, 10, 55];

const generatePicture = () => {
  return {
    src: `http://picsum.photos/248/152?r=${Math.random()}`,
  };
};

const getPictures = () => {
  return new Array(getRandomValue(0, 5)).fill().map(() => generatePicture());
};

const generateOffer = () => {
  return {
    price: PRICE[getRandomValue(0, PRICE.length -1)],
    title: TITLE[getRandomValue(0, TITLE.length -1)],
  };
};

const generateOffers = () => {
  return new Array(getRandomValue(0, 4))
    .fill()
    .map(() => generateOffer());
};

const getRandomDate = () => {
  return (Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * getRandomValue(0, 60) * 60 * 1000);
};

const generatePoint = () => {
  const startDate = getRandomDate();
  const endDate = getRandomDate();

  return {
    dateFrom: Math.min(startDate, endDate),
    dateTo: Math.max(startDate, endDate),
    price: getRandomValue(10, 200),
    type: TYPE[getRandomValue(0, TYPE.length -1)],
    name: CITY[getRandomValue(0, CITY.length -1)],
    favorite: Boolean(getRandomValue(0, 1)),
    offer: generateOffers(),
    destination: {
      description: getRandomArray(DESCRIPTION).slice(0, 4).join(' '),
      photo: getPictures(),
    },
  };
};

const generatePoints = () => {
  return new Array(5)
    .fill()
    .map(() => generatePoint())
    .sort((currentPoint, nextPoint) => currentPoint.dateFrom - nextPoint.dateFrom);
};

const data = generatePoints();

export {data};
