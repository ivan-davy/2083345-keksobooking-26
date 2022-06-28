const getPropertyData = (onSuccessCb, onFailCb) => {
  fetch('https://26.javascript.pages.academy/keksobooking/dat')
    .then((response) => response.json())
    .then((properties) => onSuccessCb(properties))
    .then((properties) => properties)
    .catch(() => {
      onFailCb('Не удалось загрузить данные :(');
      onSuccessCb(null);
    });
};

const sendPropertyData = (onSuccessCb, onFailCb, body) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      type: 'multipart/form-data',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccessCb();
      } else {
        onFailCb();
      }
    })
    .catch(() => {
      onFailCb();
    });
};


export {getPropertyData, sendPropertyData};

