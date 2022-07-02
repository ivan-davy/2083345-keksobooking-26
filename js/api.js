const GET_DATA_URL = 'https://26.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://26.javascript.pages.academy/keksobooking';


const getPropertyData = (onSuccessCb, onFailCb) => {
  fetch(GET_DATA_URL)
    .then((response) => response.json())
    .then((properties) => onSuccessCb(properties))
    .catch(() => {
      onFailCb('Не удалось загрузить данные :(');
      onSuccessCb(null);
    });
};


const sendPropertyData = (onSuccessCb, onFailCb, body) => {
  fetch(
    SEND_DATA_URL,
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

