const fs = require('fs');
const testing = false;

const formatInput = (input) => {
    const lines = input.split('\n').map(line => line.replace('\r', ''));

    const hands = lines.map(line => {
        let parts = line.split(' ');

        return {
            'hand' : parts[0],
            'bid' : parseInt(parts[1]),
        }
    });

    return hands;
}

const getHandValue = (hand) => {
    let charMap = {};
    let maxCharValue = 0;

    for(let char of hand) {
        if(charMap.hasOwnProperty(char)) {
            charMap[char]++;
        } else {
            charMap[char] = 1;
        }

        if(charMap[char] > maxCharValue) {
            maxCharValue = charMap[char];
        }
    }

    return {
        maxCount: maxCharValue,
        uniqueCount: Object.keys(charMap).length
    };
}

const solve = (input) => {
    console.time('solve')
    const hands = formatInput(input);
    let handsWithStrength = [];

    
    hands.forEach(hand => {
        const handValue = getHandValue(hand.hand);

        let strength = 0;

        if (handValue.maxCount === 5) strength = 6;
        else if (handValue.maxCount === 4) strength = 5;
        else if (handValue.maxCount === 3 && handValue.uniqueCount === 2) strength = 4;
        else if (handValue.maxCount === 3 && handValue.uniqueCount === 3) strength = 3;
        else if (handValue.maxCount === 2 && handValue.uniqueCount === 3) strength = 2;
        else if (handValue.maxCount === 2 && handValue.uniqueCount === 4) strength = 1;
        else if (handValue.maxCount === 1) strength = 0;

        handsWithStrength.push({ hand: hand.hand, strength: strength, bid: hand.bid });
    });

    const cardStrengths = { 'A': 12, 'K': 11, 'Q': 10, 'J': 9, 'T': 8, '9': 7, '8': 6, '7': 5, '6': 4, '5': 3, '4': 2, '3': 1, '2': 0 };

    handsWithStrength.sort((a, b) => {
        if (a.strength !== b.strength) {
            return a.strength - b.strength;
        } else {
            for (let i = 0; i < a.hand.length; i++) {
                if (cardStrengths[a.hand[i]] !== cardStrengths[b.hand[i]]) {
                    return cardStrengths[a.hand[i]] - cardStrengths[b.hand[i]];
                }
            }
            return 0; 
        }
    });

    let total = 0;
    handsWithStrength.forEach((hand, i) => {
        total += hand.bid * (i + 1);
    });

    console.log(`The total is ${total}`);
    console.timeEnd('solve');
};

// read input file
fs.readFile(testing ? 'test_input.txt' : 'input.txt', 'utf8', (err, data) => {
    solve(data);
});