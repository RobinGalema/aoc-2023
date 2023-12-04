const fs = require('fs');

let rules = {
    'red' : 12,
    'green' : 13,
    'blue' : 14,
}

const formatInput = (input) => {
    let sortedInput = input.map((item) => {
        let splitItems = item.split(': ');
        let key= splitItems[0];
        let items = splitItems[1].split('; ');
        items = items.map((item) => {
            values = item.split(', ');

            let valuesObject = values.map((value) => {
                let key = value.split(' ')[1];
                key = key.split('\r')[0];
                value = value.split(' ')[0];
                return {[key]: value}
            });

            return valuesObject;
        });

        return {[key]: items};
    })

    return sortedInput;
}

const solve = (input) => {
    let validGames = input.filter((game) => {
        let valid = true;
        let key = Object.keys(game)[0];

        game[key].forEach(elements => {
            elements.forEach(element => {
                let elementKey = Object.keys(element)[0];
                let elementValue = element[elementKey];
                let ruleValue = rules[elementKey];
                if (elementValue > ruleValue) {
                    valid = false;
                }
            });

        });

        return valid;
    })

    // Get the number in the key of the valid games
    let validGamesKeys = validGames.map((game) => {
        let key =  Object.keys(game)[0];
        return parseInt(key.split(' ')[1]);
    });
    
    // add the numbers together
    let sum = validGamesKeys.reduce((a, b) => a + b, 0);
    return sum;   
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const inputArray = data.split('\n');
    const formattedInput = formatInput(inputArray);
    console.log(solve(formattedInput));
  });