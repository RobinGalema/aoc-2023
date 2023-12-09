const fs = require('fs');
const testing = false;

const formatInput = (data) => {
    const groups = data.split('\n\n');
    const instructions = groups[0].split('').map((x) => x === 'L' ? 0 : 1);
    const nodesData = groups[1].split('\n');

    const nodeMap = nodesData.reduce((map, nodeData) => {
        const key = nodeData.substring(0, 3);
        let values = nodeData.match(/\(([^)]+)\)/)[1]
            .split(',')
            .map((x) => x.trim());

        map[key] = {
            key: key,
            values: values
        };

        return map;
    }, {});

    return [instructions, nodeMap];
}

// Function to calculate gcd (Greatest Common Divisor)
const gcd = (a, b) => {
    if (b === 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}

// Function to calculate lcm (Least Common Multiple)
const lcm = (a, b) => {
    return (a * b) / gcd(a, b);
}

const solve = (data) => {
    console.time('solve');

    [instructions, nodeMap] = formatInput(data);

    // Get all locations that end with A
    let currentLocations = Object.keys(nodeMap).filter((key) => key.endsWith('A'));

    // Find the number of steps each location takes to reach a 'Z' ending state
    let steps = currentLocations.map((currentLocation) => {
        let stepCount = 0;
        while (!currentLocation.endsWith('Z')) {
            const currentNode = nodeMap[currentLocation];
            const nextInstruction = instructions[stepCount % instructions.length];
            currentLocation = nodeMap[currentNode.values[nextInstruction]].key;
            stepCount++;
        }
        return stepCount;
    });

    // Find the lcm of the number of steps
    let totalSteps = steps.reduce(lcm);

    console.log(`Steps needed for all locations to end with 'Z': ${totalSteps}`);
    console.timeEnd('solve');
}

// read input file
fs.readFile(testing ? 'test_input.txt' : 'input.txt', 'utf8', (err, data) => {
    solve(data);
});
