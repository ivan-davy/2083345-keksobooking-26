import {formsToActiveState, formsToInactiveState} from './utility/form-state.js';
import {generatePropertyCards} from './generate-property-cards.js';
import {getPropertyData} from './api.js';
import {customAlert} from './utility/custom-alert.js';


//const PROPERTIES_VISIBLE = 10; // Число имуществ, которое нужно показать
const DEFAULT_COORDINATES = {lat: 35.675, lng: 139.75};
const DEFAULT_SCALE = 12;
const addressElement = document.querySelector('#address');

formsToInactiveState();
const map = L.map('map-canvas').setView({lat: DEFAULT_COORDINATES.lat, lng: DEFAULT_COORDINATES.lng}, DEFAULT_SCALE);

map.on('load', () => {
  formsToActiveState();
  getPropertyData(customAlert);
});


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainMarkerGroup = L.layerGroup().addTo(map);
const markerGroup = L.layerGroup().addTo(map);

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


const mainPin = createMainPin(DEFAULT_COORDINATES);
const pins = [];
data.properties.forEach((property, index) => {
  const newPin = createPin(property.location, data.fragments[index]);
  pins.push(newPin);
});


mainPin.on('drag', (evt) => {
  const mainPinLng = evt.target.getLatLng().lat.toFixed(5);
  const mainPinLat = evt.target.getLatLng().lng.toFixed(5);
  addressElement.value = `${mainPinLng}, ${mainPinLat}`;
});
