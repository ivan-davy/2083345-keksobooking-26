import {generateProperty} from './generate-property.js';


const GENERATED_OBJECTS_QTY = 10; // Число имуществ, которое нужно сгенерировать
const properties = [];

// Демонстрация сгенерированных имуществ

console.log(generateProperty());

for (let i = 0; i <= GENERATED_OBJECTS_QTY - 1; i++) {
  properties.push(generateProperty(i + 1));
}
console.log(properties);
