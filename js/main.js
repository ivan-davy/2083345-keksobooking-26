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

console.log(getRandomInteger(0, 9));
console.log(getRandomFloat(0, 9));
