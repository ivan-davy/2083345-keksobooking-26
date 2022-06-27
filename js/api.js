const getPropertyData = (onSuccessCb, onFailCb) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .catch(() => onFailCb('Не удалось загрузить данные :('))
    .then((properties) => onSuccessCb(properties));
};

export {getPropertyData};

