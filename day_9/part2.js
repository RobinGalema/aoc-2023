const fs = require('fs');
const testing = false;

const formatData = (input) => {
    // split on new line
    const lines = input.split('\n');

    return lines.map((line) => {     
        // split on space and parseint
        const numbers = line.split(' ').map((n) => parseInt(n));
        return numbers;
    });
}

const solve = (data) => {
    console.time('solve');
    const histories = formatData(data);
    let total = 0;

    histories.forEach((history) => {
        let differences;
        let allDifferences = [...[history]];
        
        do {
            differences = history.slice(1).map((n, i) => n - history[i]);
            allDifferences.push(differences);
            history = differences; 
        } while (differences.some((n) => n !== 0)); 


        allDifferences.reverse();
        
        let result = allDifferences.reduce((acc, curr) => {
            return curr[0] - acc;
        }, 0);

        total += result;
    });

    console.log('The answer is: ', total);
    console.timeEnd('solve');
}


// read input file
fs.readFile(testing ? 'test_input.txt' : 'input.txt', 'utf8', (err, data) => {
    solve(data);
});
