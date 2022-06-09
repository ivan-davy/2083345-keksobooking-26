'use strict';

/* Возвращает случайную целую величину из положительного диапазона [min, max]. \
Если такого числа не существует (в  т.ч. в силу некорректности переданных аргументов), \
функция возвращает null. Если min = max, возвращает это число. \
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */

const getRandomInteger = (min, max) => {
  let result = null;
  if (min >= 0 && max >= 0 && min <= max) {
    result = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));
  }
  return result;
};

/* Возвращает случайную величину с плавающей точкой из положительного диапазона [min, max). \
Если такого числа не существует (в силу некорректности переданных аргументов), \
функция возвращает null. Если min = max, возвращает это число. \
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */

const getRandomFloat = (min, max) => {
  let result = null;
  if (min >= 0 && max >= 0 && min <= max) {
    result = Math.random() * (max - min) + min;
  }
  return result;
};

/* Функция getRandomItem по умолчанию возвращает случайное значение из переданного ей массива iterable. \
Если же указать опциональный параметр quantity, то функция вернет массив случайных элементов \
переданного массива iterable указанной длины. Если переданное значение number некорректно, функция вернет undefined */
const getRandomItem = (iterable) => iterable[getRandomInteger(0, iterable.length - 1)];

/* Функция getRandomSample возвращает массив-выборку случайных элементов переданного массива iterable \
указанного размера. С помощью параметра quantity можно указать необходимый размер выборки. \
canRepeat определяет возможность повторения элементов в выборке. Если canRepeat = false, но размер выборки \
больше длины передаваемого массива, то размер выборки уменьшается до его длины.
Если переданное значение quantity некорректно, функция вернет undefined */

const getRandomSample = (iterable, sampleSize, canRepeat = false) => {
  if (sampleSize >= 1) {
    if (canRepeat) {
      const sample = [];
      for (let i = 0; i <= sampleSize - 1; i++) {
        sample[i] = iterable[getRandomInteger(0, iterable.length - 1)];
      }
      return sample;
    } else {
      if (sampleSize > iterable.length) {
        sampleSize = iterable.length;
      }
      const remainingSelection = iterable.slice(), sample = [];
      let rndIndex = null;
      for (let i = 0; i <= sampleSize - 1; i++) {
        rndIndex = getRandomInteger(0, remainingSelection.length - 1);
        sample[i] = remainingSelection[rndIndex];
        remainingSelection.splice(rndIndex, 1);
      }
      return sample;
    }
  }
};

const GENERATED_OBJECTS_QTY = 10; // Число имуществ, которое нужно сгенерировать

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
  'elevator'
];

const PROPERTY_IMAGES = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];


const generateProperty = (userID = 0) => {
  const lat = getRandomFloat(35.65, 35.70);
  const lng = getRandomFloat(139.70, 139.80);
  return {
    author: {avatar: `img/avatars/user${String(userID).padStart(2, '0')}`},
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
      features: getRandomSample(PROPERTY_AVAILABLE_FEATURES, getRandomInteger(1, PROPERTY_AVAILABLE_FEATURES.length - 1)),
      description: `Сгенерированное описание объявления со случайным числом ${getRandomInteger(0, 1000000)}`,
      photos: getRandomSample(PROPERTY_IMAGES, getRandomInteger(1, 5), true)
    }
  };
};

console.log(generateProperty());

const properties = [];
for (let i = 0; i <= GENERATED_OBJECTS_QTY - 1; i++) {
  properties.push(generateProperty(i + 1));
}
console.log(properties);
