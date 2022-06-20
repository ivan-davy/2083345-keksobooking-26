import {getRandomInteger, getRandomFloat, getRandomItem, getRandomSample} from './utility/utility-random.js';


const PROPERTY_AVAILABLE_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const PROPERTY_AVAILABLE_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const PROPERTY_AVAILABLE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PROPERTY_IMAGES = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const generateProperty = (qty) => {
  const propertyList = [];
  for (let i = 0; i <= qty - 1; i++) {
    const lat = getRandomFloat(35.65, 35.70);
    const lng = getRandomFloat(139.70, 139.80);
    propertyList.push({
      author: {avatar: `img/avatars/user${String(i).padStart(2, '0')}.png`},
      location: {lat: lat, lng: lng},
      offer: {
        title: `Название объявления ${getRandomInteger(1, 100000)}`,
        address: `${lat}, ${lng}`,
        price: getRandomInteger(1, 9999999999),
        type: getRandomItem(PROPERTY_AVAILABLE_TYPES),
        rooms: getRandomInteger(1, 100),
        guests: getRandomInteger(1, 100),
        checkin: getRandomItem(PROPERTY_AVAILABLE_TIMES),
        checkout: getRandomItem(PROPERTY_AVAILABLE_TIMES),
        features: getRandomSample(PROPERTY_AVAILABLE_FEATURES, getRandomInteger(0, PROPERTY_AVAILABLE_FEATURES.length - 1)),
        description: `Сгенерированное описание объявления со случайным числом ${getRandomInteger(0, 1000000)}`,
        photos: getRandomSample(PROPERTY_IMAGES, getRandomInteger(0, 5), true)
      }
    });
  }
  return propertyList;
};


export {generateProperty};
