// Логика фильтрации объявлений
const typeFilterLogic = (property) => {
  const propertyType = property.offer.type;
  const desiredType = document.querySelector('#housing-type').value;
  return propertyType === desiredType || desiredType === 'any';
};

const priceFilterLogic = (property) => {
  const propertyPrice = property.offer.price;
  const desiredPrice = document.querySelector('#housing-price').value;
  if (desiredPrice === 'low' && (propertyPrice < 10000)) {
    return true;
  } else if (desiredPrice === 'middle' && 10000 < propertyPrice < 50000) {
    return true;
  } else if (desiredPrice === 'high' && propertyPrice > 50000) {
    return true;
  } else {return desiredPrice === 'any';}
};

const roomsFilterLogic = (property) => {
  const propertyRooms = property.offer.rooms;
  const desiredRooms = document.querySelector('#housing-rooms').value;
  return String(propertyRooms) === desiredRooms || desiredRooms === 'any';
};

const guestsFilterLogic = (property) => {
  const propertyGuests = property.offer.guests;
  const desiredGuests = document.querySelector('#housing-guests').value;
  return String(propertyGuests) === desiredGuests || desiredGuests === 'any';
};

const featuresFilterLogic = (property) => {
  let propertyFeatures = property.offer.features;
  if (!propertyFeatures) {
    propertyFeatures = [];
  }
  const desiredFeatures = [];
  document.querySelectorAll('input[name="features"]:checked')
    .forEach((feature) => desiredFeatures.push(feature.value));
  return desiredFeatures.every((feature) => propertyFeatures.includes(feature));
};


export {typeFilterLogic, priceFilterLogic, roomsFilterLogic, guestsFilterLogic, featuresFilterLogic};
