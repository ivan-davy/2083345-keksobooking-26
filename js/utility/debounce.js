//https://www.freecodecamp.org/news/javascript-debounce-example


// Не получилось имплементировать
const DEBOUNCE_DELAY = 500;

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, rest);
    }, timeoutDelay);
  };
};

export {debounce};

