import {formsToActiveState, formsToInactiveState} from './utility/utility-form-state.js';
import {generatePropertyCard} from './generate-property-card.js';


const GENERATED_OBJECTS_QTY = 10; // Число имуществ, которое нужно сгенерировать
const DEFAULT_COORDINATES = {lat: 35.675, lng: 139.75};
const DEFAULT_SCALE = 12;
const addressElement = document.querySelector('#address');
const data = generatePropertyCard(GENERATED_OBJECTS_QTY);

formsToInactiveState();
const map = L.map('map-canvas')
  .on('load', () => {formsToActiveState();})
  .setView({lat: DEFAULT_COORDINATES.lat, lng: DEFAULT_COORDINATES.lng}, DEFAULT_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainMarkerGroup = L.layerGroup().addTo(map);
const markerGroup = L.layerGroup().addTo(map);

const createPin = (location, popupCardFragment) => {
  const marker = L.marker(
    location,
    {
      icon: L.icon({
        iconUrl: '/img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      })
    });
  marker.bindPopup(popupCardFragment).addTo(markerGroup);
  return marker;
};

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

// Я столкнулся с багом, кажется: https://github.com/Leaflet/Leaflet/issues/3922?imz_s=vcmg0kjkfnvdd0nsi1sc5tqo76
// Попап открывался корректно только при первом открытии, при последующих он был пустым
// Запихнул все содержимое карточки в div, вроде стало работать (generate-property-card)
