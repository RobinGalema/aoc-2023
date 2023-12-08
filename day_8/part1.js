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

const solve = (data) => {
    console.time('solve');

    [instructions, nodeMap] = formatInput(data);

    let currentLocation = 'AAA';
    let stepCount = 0;

    while (currentLocation !== 'ZZZ') {
        const currentNode = nodeMap[currentLocation];
        const nextInstruction = instructions[stepCount % instructions.length];
        const nextNode = nodeMap[currentNode.values[nextInstruction]];

        currentLocation = nextNode.key;
        stepCount++;
    }

    console.log(`The amount of steps needed to reach ZZZ are: ${stepCount}`);
    console.timeEnd('solve');
}

// read input file
fs.readFile(testing ? 'test_input.txt' : 'input.txt', 'utf8', (err, data) => {
    solve(data);
});
