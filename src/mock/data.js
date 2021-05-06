import { nanoid } from 'nanoid';
import {getRandomValue, getRandomArray} from '../utils/common.js';

const TYPE = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Transport',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
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

// const TITLE = [
//   'Order Uber',
//   'Add luggage',
//   'Switch to comfort',
//   'Add breakfast',
//   'Rent a car',
// ];

// const PRICE = [50, 30, 40, 10, 55];

const generatePicture = () => {
  return {
    src: `http://picsum.photos/248/152?r=${Math.random()}`,
  };
};

const getDescription = () =>{
  return getRandomArray(DESCRIPTION).slice(0, 4).join(' ');
};

const getPicture = () => {
  return new Array(getRandomValue(0, 5)).fill().map(() => generatePicture());
};

// const generateOffer = () => {
//   return {
//     type: TYPE[getRandomValue(0, TYPE.length -1)],
//     id: nanoid(),
//     offers: {
//       price: PRICE[getRandomValue(0, PRICE.length -1)],
//       title: TITLE[getRandomValue(0, TITLE.length -1)],
//     },
//   };
// };

const offerExampleStatic = [
  {
    offers: {
      price: 10,
      title: 'Order Uber',
    },
    type: 'Bus',
    id: nanoid(),
  },
  {
    offers: {
      price: 20,
      title:
      'Add luggage',
    },
    type: 'Bus',
    id: nanoid(),
  },
  {
    offers: {
      price: 30,
      title: 'Rent a car',
    },
    type: 'Sightseeing',
    id: nanoid(),
  },
  {
    offers: {
      price: 50,
      title: ' Switch to comfort',
    },
    type: 'Ship',
    id: nanoid(),
  },
  {
    offers: {
      price: 40,
      title: ' Switch to comfort',
    },
    type: 'Sightseeing',
    id: nanoid(),
  },  {
    offers: {
      price: 50,
      title: ' Switch to comfort',
    },
    type: 'Ship',
    id: nanoid(),
  },
  {
    offers: {
      price: 40,
      title: 'Add breakfast',
    },
    type: 'Sightseeing',
    id: nanoid(),
  },  {
    offers: {
      price: 550,
      title: ' Switch to comfort',
    },
    type: 'Drive',
    id: nanoid(),
  },
  {
    offers: {
      price: 450,
      title: 'Add luggage',
    },
    type: 'Taxi',
    id: nanoid(),
  },
];

// const generateOffers = () => {
//   return new Array(getRandomValue(0, 5))
//     .fill()
//     .map(() => generateOffer());
// };

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
    id: nanoid(),
    destination:  {
      description: getDescription(),
      photo: getPicture(),
    },
    offer: offerExampleStatic.slice(0, getRandomValue(0, 7)),
  };
};

const generatePoints = () => {
  return new Array(5)
    .fill()
    .map(() => generatePoint());
};

const data = generatePoints();

export {data, offerExampleStatic, CITY, getDescription, getPicture};
