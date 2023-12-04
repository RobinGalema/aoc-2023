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
            return {
                value: parseInt(match[0]),
                index: match.index,
                length: match[0].length
            };
        });

        if (numbers) {
            numbers.forEach(number => {
               const index = number.index;
               const length = number.length;
               const num = number.value;

               if ((!checkRegex.test(line[index + length]) && line[index+length] != undefined) || (!checkRegex.test(line[index - 1]) && lines[index - 1] != undefined)) {
                   validNumbers.push(num);
                   return;
               }

               for (let i = index - 1; i < index + length + 1; i++) {
                    if (lines[lineIndex -1] && lines[lineIndex - 1][i] != undefined) {
                        if (lines[lineIndex -1] && !checkRegex.test(lines[lineIndex - 1][i])) {
                            validNumbers.push(num);
                            return;
                        }
                    }
                    if (lines[lineIndex + 1] && lines[lineIndex + 1][i] != undefined) {
                        if (!checkRegex.test(lines[lineIndex + 1][i])) {
                            validNumbers.push(num);
                            return;
                        }
                    }
               }
            });
        }
    });
    
    sum = validNumbers.reduce((a, b) => {
        return a + b;
    });

    return sum;
}


// read input file and parse it into array of lines
fs.readFile(testing ? 'test_input.txt' : 'input.txt', 'utf8', (err, data) => {
    console.log(solve(data));
});