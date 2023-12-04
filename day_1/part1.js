// require fs
const fs = require('fs');

const calculateCalibrationValue = (input) => {
    let totals = [];

    input.forEach((element) => {

        // check if there is a number in the string element
        if (!element.match(/-?\d+/g)) {
            return;
        }

        // Get the first and the last number in the string element numbers need to be split so they are no bigger then 9
        const numbers = element.match(/-?\d/g);
        let firstNumber = numbers[0];
        let lastNumber = numbers[numbers.length - 1];

        // check if the last number is not NaN
        if (isNaN(lastNumber)) {
            lastNumber = firstNumber;
        }

        const total = `${firstNumber}${lastNumber}`
        console.log(total);

        totals.push(parseInt(total));
    });

    // add all numbers in the array
    const result = totals.reduce((a, b) => a + b, 0);
    return result
};

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) throw err;
  const inputArray = data.split('\n');
  const result = calculateCalibrationValue(inputArray);
  console.log(result);
});