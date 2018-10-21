# random
another random number generator

## Installation
`npm i -D @amerani/random`

## Usage
```js
const random = require("@amerani/random");

random();  
//between MIN_SAFE_INTEGER and MAX_SAFE_INTEGER 

random(10);   
//between 0 and 10

random(-5, 5);  
//between -5 and 5

Math.trunc(random(0, 10));  
//Integer between 0 and 10
```