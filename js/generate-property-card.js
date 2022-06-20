import {generateProperty} from './generate-property.js';

const PROPERTY_TYPE_VOCABULARY = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель'
};

const generatePropertyCard = (qty = 1) => {
  const generatedProperties = generateProperty(qty);
  const canvas = document.querySelector('#map-canvas');
  const propertyListFragment = document.createDocumentFragment();
  const cardTemplate = document.querySelector('#card');
  generatedProperties.forEach((property) => {
    const propertyCard = cardTemplate.content.cloneNode(true);
    propertyCard.querySelector('.popup__title').textContent = property.offer.title;
    propertyCard.querySelector('.popup__text--address').textContent = property.offer.address;
    propertyCard.querySelector('.popup__text--price').textContent = `${property.offer.price} ₽/ночь`;
    propertyCard.querySelector('.popup__type').textContent = PROPERTY_TYPE_VOCABULARY[property.offer.type];
    propertyCard.querySelector('.popup__text--capacity').textContent = `${property.offer.rooms} комнаты для ${property.offer.guests} гостей`;
    propertyCard.querySelector('.popup__text--time').textContent = `Заезд после ${property.offer.checkin}, выезд до ${property.offer.checkout}`;
    propertyCard.querySelector('.popup__description').textContent = property.offer.description;
    propertyCard.querySelector('.popup__avatar').textContent = property.author.avatar;

    if (!property.offer.title) {propertyCard.querySelector('.popup__title').classList.add('hidden');}
    if (!property.offer.address) {propertyCard.querySelector('.popup__text--address').classList.add('hidden');}
    if (!property.offer.price) {propertyCard.querySelector('.popup__text--price').classList.add('hidden');}
    if (!property.offer.type) {propertyCard.querySelector('.popup__type').classList.add('hidden');}
    if (!property.offer.rooms || !property.offer.guests) {propertyCard.querySelector('.popup__text--capacity').classList.add('hidden');}
    if (!property.offer.checkin || !property.offer.checkout) {propertyCard.querySelector('.popup__text--time').classList.add('hidden');}
    if (!property.offer.description) {propertyCard.querySelector('.popup__description').classList.add('hidden');}

    const photosContainer = propertyCard.querySelector('.popup__photos');
    const photosList = photosContainer.querySelectorAll('.popup__photo');
    if (!property.offer.photos) {
      photosContainer.classList.add('hidden');
    } else {
      property.offer.photos.forEach((photoSource) => {
        const photoElement = photosList[0].cloneNode(true);
        photoElement.src = photoSource;
        photosContainer.appendChild(photoElement);
      });
      photosList[0].remove();
    }

    const featuresContainer = propertyCard.querySelector('.popup__features');
    const featuresList = featuresContainer.querySelectorAll('.popup__feature');
    if (!property.offer.features) {
      featuresContainer.classList.add('hidden');
    } else {
      featuresList.forEach((featureListItem) => {
        const hasThisFeature = property.offer.features.some((feature) => featureListItem.classList.contains(`popup__feature--${feature}`));
        if (!hasThisFeature) {
          featureListItem.remove();
        }
      });
    }
    propertyListFragment.appendChild(propertyCard);
  });

  canvas.appendChild(propertyListFragment);
};

export {generatePropertyCard};

