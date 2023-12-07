const fs = require('fs');
const testing = false;

const mapAlmanac = (mapping, x) => {
    let y = -1;

    for (const row of mapping) {
        const [end, start, count] = row.split(" ").map(Number);

        if (x >= start && x <= start + count) {
            y = end - start + x;
            break;
        }
    }

    return y === -1 ? x : y;
}

const solve = (data) => {
    console.time("solve");
    let lines = data.split("\n\n");

    const seeds = lines[0]
        .split("seeds: ")
        .filter((x) => x)[0]
        .split(" ")
        .map((x) => parseInt(x));

    lines.shift();
    
    const maps = lines.map((line) => {
        let values = line
            .split(":")[1]
            .split("\n")
            .filter((x) => x)

        return values;
    });
    

    let currentMap = 0;
    let lastResult = seeds;

    while (currentMap < maps.length) {
        lastResult = lastResult.map((x) => mapAlmanac(maps[currentMap], x));
        currentMap++;
    }

    console.log(`The lowest location is:  ${Math.min(...lastResult)}`);
    console.timeEnd("solve");

}

fs.readFile(testing ? 'test_input.txt' : 'input.txt', 'utf8', (err, data) => {
    solve(data);
});