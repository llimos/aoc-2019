function parseInput(input) {
    let rating = 0;
    const grid = input.split('\n').map((row, y) => row.split('').map((a, x) => {
        if (a === '#') {
            rating += 2 ** ((5 * y) + x);
        }
        return a === '#';
    }));
    return {grid, rating};
}

function doStep(grid) {
    const newGrid = Array(5).fill().map(()=>Array(5).fill());
    let rating = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const adj = 0 + (grid[y-1] && grid[y-1][x] ? 1 : 0) + (grid[y+1] && grid[y+1][x] ? 1 : 0) + (grid[y][x-1] ? 1 : 0) + (grid[y][x+1] ? 1 : 0);
            // console.log(x,y,grid[y][x],adj);
            if (adj === 1 || adj === 2 && !grid[y][x]) {
                newGrid[y][x] = true;
                rating += 2 ** ((5 * y) + x);
            } else {
                newGrid[y][x] = false;
            }
        }
    }
    return {grid: newGrid, rating};
}

function getRepeatedRating(input) {
    let {grid, rating} = parseInput(input);
    const seenRatings = new Set;
    do {
        // console.log({grid, rating});
        seenRatings.add(rating);
        const result = doStep(grid);
        grid = result.grid;
        rating = result.rating;
    } while (!seenRatings.has(rating));
    console.log({grid, rating});
}

const input = `..#.#
#####
.#...
...#.
##...`;

// getRepeatedRating(input);



// Part 2
// Set up 3d grid with the starting one at position 200 since there can't be more than that
// after 200 steps
const grid = input.split('\n').map(row => row.split('').map(a => a === '#' ? 1 : 0));
let system = Array(401);
system[200] = grid;
function getTop(i) {
    if (!system[i]) return 0;
    let total;
    for (let x=0;x<5;x++) total += system[i][0][x];
    return total;
}
function getBottom(i) {
    if (!system[i]) return 0;
    let total;
    for (let x=0;x<5;x++) total += system[i][4][x];
    return total;
}
function getLeft(i) {
    if (!system[i]) return 0;
    let total;
    for (let y=0;y<5;y++) total += system[i][y][0];
    return total;
}
function getRight(i) {
    if (!system[i]) return 0;
    let total;
    for (let y=0;y<5;y++) total += system[i][y][4];
    return total;
}
function getAboveMiddle(i) {
    if (!system[i]) return 0;
    return system[i][1][2];
}
function getBelowMiddle(i) {
    if (!system[i]) return 0;
    return system[i][3][2];
}
function getLeftOfMiddle(i) {
    if (!system[i]) return 0;
    return system[i][2][1];
}
function getRightOfMiddle(i) {
    if (!system[i]) return 0;
    return system[i][2][3];
}
function doStep2(system) {
    const newSystem = Array(401);
    system.forEach((level, i) => {
        const inner = system[i+1];
        const outer = system[i-1];
        level.forEach((row, y) => {
            let yAdj = 0;
            if (y === 0) yAdj += getAboveMiddle(i-1);
            else if (y === 4) yAdj += getBelowMiddle(i-1);
            row.forEach((cell, x) => {
                if (y === 2 && x === 2) continue;
                let adj = yAdj;
                if (x === 0) adj += getLeftOfMiddle(i-1);
                else if (x === 4) adj += getRightOfMiddle(i-1);
                else if (y === 1 && x === 2) adj += getTop(i+1);
                else if (y === 3 && x === 2) adj += getBottom(i+1);
                else if (y === 2 && x === 1) adj += getLeft(i+1);
                else if (y === 2 && x === 3) adj += getRight(i+1);
                // Local adj
                adj += (grid[y-1] && grid[y-1][x] || 0) + (grid[y+1] && grid[y+1][x] || 0) + (grid[y][x-1] || 0) + (grid[y][x+1] || 0);
                if (adj === 1 || adj === 2 && !grid[y][x]) {
                    newGrid[y][x] = true;
                    rating += 2 ** ((5 * y) + x);
                } else {
                    newGrid[y][x] = false;
                }
            })
        })
    });
    const newGrid = Array(5).fill().map(()=>Array(5).fill());
    let rating = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const adj = 0 + (grid[y-1] && grid[y-1][x] ? 1 : 0) + (grid[y+1] && grid[y+1][x] ? 1 : 0) + (grid[y][x-1] ? 1 : 0) + (grid[y][x+1] ? 1 : 0);
            // console.log(x,y,grid[y][x],adj);
            if (adj === 1 || adj === 2 && !grid[y][x]) {
                newGrid[y][x] = true;
                rating += 2 ** ((5 * y) + x);
            } else {
                newGrid[y][x] = false;
            }
        }
    }
    return {grid: newGrid, rating};
}