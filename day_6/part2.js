const fs = require('fs');
const testing = false;

const formatData = (data) => {
    const lines = data.split('\n').map(line => line.replace('\r', ''));
    let times = lines[0].match(/\d+/g).map(Number);
    let distances = lines[1].match(/\d+/g).map(Number);

    let time = parseInt(times.reduce((acc, val) => acc + val, ''));
    let distance = parseInt(distances.reduce((acc, val) => acc + val, ''));

    return {
        time: time,
        distance: distance,
    }
}

const getPushRange = (time, distance) => {
    let discriminant = Math.pow(-time, 2) - 4 * distance;

    if (discriminant < 0) {
        return false;
    } else {
        let x1 = Math.floor(Math.abs((-time + Math.sqrt(discriminant)) / 2 ) + 1);
        let x2 = Math.ceil(Math.abs((-time - Math.sqrt(discriminant)) / 2) - 1);

        console.log("The solutions are " + x1 + " and " + x2);
        
        // + 1 to be inclusive 
        return (x2 - x1) + 1;
    }
}

const solve = (input) => {
    console.time('solve');

    const race = formatData(input);
    range = getPushRange(race.time, race.distance)

    console.log(`Range is ${range}`);
    console.timeEnd('solve');
};

// read input file
fs.readFile(testing ? 'test_input.txt' : 'input.txt', 'utf8', (err, data) => {
    solve(data);
});