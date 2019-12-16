import IntcodeComputer from './IntcodeComputer.mjs';

const intcode = [3,1033,1008,1033,1,1032,1005,1032,31,1008,1033,2,1032,1005,1032,58,1008,1033,3,1032,1005,1032,81,1008,1033,4,1032,1005,1032,104,99,1001,1034,0,1039,1002,1036,1,1041,1001,1035,-1,1040,1008,1038,0,1043,102,-1,1043,1032,1,1037,1032,1042,1105,1,124,1001,1034,0,1039,1001,1036,0,1041,1001,1035,1,1040,1008,1038,0,1043,1,1037,1038,1042,1106,0,124,1001,1034,-1,1039,1008,1036,0,1041,101,0,1035,1040,1001,1038,0,1043,102,1,1037,1042,1105,1,124,1001,1034,1,1039,1008,1036,0,1041,1002,1035,1,1040,101,0,1038,1043,101,0,1037,1042,1006,1039,217,1006,1040,217,1008,1039,40,1032,1005,1032,217,1008,1040,40,1032,1005,1032,217,1008,1039,5,1032,1006,1032,165,1008,1040,35,1032,1006,1032,165,1102,1,2,1044,1106,0,224,2,1041,1043,1032,1006,1032,179,1102,1,1,1044,1105,1,224,1,1041,1043,1032,1006,1032,217,1,1042,1043,1032,1001,1032,-1,1032,1002,1032,39,1032,1,1032,1039,1032,101,-1,1032,1032,101,252,1032,211,1007,0,44,1044,1105,1,224,1102,0,1,1044,1106,0,224,1006,1044,247,1002,1039,1,1034,1001,1040,0,1035,1001,1041,0,1036,1002,1043,1,1038,102,1,1042,1037,4,1044,1105,1,0,5,26,24,17,68,40,71,9,36,46,67,39,48,8,20,23,12,47,28,13,47,2,68,17,71,31,63,31,83,14,78,31,8,33,30,63,30,5,7,11,91,97,17,84,23,37,46,6,14,59,1,76,41,63,85,83,86,63,33,13,50,17,37,16,59,8,7,35,71,9,23,67,46,62,58,38,76,3,71,43,17,64,29,30,72,91,17,70,21,15,76,31,89,20,38,27,65,53,60,34,90,99,56,15,45,57,8,52,70,36,15,79,32,35,83,78,10,3,90,16,74,14,84,43,20,81,91,25,71,83,24,31,92,72,34,59,27,78,6,31,14,31,76,9,80,63,35,40,92,12,84,65,41,27,82,10,7,56,25,70,4,98,16,37,65,46,78,11,97,20,16,95,98,24,31,3,57,74,42,99,36,34,74,10,81,46,43,97,2,24,61,55,13,96,41,41,46,14,64,2,46,94,53,3,3,81,37,85,7,54,29,90,22,75,47,20,26,86,69,53,89,17,2,55,13,85,99,90,2,48,29,66,55,31,19,39,59,56,98,28,38,10,46,10,62,20,63,18,53,97,9,32,6,46,3,91,24,6,62,30,73,26,24,50,3,16,78,3,34,50,8,18,40,65,64,21,28,30,87,45,99,8,21,77,40,73,38,56,12,86,64,43,61,89,4,55,47,28,14,8,99,52,51,40,82,26,19,68,17,53,70,5,14,22,64,69,84,14,69,2,80,18,79,5,66,18,34,48,31,34,54,50,8,33,73,38,52,94,71,7,31,94,31,93,66,82,39,40,42,80,91,70,10,6,50,35,96,13,7,89,22,58,30,24,85,81,88,55,7,58,38,91,55,11,35,84,28,87,26,78,48,66,11,88,8,18,68,55,38,6,1,57,60,1,8,99,58,21,29,88,32,32,57,72,8,20,45,5,91,39,51,59,82,29,52,37,33,49,5,28,38,17,6,58,67,11,72,51,42,4,3,12,94,84,25,31,72,32,89,49,4,23,57,49,27,38,50,30,23,15,80,4,12,67,14,48,76,91,58,11,63,37,95,1,15,22,84,8,23,87,61,32,78,87,7,47,1,81,31,84,91,21,19,68,6,87,3,72,43,60,23,67,42,40,62,9,86,33,84,69,24,97,37,49,24,67,2,16,52,3,42,49,3,95,84,61,8,40,79,10,74,51,6,77,63,1,66,7,55,24,80,68,17,30,47,54,30,77,40,99,18,85,99,85,2,27,18,33,54,99,27,5,64,39,22,66,12,71,29,26,35,49,13,41,22,76,30,70,30,75,34,7,5,62,1,23,61,43,90,24,91,40,42,75,48,40,91,39,46,38,56,17,28,51,56,7,51,40,56,22,87,43,99,6,58,93,35,47,83,10,57,55,68,34,68,93,28,55,11,3,53,80,9,41,42,50,95,7,4,84,10,91,33,12,99,98,60,76,73,24,70,46,72,27,36,62,27,25,43,59,39,9,95,72,9,17,79,36,52,52,22,4,55,57,16,19,65,62,83,11,76,73,37,89,21,86,6,88,17,93,1,59,8,48,73,90,96,10,85,46,12,99,16,16,76,4,2,2,45,62,30,12,14,72,60,9,19,71,43,41,36,99,69,38,1,1,48,32,33,83,26,15,51,19,31,71,92,8,49,34,87,32,80,73,28,65,95,7,8,85,12,63,22,83,8,70,1,82,96,59,29,95,43,59,72,68,38,48,11,87,54,90,11,93,30,63,12,96,41,64,21,89,24,94,73,79,18,55,40,95,0,0,21,21,1,10,1,0,0,0,0,0,0];
const computer = new IntcodeComputer(intcode);

// Use a Map with strings to store the locations, since they might be negative
const grid = new Map;
let x = 0, y = 0;
let found = false;
main_loop: while (!found) {
    printGrid(grid, x, y);
    for (const dir of [1,2,3,4]) {
        let newX = x, newY = y, tried_all = false;
        if (dir === 1) {
            newY--;
        } else if (dir === 2) {
            newY++;
        } else if (dir === 3) {
            newX--;
        } else if (dir === 4) {
            newX++;
        }
        const newLocation = `${newX},${newY}`;
        // If it's somewhere we've been before, skip it unless it's the only thing left
        if (!tried_all && grid.has(newLocation)) {
            continue;
        }
        console.log('Turning', dir);
        const {value: [status]} = computer.run(dir);
        console.log('Result', status);
        grid.set(newLocation, status);
        if (status === 1 || status === 2) {
            x = newX;
            y = newY;
            if (status === 2) {
                found = true;
            }
            continue main_loop;
        } else if (status === 0) {
            if (dir === 4) {
                tried_all = true;
            }
        }
    }
}
console.log('Found it', grid);

function printGrid(grid, droidX, droidY) {
    grid = new Map(grid.entries());
    grid.set(`${droidX},${droidY}`, 'D');
    // Find the lowest x and y
    const mins = Array.from(grid.keys()).reduce((acc, coords) => {
        const [x, y] = coords.split(',');
        return {minX: Math.min(x, acc.maxX), minY: Math.min(y, acc.minY), maxX: Math.max(x, acc.maxX), maxY: Math.max(y, acc.maxY)};
    }, {minX: 0, minY: 0, maxX: 0, maxY: 0});
    const display = new Array(mins.maxY - mins.minY + 1).fill().map(undefined => new Array(mins.maxX - mins.minX + 1).fill(' '));
    for (const [coords, status] of grid.entries()) {
        let [x, y] = coords.split(',');
        x -= mins.minX;
        y -= mins.minY;
        const symbol = status === 0 ? '#' : status === 1 ? '.' : status === 2 ? 'O' : status === 'D' ? 'D' :'!';
        display[y] = display[y] || [];
        display[y][x] = symbol;
    }
    // console.log(display); return;
    console.log('\n\n'+display.map(row => row.join('')).join('\n'));
}


const stepsToTarget = {};

// TODO Recursive function with backtracking for each potential direction
function getMinStepsToTarget(x, y, steps = 0) {
    // Get potential directions from grid, not already visited
    let minSteps = Infinity;
    for (const direction of [1,2,3,4]) {
        let newX = x, newY = y;
        if (dir === 1) {
            newY--;
        } else if (dir === 2) {
            newY++;
        } else if (dir === 3) {
            newX--;
        } else if (dir === 4) {
            newX++;
        }
        // Check if already visited
        if (stepsToTarget[newX] && stepsToTarget[newX][newY]) {
            minSteps = Math.min(minSteps, steps + 1 + stepsToTarget[x]);
        } else if (!stepsToTarget[x] || !(y in stepsToTarget[x])) {
            const toTarget = getMinStepsToTarget(newX, newY, steps + 1);
            
            if (toTarget) {
                minSteps = Math.min(minSteps, toTarget);
            }
        } else {
            // No way to target from here
        }
    }
    // Iterate through them
    // If has path to destination, calculate & return
    // If not, go through
    // If returns false, backtrack 
    // and then try the next one
    // If all return false, return false
}