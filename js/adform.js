import {submitButtonToInactiveState} from './utility/form-state.js';
import {sendPropertyData} from './api.js';
import {errorFormPopup, successFormPopup} from './utility/info-popups.js';
import  {resetMap} from './map-filters.js';
import {resetImages} from './images.js';


const adForm = document.querySelector('.ad-form');

const TYPE_PRICE_MIN_RESTRICTIONS = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000
};

const PRICE_SLIDER_CONFIGURATION = {
  range: {
    min: TYPE_PRICE_MIN_RESTRICTIONS[adForm.querySelector('#type option:checked').value],
    max: 100000
  },
  start: TYPE_PRICE_MIN_RESTRICTIONS[adForm.querySelector('#type option:checked').value],
  step: 500,
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
};

const ROOM_CAPACITY_RESTRICTIONS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextClass: 'form__error'
});

// Название
const validateTitle = (value) => value.length >= 30 && value.length <= 100;
const getTitleErrorMessage = () => 'Не короче 30 и не длиннее 100 символов';
pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  getTitleErrorMessage
);

// Цена
const priceInputElement = adForm.querySelector('#price');
const validatePrice = (value) => {
  const min = TYPE_PRICE_MIN_RESTRICTIONS[adForm.querySelector('#type option:checked').value];
  return value >= min && value <= 100000;
};
const getPriceErrorMessage = () => {
  const min = TYPE_PRICE_MIN_RESTRICTIONS[adForm.querySelector('#type option:checked').value];
  return `От ${min} до 100000 ₽/ночь для выбранного типа недвижимости`;
};
pristine.addValidator(
  priceInputElement,
  validatePrice,
  getPriceErrorMessage
);
const priceSlider = adForm.querySelector('.ad-form__slider');
noUiSlider.create(priceSlider, PRICE_SLIDER_CONFIGURATION);
priceSlider.noUiSlider.on('slide', () => {
  priceInputElement.value = priceSlider.noUiSlider.get();
  pristine.validate();
});
priceInputElement.addEventListener('change', () => {
  priceSlider.noUiSlider.set(priceInputElement.value);
  pristine.validate();
});
adForm.querySelector('#type').addEventListener('change', () => {
  priceInputElement.placeholder = TYPE_PRICE_MIN_RESTRICTIONS[adForm.querySelector('#type option:checked').value];
  priceSlider.noUiSlider.updateOptions({
    range: {min: parseFloat(priceInputElement.placeholder), max: 100000}});
  pristine.validate();
});

// Число комнат и гостей
const validateCapacity = (value) => {
  const rooms = adForm.querySelector('#room_number option:checked').value;
  return ROOM_CAPACITY_RESTRICTIONS[rooms].includes(value);
};
const getCapacityErrorMessage = () => 'Некорректное число гостей';
pristine.addValidator(
  adForm.querySelector('#capacity'),
  validateCapacity,
  getCapacityErrorMessage
);
adForm.querySelector('#room_number').addEventListener('change', () => {
  pristine.validate();
});

// Чек-ин и чек-аут
adForm.querySelector('#timein').addEventListener('change', () => {
  const newTime = adForm.querySelector('#timein option:checked').value;
  adForm.querySelectorAll('#timeout option').forEach((opt) => {
    opt.selected = opt.value === newTime;
  });
  pristine.validate();
});
adForm.querySelector('#timeout').addEventListener('change', () => {
  const newTime = adForm.querySelector('#timeout option:checked').value;
  adForm.querySelectorAll('#timein option').forEach((opt) => {
    opt.selected = opt.value === newTime;
  });
  pristine.validate();
});

// Валидация при отправке
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    submitButtonToInactiveState();
    sendPropertyData(successFormPopup, errorFormPopup, new FormData(evt.target));
    priceSlider.noUiSlider.set(0);
  }
});

// Сброс
adForm.querySelector('.ad-form__reset').addEventListener('click', () => {
  priceSlider.noUiSlider.set(0);
  resetMap();
  resetImages();
});


