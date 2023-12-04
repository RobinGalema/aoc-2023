const fs = require('fs');

// create a dictionary to couple written out numbers to int values
const numbersDic = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4, 
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    '1' : 1,
    '2' : 2,
    '3' : 3,
    '4' : 4,
    '5' : 5,
    '6' : 6,
    '7' : 7,
    '8' : 8,
    '9' : 9
};

const calculateCalibrationValue = (input) => {
    let totals = [];

    input.forEach((element) => {
        let numbers = [];

        // find ALL occurences of keys in the numbersDic in the string element
        let digitRegex = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g
        numbers = element.matchAll(digitRegex);

        // order the numbers on the index
        let orderedNumbers = Array.from(numbers).sort((a, b) => a.index - b.index);

        // Get the values
        let values = orderedNumbers.map((number) => numbersDic[number[1]]);
        
        let firstValue = values[0];
        let lastValue = values[values.length - 1];
        
        let sum = `${firstValue}${lastValue}`;

        totals.push(parseInt(sum));
    });
    

    // sum all numbers in totals
    let result = totals.reduce((a, b) => a + b, 0);
    return result;

};

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) throw err;
  const inputArray = data.split('\n');
  const result = calculateCalibrationValue(inputArray);
  console.log(result);
});