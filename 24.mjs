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
        console.log({grid, rating});
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

getRepeatedRating(input);
