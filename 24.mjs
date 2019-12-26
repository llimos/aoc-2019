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
// const input = `....#
// #..#.
// #.?##
// ..#..
// #....`;
// getRepeatedRating(input);



// Part 2

function getTop(grid) {
    if (!grid) return 0;
    let total = 0;
    for (let x=0;x<5;x++) total += grid[0][x] || 0;
    return total;
}
function getBottom(grid) {
    if (!grid) return 0;
    let total = 0;
    for (let x=0;x<5;x++) total += grid[4][x] || 0;
    return total;
}
function getLeft(grid) {
    if (!grid) return 0;
    let total = 0;
    for (let y=0;y<5;y++) total += grid[y][0] || 0;
    return total;
}
function getRight(grid) {
    if (!grid) return 0;
    let total = 0;
    for (let y=0;y<5;y++) total += grid[y][4] || 0;
    return total;
}
function getAboveMiddle(grid) {
    if (!grid) return 0;
    return grid[1][2] || 0;
}
function getBelowMiddle(grid) {
    if (!grid) return 0;
    return grid[3][2] || 0;
}
function getLeftOfMiddle(grid) {
    if (!grid) return 0;
    return grid[2][1] || 0;
}
function getRightOfMiddle(grid) {
    if (!grid) return 0;
    return grid[2][3] || 0;
}

function doStep2(system) {
    const newSystem = [];
    // Add one more level at top and bottom, to grow into
    system.unshift(Array(5).fill().map(()=>Array(5).fill(0)));
    system.push(Array(5).fill().map(()=>Array(5).fill(0)));
    system.forEach((level, i) => {
        let hasBugs = false;
        const newLevel = Array(5).fill().map(()=>Array(5).fill(0));
        const inner = system[i+1];
        const outer = system[i-1];
        level.forEach((row, y) => {
            let yAdj = 0;
            if (y === 0) yAdj += getAboveMiddle(outer);
            else if (y === 4) yAdj += getBelowMiddle(outer);
            const leftOfMiddle = getLeftOfMiddle(outer);
            const rightOfMiddle = getRightOfMiddle(outer);
            row.forEach((cell, x) => {
                if (y === 2 && x === 2) return;
                let adj = yAdj;
                if (x === 0) adj += leftOfMiddle;
                else if (x === 4) adj += rightOfMiddle;
                else if (y === 1 && x === 2) adj += getTop(inner);
                else if (y === 3 && x === 2) adj += getBottom(inner);
                else if (y === 2 && x === 1) adj += getLeft(inner);
                else if (y === 2 && x === 3) adj += getRight(inner);
                // Local adj
                adj += (level[y-1] && level[y-1][x] || 0) + (level[y+1] && level[y+1][x] || 0) + (level[y][x-1] || 0) + (level[y][x+1] || 0);
                if (adj === 1 || (adj === 2 && !cell)) {
                    newLevel[y][x] = 1;
                    hasBugs = true;
                } else {
                    newLevel[y][x] = 0;
                }
            })
        });
        if (hasBugs || (newSystem.length > 0 && i < system.length - 1)) {
            newSystem.push(newLevel);
        }
    });
    return newSystem;
}

// Set up 3d grid with the starting one at position 200 since there can't be more than that
// after 200 steps
let system = [input.split('\n').map(row => row.split('').map(a => a === '#' ? 1 : 0))];
// console.log(system);
// console.log(doStep2(system));

let i=0; while (i++<200) system = doStep2(system);
console.log(system);
let total = 0;
for (const level of system) for (const row of level) for (const cell of row) total += cell;
console.log(total);