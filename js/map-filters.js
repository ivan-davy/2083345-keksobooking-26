import {createPropertyCards} from './create-property-cards.js';
import {
  adFormToActiveState,
  adFormToInactiveState,
  filterFormToActiveState,
  filterFormToInactiveState
} from './utility/form-state.js';
import {getPropertyData} from './api.js';
import {customAlert} from './utility/info-popups.js';
import {
  featuresFilterLogic,
  guestsFilterLogic,
  priceFilterLogic,
  roomsFilterLogic,
  typeFilterLogic
} from './utility/filter-logic.js';
import {debounce} from './utility/debounce.js';


const MAP_DEFAULT_COORDS = {lat: 35.675, lng: 139.75};
const MAP_DEFAULT_SCALE = 12;
const MAP_PROPERTIES_VISIBLE = 10;
const RENDER_DEBOUNCE_DELAY = 500;

adFormToInactiveState();
filterFormToInactiveState();
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const mainMarkerGroup = L.layerGroup().addTo(map);

// Отрисовка изображений карты
const renderTile = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);
};

// Отрисовка главной метки
const renderMainPin = () => {
  const addressElement = document.querySelector('#address');

  const createMainPin = (location) => L.marker(
    location,
    {
      draggable: true,
      icon: L.icon({
        iconUrl: './img/main-pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52]
      })
    })
    .addTo(mainMarkerGroup);

  const mainPin = createMainPin(MAP_DEFAULT_COORDS);
  mainPin.on('drag', (evt) => {
    const mainPinLng = evt.target.getLatLng().lat.toFixed(5);
    const mainPinLat = evt.target.getLatLng().lng.toFixed(5);
    addressElement.value = `${mainPinLng}, ${mainPinLat}`;
  });
};

// Отрисовка всей карты
const renderMap = (properties) => {
  // Отрисовка похожих недвижимостей
  const renderPins = () => {
    markerGroup.clearLayers();
    let props = properties.slice();
    props = props
      .filter(typeFilterLogic)
      .filter(priceFilterLogic)
      .filter(roomsFilterLogic)
      .filter(guestsFilterLogic)
      .filter(featuresFilterLogic);
    props = props.slice(0, MAP_PROPERTIES_VISIBLE);
    const propertyCards = createPropertyCards(props);

    const createPin = (location, popupCardFragment) => L.marker(
      location,
      {
        icon: L.icon({
          iconUrl: './img/pin.svg',
          iconSize: [40, 40],
          iconAnchor: [20, 40]
        })
      })
      .bindPopup(popupCardFragment).addTo(markerGroup);

    props.forEach((property, index) => {
      createPin(property.location, propertyCards[index]);
    });
    filterFormToActiveState();
  };

  // Очередность отрисовки
  renderTile();
  renderMainPin();
  if (properties) {
    renderPins();
  }


  const debouncedRenderPins = debounce(renderPins, RENDER_DEBOUNCE_DELAY);
  // Слушатели для фильтров с устранителями дребезга отрисовщиков
  const typeFilter = document.querySelector('#housing-type');
  typeFilter.addEventListener('change', () => {
    debouncedRenderPins();
  });
  const priceFilter = document.querySelector('#housing-price');
  priceFilter.addEventListener('change', () => {
    debouncedRenderPins();
  });
  const roomsFilter = document.querySelector('#housing-rooms');
  roomsFilter.addEventListener('change', () => {
    debouncedRenderPins();
  });
  const guestsFilter = document.querySelector('#housing-guests');
  guestsFilter.addEventListener('change', () => {
    debouncedRenderPins();
  });
  const featuresFilter = document.querySelector('#housing-features');
  featuresFilter.addEventListener('change', () => {
    debouncedRenderPins();
  });
  const filterForm = document.querySelector('.map__filters');
  filterForm.addEventListener('reset', () => {
    debouncedRenderPins();
  });
};


// К положению по умолчанию
const resetMap = () => {
  mainMarkerGroup.clearLayers();
  renderMainPin();
  document.querySelector('.map__filters').reset();
  document.querySelector('.map__filters').reset();
  map.setView({lat: MAP_DEFAULT_COORDS.lat, lng: MAP_DEFAULT_COORDS.lng}, MAP_DEFAULT_SCALE);
};

// Инициализация карты и загрузка данных о недвижимостях (здесь начинается код)
map.once('load', () => {
  getPropertyData(renderMap, customAlert);
  adFormToActiveState();
});

map.setView({lat: MAP_DEFAULT_COORDS.lat, lng: MAP_DEFAULT_COORDS.lng}, MAP_DEFAULT_SCALE);

export {renderMap, resetMap};
