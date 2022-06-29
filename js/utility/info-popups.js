import {submitButtonToActiveState} from './form-state.js';
import {resetMap} from '../map.js';

const customAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.padding = '10px 10px';
  alertContainer.style.margin = '20px 20px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'left';
  alertContainer.style.backgroundColor = '#f5f5f5';
  alertContainer.textContent = message;
  alertContainer.style.border = '4px solid';
  alertContainer.style.borderColor = '#ff6547';
  alertContainer.style.borderRadius = '8px';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 10000);
};

const successFormPopup = () => {
  document.querySelector('.ad-form').reset();
  const successPopup = document.querySelector('#success').content.cloneNode(true);
  document.body.appendChild(successPopup);

  //Декларативно для hoisting-а listener-ов, чтобы один удалялся вместе со вторым (можно ли сделать более элегантно?)
  function clickListenerFunc() {
    document.removeEventListener('keydown', escListenerFunc);
    document.querySelector('.success').remove();

  }
  function escListenerFunc(evt) {
    if (evt.key === 'Escape') {
      document.removeEventListener('click', clickListenerFunc);
      document.querySelector('.success').remove();
    }
  }

  document.addEventListener('click', clickListenerFunc, {once: true});
  document.addEventListener('keydown', escListenerFunc, {once: true});
  resetMap();
  submitButtonToActiveState();
};

const errorFormPopup = () => {
  const errorPopup = document.querySelector('#error').content.cloneNode(true);
  document.body.appendChild(errorPopup);

  function clickListenerFunc() {
    document.removeEventListener('keydown', escListenerFunc);
    document.querySelector('.error').remove();
  }
  function escListenerFunc(evt) {
    if (evt.key === 'Escape') {
      document.removeEventListener('click', clickListenerFunc);
      document.querySelector('.error').remove();
    }
  }

  document.addEventListener('click', clickListenerFunc, {once: true});
  document.addEventListener('keydown', escListenerFunc, {once: true});
  submitButtonToActiveState();
};


export {customAlert, successFormPopup, errorFormPopup};
