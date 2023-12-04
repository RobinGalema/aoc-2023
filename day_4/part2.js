// require fs
const fs = require('fs');
const testing = false;

let cardTotals;

const solve = (input) => {
    console.time('solve');
    // remove all windows line breaks
    input = input.replace(/\r/g, '');
    // split on line breaks
    const lines = input.split('\n');

    cardTotals = lines.map((line) => {
        return 1;
    })

    lines.map((line, index) => {
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

        let amount = foundNumbers.length; 

        for (let j = 0; j < cardTotals[index]; j++) {
            for (let i = 0; i < amount; i++) {
                if (index + 1 + i >= lines.length) {
                    continue;
                }
                cardTotals[index + 1 + i] = cardTotals[index + 1 + i] + 1;
            }            
        }
        console.log(cardTotals);    
    });

    let total = cardTotals.reduce((a, b) => {
        return a + b;
    });

    console.timeEnd('solve');
    return total;
}

// read input file
fs.readFile(testing ? 'test_input.txt' : 'input.txt', 'utf8', (err, data) => {
    console.log(solve(data));
});



