const getPropertyData = (onFailCb) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .catch(() => onFailCb('Не удалось загрузить данные :('));
};

export {getPropertyData};

