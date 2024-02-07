

const rectangle = require('./area-peri');

const length = 50;
const width = 10;

const area = rectangle.Area(length, width);
console.log(`Area of the rectangle: ${area} `);

const perimeter = rectangle.Perimeter(length, width);
console.log(`Perimeter of the rectangle: ${perimeter} `);
