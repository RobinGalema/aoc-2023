// FIXME: THIS DOES NOT WORK CORRECTLY, AS IT DOES NOT WORK FOR THE EDGE CASE DESCRIBED IN THE PROBLEM
//        ITEMS CAN SQUEEZE THROUGH GAPS BETWEEN PIPES, WHICH IS NOT ALLOWED

const fs = require('fs');
const testing = false;

const formatData = (data) => {
    const pipes = data.split('\n').map((line) => {
        return line.split('');
    });

    return pipes;
}

const findStartingPosition = (pipes) => {
    let coordinates;

    for (let i = 0; i < pipes.length; i++) {
        for (let j = 0; j < pipes[i].length; j++) {
            if (pipes[i][j] === 'S') {
                coordinates = [i, j];
                break;
            }
        }

        if (coordinates) break;
    }

    return coordinates;
}

const getMoveDirection = (input) => {
     switch (JSON.stringify(input)) {
        case JSON.stringify([1, 0]):
            return 'top';
        case JSON.stringify([-1, 0]):
            return 'bottom';
        case JSON.stringify([0, 1]):
            return 'left';
        case JSON.stringify([0, -1]):
            return 'right';
    }
}

const createArray = (pipeCoordinates, pipes) => {
    // Determine the dimensions of the new array
    const rows = pipes.length;
    const cols = pipes[0].length;

    // Create a 2D array filled with '.'
    const newArray = Array(rows).fill().map(() => Array(cols).fill('.'));

    // Iterate over pipeCoordinates and set the corresponding elements in newArray to '0'
    for (let [x, y] of pipeCoordinates) {
        newArray[x][y] = '0';
    }

    return newArray;
}

const floodFill = (newArray, visited, x, y) => {
    if (x < 0 || x >= newArray.length || y < 0 || y >= newArray[0].length || visited[x][y] || newArray[x][y] === '0') {
        return;
    }

    visited[x][y] = true;
    newArray[x][y] = 'X';

    // Orthogonal directions
    floodFill(newArray, visited, x - 1, y);
    floodFill(newArray, visited, x + 1, y);
    floodFill(newArray, visited, x, y - 1);
    floodFill(newArray, visited, x, y + 1);

    // Diagonal directions
    floodFill(newArray, visited, x - 1, y - 1);
    floodFill(newArray, visited, x - 1, y + 1);
    floodFill(newArray, visited, x + 1, y - 1);
    floodFill(newArray, visited, x + 1, y + 1);
}

const countInsidePipe = (newArray) => {
    const visited = newArray.map(row => row.map(() => false));

    // Start flood fill from all '.' on the edges
    for (let i = 0; i < newArray.length; i++) {
        if (newArray[i][0] === '.') {
            floodFill(newArray, visited, i, 0);
        }
        if (newArray[i][newArray[0].length - 1] === '.') {
            floodFill(newArray, visited, i, newArray[0].length - 1);
        }
    }
    for (let j = 0; j < newArray[0].length; j++) {
        if (newArray[0][j] === '.') {
            floodFill(newArray, visited, 0, j);
        }
        if (newArray[newArray.length - 1][j] === '.') {
            floodFill(newArray, visited, newArray.length - 1, j);
        }
    }

    let counter = 0;
    for (let i = 0; i < newArray.length; i++) {
        for (let j = 1; j < newArray[i].length - 1; j++) { // Skip the first and last columns
            if (newArray[i][j] === '.') {
                // console.log('Found a . at', i, j);
                counter++;
            }
        }
    }

    return counter;
}

const followPipes = (startingPoints, directions, pipes, start) => {
    let currentLocation1 = startingPoints[0];
    let currentLocation2 = startingPoints[1];
    let direction1 = getMoveDirection(directions[0]);
    let direction2 = getMoveDirection(directions[1]);
    let counter = 1;
    let pipeCoordinates = [start];

    while (JSON.stringify(currentLocation1) != JSON.stringify(currentLocation2)) {
        pipeCoordinates.push(currentLocation1);
        pipeCoordinates.push(currentLocation2);

        const translation1 = getDirection(pipes[currentLocation1[0]][currentLocation1[1]])[direction1];
        currentLocation1 = [currentLocation1[0] + translation1[0], currentLocation1[1] + translation1[1]];
        direction1 = getMoveDirection(translation1);

        const translation2 = getDirection(pipes[currentLocation2[0]][currentLocation2[1]])[direction2];
        currentLocation2 = [currentLocation2[0] + translation2[0], currentLocation2[1] + translation2[1]];
        direction2 = getMoveDirection(translation2);

        counter++;
    }

    pipeCoordinates.push(currentLocation1);

    const newArray = createArray(pipeCoordinates, pipes);

    // print the new array
    for (let i = 0; i < newArray.length; i++) {
        console.log(newArray[i].join(''));
    }

    const insidePipe = countInsidePipe(newArray);
    console.log(insidePipe);


    return counter;
}

const getDirection = (character) => {
    const directions = {
        '|' : {
            'top': [1, 0],
            'bottom': [-1, 0]	
        },
        '-': {
            'left': [0, 1],
            'right': [0, -1]
        },
        'L': {
            'top': [0, 1],
            'right': [-1, 0]
        },
        'J': {
            'top': [0, -1],
            'left': [-1, 0]
        },
        '7': {
            'bottom': [0, -1],
            'left': [1, 0]
        },
        'F': {
            'bottom': [0, 1],
            'right': [1, 0]
        }
    };   

    // check which character it is and return the correct direction
    return directions[character];
}

const solve = (input) => {
    console.time('solve');
    const pipes = formatData(input);
    const startingCoordinates = findStartingPosition(pipes);
    console.log('Starting coordinates are', startingCoordinates);
    const startingDirections = []
    const directions = []

    if (pipes[startingCoordinates[0] - 1] && ['|', '7', 'F'].includes(pipes[startingCoordinates[0] -1][startingCoordinates[1]])) {
        startingDirections.push([startingCoordinates[0] -1, startingCoordinates[1]])
        directions.push([-1, 0]);
    }
    if (['|', 'J', 'L'].includes(pipes[startingCoordinates[0] +1][startingCoordinates[1]])) {
        startingDirections.push([startingCoordinates[0] +1, startingCoordinates[1]])
        directions.push([1, 0]);
    }
    if (['-', 'L', 'F'].includes(pipes[startingCoordinates[0]][startingCoordinates[1] -1])) {
        startingDirections.push([startingCoordinates[0], startingCoordinates[1] -1])
        directions.push([0, -1]);
    }
    if (['-', 'J', '7'].includes(pipes[startingCoordinates[0]][startingCoordinates[1] +1])) {
        startingDirections.push([startingCoordinates[0], startingCoordinates[1] +1])
        directions.push([0, 1]);
    }

    const result = followPipes(startingDirections, directions, pipes, startingCoordinates);
    
    // console.log('The furthest point is', result, 'steps away');
    console.timeEnd('solve');
};

// read input file
fs.readFile(testing ? 'test_input.txt' : 'input.txt', 'utf8', (err, data) => {
    solve(data);
});
