import {createPropertyCards} from './create-property-cards.js';
import {adFormToActiveState, adFormToInactiveState, filterFormToActiveState, filterFormToInactiveState} from './utility/form-state.js';
import {getPropertyData} from './api.js';
import {customAlert} from './utility/info-popups.js';


const MAP_DEFAULT_COORDS = {lat: 35.675, lng: 139.75};
const MAP_DEFAULT_SCALE = 12;
const MAP_PROPERTIES_VISIBLE = 10;

adFormToInactiveState();
filterFormToInactiveState();
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const mainMarkerGroup = L.layerGroup().addTo(map);


const renderMainPin = () => {
  const addressElement = document.querySelector('#address');

  const createMainPin = (location) => L.marker(
    location,
    {
      draggable: true,
      icon: L.icon({
        iconUrl: '/img/main-pin.svg',
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


const renderMap = (properties) => {
  const renderTile = () => {
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
      },
    ).addTo(map);
  };

  const renderPins = () => {
    properties = properties.slice(0, MAP_PROPERTIES_VISIBLE);
    const propertyCards = createPropertyCards(properties);

    const createPin = (location, popupCardFragment) => L.marker(
      location,
      {
        icon: L.icon({
          iconUrl: '/img/pin.svg',
          iconSize: [40, 40],
          iconAnchor: [20, 40]
        })
      })
      .bindPopup(popupCardFragment).addTo(markerGroup);

    const pins = [];
    properties.forEach((property, index) => {
      const newPin = createPin(property.location, propertyCards[index]);
      pins.push(newPin);
    });
    filterFormToActiveState();
  };

  renderTile();
  renderMainPin();
  if (properties) {
    renderPins();
  }
};

const resetMap = () => {
  mainMarkerGroup.clearLayers();
  renderMainPin();
  map.setView({lat: MAP_DEFAULT_COORDS.lat, lng: MAP_DEFAULT_COORDS.lng}, MAP_DEFAULT_SCALE);
};

map.once('load', () => {
  adFormToActiveState();
  getPropertyData(renderMap, customAlert);
});

map.setView({lat: MAP_DEFAULT_COORDS.lat, lng: MAP_DEFAULT_COORDS.lng}, MAP_DEFAULT_SCALE);

export {renderMap, resetMap};
