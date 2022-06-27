const adFormToInactiveState = () => {
  document.querySelector('.ad-form').classList.add('ad-form--disabled');
  document.querySelector('.ad-form')
    .querySelectorAll('fieldset')
    .forEach((fieldset) => {
      fieldset.disabled = true;
    });
  document.querySelector('.ad-form')
    .querySelectorAll('select')
    .forEach((select) => {
      select.disabled = true;
    });
};

const adFormToActiveState = () => {
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.ad-form')
    .querySelectorAll('fieldset')
    .forEach((fieldset) => {
      fieldset.disabled = false;
    });
  document.querySelector('.ad-form')
    .querySelectorAll('select')
    .forEach((select) => {
      select.disabled = false;
    });
};

const filterFormToInactiveState = () => {
  document.querySelector('.map__filters').classList.add('map__filters--disabled');
};

const filterFormToActiveState = () => {
  document.querySelector('.map__filters').classList.remove('map__filters--disabled');
};

export {adFormToInactiveState, adFormToActiveState, filterFormToInactiveState, filterFormToActiveState};

