const input=`#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################`;

const map = input.split('\n').map(row => row.split(''));
// console.log(map);

// Save locations of things
const allkeys = [];
let startx,starty;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === '@') {
            startx = x;
            starty = y;
        }
        else if (map[y][x] >= 'a' && map[y][x] <= 'z') {
            allkeys.push(map[y][x]);
        }
    }
}

function getSteps({x, y}, {x: cameFromX, y: cameFromY}, branchFrom, branchKeys, keys = [], indent = 0) {
    const ind = ' '.repeat(indent);
    // console.log(ind, y,x,map[y][x]);
    
    const newKeys = [...keys];
    if (newKeys.length === allkeys.length) {
        // console.log('Found it', newKeys)
        return 0;
    }
    if (branchFrom && x === branchFrom.x && y === branchFrom.y && newKeys.length === branchKeys) {
        // We got back to the start point without adding any new keys
        // Return an array of which doors block the way
        return Infinity;
    }
    let hasNewKey = false;
    if (map[y][x] >= 'a' && map[y][x] <= 'z' && !newKeys.includes(map[y][x])) {
        newKeys.push(map[y][x]);
        hasNewKey = true;
    }

    // Continue moving until there's a choice
    // When there's a choice, follow both directions and see which has the least steps

    // Get possible next moves
    function canMoveTo(x, y) {
        if (!map[y]) return false;
        if (!map[y][x]) return false;
        if (map[y][x] === '#') return false;
        if (x === cameFromX && y === cameFromY && !hasNewKey) return false;
        if (map[y][x] === '.' || map[y][x] === '@') return true;
        if (map[y][x] >= 'a' && map[y][x] <= 'z') return true;
        if (map[y][x] >= 'A' && map[y][x] <= 'Z') return keys.includes(map[y][x].toLowerCase());
    }
    const possibleMoves = [];
    let steps = 0;
    if (canMoveTo(x+1, y)) possibleMoves.push({x:x+1, y});
    if (canMoveTo(x-1, y)) possibleMoves.push({x:x-1, y});
    if (canMoveTo(x, y+1)) possibleMoves.push({x, y:y+1});
    if (canMoveTo(x, y-1)) possibleMoves.push({x, y:y-1});
    
    let minStepsFromHere = Infinity;
    if (possibleMoves.length === 0) {
        // We're stuck. If we got more keys than when we branched, go back the way we came, otherwise bail
        if (newKeys.length > branchKeys) {
            const steps = getSteps({x:cameFromX,y:cameFromY}, {x,y}, branchFrom, branchKeys, newKeys, ind);
            if (steps !== false) {
                return steps + 1;
            } else {
                return steps;
            }
        }
        else {
            return false;
        }
    }
    else if (possibleMoves.length === 1) {
        const steps = getSteps(possibleMoves[0], {x,y}, branchFrom, branchKeys, newKeys, ind);
        if (steps !== false) {
            return steps + 1;
        } else {
            return steps;
        }
    }
    else {
        const steps = possibleMoves.reduce((minsteps, next) => {
            // console.log(ind, 'Trying alternative', i, 'from', x, y)
            const steps = getSteps(next, {x,y}, {x,y}, newKeys.length, newKeys, ind+1);
            // console.log(ind, 'Did it in', steps, 'steps')
            if (steps !== false) {
                return Math.min(minsteps);
            } else {
                return minsteps;
            }
        }, Infinity);
        return (steps < Infinity) ? steps : false;
    }
}

console.log(getSteps({x:startx, y:starty}, {x:startx, y:starty}) - 1)