const fs = require('fs');
const testing = true;

let seeds;
let foundValues = []
let finalNumbers = [];

// FIXME: this code will work but will take a literal eternity to finish

const formatInput = (input) => {

    // split on empty lines windows
    lines = input.split(/\n\s*\n/)
    lines = lines.map(line => line.replace(/\r/g, ''));

    // split each line on : make an object with the left part the key and the right part the value
    lines = lines.map(line => {
        const split = line.split(':');
        let obj = {};

        // remove map from split[0]
        key = split[0].replace( ' map', '');
        values = split[1].split('\n');

        // remove empty strings
        values = values.filter(value => value != '');

        values = values.map(value => {
            return value.split(' ').map(val => parseInt(val));
        })

        obj[key] = values;

        return obj;
    });

    // remove object with key seeds from lines and store it in seeds
    seeds = lines.filter(line => line.seeds != undefined)[0];

    if (seeds.seeds[0].includes(NaN)){
        seeds.seeds[0] = seeds.seeds[1];
    }
    seeds = seeds.seeds[0];

    // divide seeds in pairs of 2
    seeds = seeds.reduce((acc, seed, index) => {
        if (index % 2 == 0) {
            acc.push([seed, seeds[index + 1]]);
        }
        return acc;
    }, []);

    // remove seeds from lines
    lines = lines.filter(line => line.seeds == undefined);
    
    return lines;

};

const findNextNumber = (number, rules, index, callback) => {
    // get the key of the object
    let nextNumber = number;
    let indexNumber = index;
    
    if (indexNumber < rules.length) {
        const key = Object.keys(rules[indexNumber])[0];
        rules[indexNumber][key].forEach(rule => {
            let max = rule[1] + rule[2];           
            if (number >= rule[1] && number <= max) {
                // check if the current number with also the current index is in foundValues and get the index in the array for the first match
                let foundIndex = foundValues.findIndex(foundValue => foundValue.number == number && foundValue.index == indexNumber);

                if (foundIndex != -1) {
                    nextNumber = foundValues[foundIndex].nextNumber;
                } else {
                    for (let i = 0; i < rule[2]; i++) {
                        if (number == rule[1] + i) {
                            nextNumber = rule[0] + i;
                            foundValues.push({
                                number: number,
                                nextNumber: nextNumber,
                                index: indexNumber
                            });
                            return;
                        }
                    }
                }
            }
            
        });
        findNextNumber(nextNumber, rules, indexNumber + 1, callback);
    }
    else {
        callback(nextNumber);
        return;
    }
}

const solve = (input) => {
    const rules = formatInput(input);
    let seedNumbers = [];
    seeds.forEach(seed => {
        seedNumbers.push(seed[0]);
        let range = seed[1];

        // get all numbers in range
        for (let i = 1; i < range; i++) {
            seedNumbers.push(seedNumbers[i - 1] + 1);
        }
    });

    seedNumbers.forEach(number => {
        findNextNumber(number, rules, 0, (nextNumber) => {
            finalNumbers.push(nextNumber);
            console.log('Final Number is: ', nextNumber);

            // smallest number in finalNumbers
            if (finalNumbers.length == seedNumbers.length) {
                console.log('------------------');
                console.log('The Smallest Number is: ', Math.min(...finalNumbers));
            }
        });
    });
};

// read input file and parse it into array of lines
fs.readFile(testing ? 'test_input.txt' : 'input.txt', 'utf8', (err, data) => {
    solve(data);
});