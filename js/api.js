const getPropertyData = (onSuccessCb, onFailCb) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((properties) => onSuccessCb(properties))
    .catch(() => {
      onFailCb('Не удалось загрузить данные :(');
      onSuccessCb(null);
    });
};

export {getPropertyData};

