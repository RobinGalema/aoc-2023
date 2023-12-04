const fs = require('fs');
const testing = false;

const solve = (input) => {
    // remove all windows line breaks
    input = input.replace(/\r/g, '');
    // split on line breaks
    const lines = input.split('\n');

    // regex for all numbers and . in string
    const checkRegex = /[0-9.]/;
    let validNumbers = [];

    lines.map((line, lineIndex) => {
        const regex = /\d+/g;
        let numbers = [...line.matchAll(regex)].map(match => {
            // add the indexes of each digit in the number to an array
            indexes = [];
            for (let i = match.index; i < match.index + match[0].length; i++) {
                indexes.push(i);
            }

            return {
                value: parseInt(match[0]),
                line: lineIndex,
                index: match.index,
                indexes: indexes,
                length: match[0].length
            };
        });

        if (numbers) {
            numbers.forEach(number => {
               const index = number.index;
               const length = number.length;
               const num = number.value;

               if ((!checkRegex.test(line[index + length]) && line[index+length] != undefined) || (!checkRegex.test(line[index - 1]) && lines[index - 1] != undefined)) {
                   validNumbers.push(number);
                   return;
               }

               for (let i = index - 1; i < index + length + 1; i++) {
                    if (lines[lineIndex -1] && lines[lineIndex - 1][i] != undefined) {
                        if (lines[lineIndex -1] && !checkRegex.test(lines[lineIndex - 1][i])) {
                            validNumbers.push(number);
                            return;
                        }
                    }
                    if (lines[lineIndex + 1] && lines[lineIndex + 1][i] != undefined) {
                        if (!checkRegex.test(lines[lineIndex + 1][i])) {
                            validNumbers.push(number);
                            return;
                        }
                    }
               }
            });
        }
    });

    let totalGearRatio = 0;

    lines.forEach((line, lineIndex) => {
        // check if character is '*'
        const regex = /\*/g;
        let gears = [...line.matchAll(regex)].map(match => {
            return match.index;
        });

        gears.forEach(gear => {
            // Get the coordinates (line, index) of the spots around the gear, including diagonals
            let spots = [
                { line: lineIndex - 1, index: gear - 1 },
                { line: lineIndex - 1, index: gear },
                { line: lineIndex - 1, index: gear + 1 },
                { line: lineIndex, index: gear - 1 },
                { line: lineIndex, index: gear + 1 },
                { line: lineIndex + 1, index: gear - 1 },
                { line: lineIndex + 1, index: gear },
                { line: lineIndex + 1, index: gear + 1 }
            ];

            let gearNumbers = [];

            // for each spot, check if there is a valid number on that spot
            spots.forEach(spot => {
                validNumbers.forEach(number => {
                    if (number.line == spot.line && number.indexes.includes(spot.index) && !gearNumbers.includes(number)) {
                        gearNumbers.push(number);
                    }
                });
            });

            if (gearNumbers.length == 2) {
                const gearRatio = gearNumbers[0].value * gearNumbers[1].value;
                totalGearRatio += gearRatio;
            }
        });
    });

    return totalGearRatio;
}


// read input file and parse it into array of lines
fs.readFile(testing ? 'test_input.txt' : 'input.txt', 'utf8', (err, data) => {
    console.log(solve(data));
});