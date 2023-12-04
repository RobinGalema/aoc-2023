const fs = require('fs');
const numberRegex = /\d/g;

// regex for everything except numbers, letter, whitespaces and dots
const specialCharRegex = /[^a-zA-Z0-9\s\.]/g;

const getNumbers = (input) => {
    let result = [];
    let currentNumber = '';
    let startIndex = null;

    for (let i = 0; i < input.length; i++) {
        if (/\d/.test(input[i])) {
            if (currentNumber === '') {
                startIndex = i;
            }
            currentNumber += input[i];
        } else if (currentNumber !== '') {
            result.push({ index: startIndex, number: parseInt(currentNumber) });
            currentNumber = '';
        }
    }

    if (currentNumber !== '') {
        result.push({ index: startIndex, number: parseInt(currentNumber) });
    }

    return result;
}

const solve = (input) => {

    let lines = input.map(line => {
        // remove the /r from the line
        line = line.replace('\r', '');
        return line;
    });

    let validNumbers = [];

    lines.forEach(line => {
        let lineData = {
            index: lines.indexOf(line),
            line: line,
            numbers: []
        }
        let numbers = getNumbers(line);

        // for each number, 
        numbers.forEach(number => {
            let leftChar = line[number.index - 1];
            let rightChar = line[number.index + number.number.toString().length];

            // check if the number is next to a special character on the original line
            if (specialCharRegex.test(leftChar)) {
                validNumbers.push(number);
                lineData.numbers.push(number);
            }

            if (specialCharRegex.test(rightChar)) {
                validNumbers.push(number);
                lineData.numbers.push(number);
            }

            let lineAbove = lines[lines.indexOf(line) - 1];
            let lineBelow = lines[lines.indexOf(line) + 1];

            if (lineAbove) {
                // check if there is a special character on one of the indexes that the number is on
                let leftChar = lineAbove[number.index - 1];
                let rightChar = lineAbove[number.index + number.number.toString().length];

                if (specialCharRegex.test(leftChar) || specialCharRegex.test(rightChar)) {
                    validNumbers.push(number);
                    lineData.numbers.push(number);
                }

                // check each character in between and including the left and right characters
                for (let i = number.index; i < number.index + number.number.toString().length; i++) {
                    if (specialCharRegex.test(lineAbove[i])) {
                        validNumbers.push(number);
                        lineData.numbers.push(number);
                    }
                }
            }

            if (lineBelow) {
                // check if there is a special character on one of the indexes that the number is on
                let leftChar = lineBelow[number.index - 1];
                let rightChar = lineBelow[number.index + number.number.toString().length];

                if (specialCharRegex.test(leftChar) || specialCharRegex.test(rightChar)) {
                    validNumbers.push(number);
                    lineData.numbers.push(number);
                }

                 // check each character in between and including the left and right characters
                for (let i = number.index; i < number.index + number.number.toString().length; i++) {
                    if (specialCharRegex.test(lineBelow[i])) {
                        validNumbers.push(number);
                        lineData.numbers.push(number);
                    }
                }
            }

        });

        console.log(lineData);
        console.log('-------------------');
    });

    // add all the numbers in validNumbers
    let sum = 0;
    validNumbers.forEach(number => {
        sum += number.number;
    });

    // console.table(validNumbers);

    return sum;
};

fs.readFile('./test_input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const inputArray = data.split('\n');
    console.log(solve(inputArray));
});


// // 557877 -> too low
// // 560600 -> too high