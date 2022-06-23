import {generatePropertyCard} from './generate-property-card.js';
import {toActiveState, toInactiveState} from './forms.js';


const GENERATED_OBJECTS_QTY = 1; // Число имуществ, которое нужно сгенерировать

generatePropertyCard(GENERATED_OBJECTS_QTY);

toInactiveState();
//toActiveState();

