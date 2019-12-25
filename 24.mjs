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
function getTop(grid) {
    if (!grid) return 0;
    let total;
    for (let x=0;x<5;x++) total += grid[0][x];
    return total;
}
function getBottom(grid) {
    if (!grid) return 0;
    let total;
    for (let x=0;x<5;x++) total += grid[4][x];
    return total;
}
function getLeft(grid) {
    if (!grid) return 0;
    let total;
    for (let y=0;y<5;y++) total += grid[y][0];
    return total;
}
function getRight(grid) {
    if (!grid) return 0;
    let total;
    for (let y=0;y<5;y++) total += grid[y][4];
    return total;
}
function getAboveMiddle(grid) {
    if (!grid) return 0;
    return grid[1][2];
}
function getBelowMiddle(grid) {
    if (!grid) return 0;
    return grid[3][2];
}
function getLeftOfMiddle(grid) {
    if (!grid) return 0;
    return grid[2][1];
}
function getRightOfMiddle(grid) {
    if (!grid) return 0;
    return grid[2][3];
}
function doStep2(system) {
    const newSystem = Array(401);
    system.forEach((level, i) => {
        const newLevel = Array(5).fill().map(()=>Array(5));
        const newInnerLevel = Array(5).fill().map(()=>Array(5));
        const newOuterLevel = Array(5).fill().map(()=>Array(5));
        const inner = system[i+1];
        const outer = system[outer];
        level.forEach((row, y) => {
            let yAdj = 0;
            if (y === 0) yAdj += getAboveMiddle(i-1);
            else if (y === 4) yAdj += getBelowMiddle(i-1);
            row.forEach((cell, x) => {
                if (y === 2 && x === 2) continue;
                let adj = yAdj;
                if (x === 0) adj += getLeftOfMiddle(i-1);
                else if (x === 4) adj += getRightOfMiddle(i-1);
                else if (y === 1 && x === 2) adj += getTop(inner);
                else if (y === 3 && x === 2) adj += getBottom(inner);
                else if (y === 2 && x === 1) adj += getLeft(inner);
                else if (y === 2 && x === 3) adj += getRight(inner);
                // Local adj
                adj += (grid[y-1] && grid[y-1][x] || 0) + (grid[y+1] && grid[y+1][x] || 0) + (grid[y][x-1] || 0) + (grid[y][x+1] || 0);
                if (adj === 1 || (adj === 2 && !cell)) {
                    newGrid[y][x] = 1;
                } else {
                    newGrid[y][x] = 0;
                }
            })
        });
        // Check for creating a new level
        let newOuter = false, newInner = false;
        if (!outer) {
            // Only create if exactly 1 or 2 adjacent
            const top = getTop(newGrid);
            if (top === 1 || top === 2) {
                newOuterLevel[1][2] = 1;
                newOuter = true;
            }
            const bottom = getBottom(newGrid);
            if (bottom === 1 || bottom === 2) {
                newOuterLevel[3][2] = 1;
                newOuter = true;
            }
            const left = getLeft(newGrid)
            if (left === 1 || left === 2) {
                newOuterLevel[2][1] = 1;
                newOuter = true;
            }
            const right = getRight(newGrid);
            if (right === 1 || right === 2) {
                newOuterLevel[2][3] = 1;
                newOuter = true;
            }
        }
        if (!inner) {
            if (newGrid[1][2] === 1 || newGrid[1][2] === 2) {
                let i=0; while (i<5) newInnerLevel[0][i++] = 1;
                newInner = true;
            }
            if (newGrid[3][2] === 1 || newGrid[3][2] === 2) {
                let i=0; while (i<5) newInnerLevel[4][i] = 1;
                newInner = true;
            }
            if (newGrid[2][1] === 1 || newGrid[2][1] === 2) {
                let i=0; while (i<5) newInnerLevel[i][0] = 1;
                newInner = true;
            }
            if (newGrid[2][3] === 1 || newGrid[2][3] === 2) {
                let i=0; while (i<5) newInnerLevel[i][4] = 1;
                newInner = true;
            }
        }
        // See if this one should be kept or deleted
        let hasBugs = false;
        for (let i=0; i<5; i++) for (let j=0; j<5; j++) {
            if (newGrid[i][j]) {
                hasBugs = true;
                break;
            }
        }
        if (hasBugs) newSystem[i] = newGrid;
        if (newInner) newSystem[i+1] = newInnerLevel;
        if (newOuter) newSystem[i-1] = newOuterLevel;
    });
}