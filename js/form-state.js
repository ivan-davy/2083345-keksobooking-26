const toInactiveState = () => {
  document.querySelector('.ad-form').classList.add('ad-form--disabled');
  document.querySelector('.ad-form')
    .querySelectorAll('fieldset')
    .forEach((fieldset) => {
      fieldset.disabled = true;
    });
  document.querySelector('.map__filters').classList.add('map__filters--disabled');
  document.querySelector('.ad-form')
    .querySelectorAll('select')
    .forEach((select) => {
      select.disabled = true;
    });
};

const toActiveState = () => {
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.ad-form')
    .querySelectorAll('fieldset')
    .forEach((fieldset) => {
      fieldset.disabled = false;
    });
  document.querySelector('.map__filters').classList.remove('map__filters--disabled');
  document.querySelector('.ad-form')
    .querySelectorAll('select')
    .forEach((select) => {
      select.disabled = false;
    });
};

export {toInactiveState, toActiveState};

