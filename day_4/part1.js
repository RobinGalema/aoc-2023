// require fs
const fs = require('fs');
const testing = false;

const solve = (input) => {
    // remove all windows line breaks
    input = input.replace(/\r/g, '');
    // split on line breaks
    const lines = input.split('\n');

    const scratchValues = lines.map((line) => {
        let gameData = line.split(': ')[1];
        let cardData = gameData.split(' | ');

        cardData = cardData.map((card) => {
            return card.replace(/  /g, ' ');
        });
        
        cardData = cardData.map((card) => {
            return card.split(' ');
        });

        let winningNumbers = cardData[0];
        let scratchedNumbers = cardData[1];

        // convert winningNumbers and scratchedNumbers to numbers
        winningNumbers = winningNumbers.map((num) => {
            return parseInt(num);
        });

        scratchedNumbers = scratchedNumbers.map((num) => {
            return parseInt(num);
        });

        // check how many numbers in scratchedNumbers are in winningNumbers
        let foundNumbers = [];
        scratchedNumbers.forEach((num) => {
            if (winningNumbers.includes(num) && !foundNumbers.includes(num)) {
                foundNumbers.push(num);
            }
        });

        // remove any NaNs from foundNumbers
        foundNumbers = foundNumbers.filter((num) => {
            return !isNaN(num);
        });
        
        if (foundNumbers.length == 0) {
            return 0;
        }

        let value = Math.pow(2, foundNumbers.length - 1);

        return value;
    });

    let total = scratchValues.reduce((a, b) => {
        return a + b;
    });

    return total;
}

// read input file and parse it into array of lines
fs.readFile(testing ? 'test_input.txt' : 'input.txt', 'utf8', (err, data) => {
    console.log(solve(data));
});