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

const followPipes = (startingPoints, directions, pipes, start) => {
    let currentLocation1 = startingPoints[0];
    let currentLocation2 = startingPoints[1];
    let direction1 = getMoveDirection(directions[0]);
    let direction2 = getMoveDirection(directions[1]);
    let counter = 1;

    while (JSON.stringify(currentLocation1) != JSON.stringify(currentLocation2)) {
        const translation1 = getDirection(pipes[currentLocation1[0]][currentLocation1[1]])[direction1];
        currentLocation1 = [currentLocation1[0] + translation1[0], currentLocation1[1] + translation1[1]];
        direction1 = getMoveDirection(translation1);

        const translation2 = getDirection(pipes[currentLocation2[0]][currentLocation2[1]])[direction2];
        currentLocation2 = [currentLocation2[0] + translation2[0], currentLocation2[1] + translation2[1]];
        direction2 = getMoveDirection(translation2);

        counter++;
    }

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
    const startingDirections = []
    const directions = []

    if (['|', '7', 'F'].includes(pipes[startingCoordinates[0] -1][startingCoordinates[1]])) {
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
    
    console.log('The furthest point is', result, 'steps away');
    console.timeEnd('solve');
};

// read input file
fs.readFile(testing ? 'test_input.txt' : 'input.txt', 'utf8', (err, data) => {
    solve(data);
});
