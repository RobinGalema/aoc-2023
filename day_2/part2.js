const fs = require('fs');

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
    const powers = input.map((game) => {
        let highestBlue = 0;
        let highestRed = 0;
        let highestGreen = 0;

        let key = Object.keys(game)[0];

        game[key].forEach(element => {
            element.forEach(item => {
                let color = Object.keys(item)[0];
                let value = parseInt(item[color]);
                if (color === 'red' &&  value > highestRed) {
                    highestRed = value;
                } else if (color === 'green' && value > highestGreen) {
                    highestGreen = value;
                } else if (color === 'blue' && value > highestBlue) {
                    highestBlue = value;
                }
            });
        });

        return highestBlue * highestGreen * highestRed;
    });

    return powers.reduce((a, b) => a + b, 0);
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const inputArray = data.split('\n');
    const formattedInput = formatInput(inputArray);
    console.log(solve(formattedInput));
  });