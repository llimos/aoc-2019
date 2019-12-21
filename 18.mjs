const input=`#########
#b.A.@.a#
#########`;

const map = input.split('\n').map(row => row.split(''));
console.log(map);

// Save locations of things
const keys = [];
let startx,starty;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === '@') {
            startx = x;
            starty = y;
        }
        else if (map[y][x] >= 'a' && map[y][x] <= 'z') {
            keys.push(map[y][x]);
        }
    }
}

function getSteps({x, y}, {x: cameFromX, y: cameFromY}, keys = []) {
    console.log(y,x,map[y][x]);
    
    const newKeys = [...keys];
    let hasNewKey = false;
    if (map[y][x] >= 'a' && map[x][y] <= 'z') {
        newKeys.push(map[x][y]);
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
        if (map[y][x] === '.') return true;
        if (map[y][x] >= 'a' && map[y][x] <= 'z') return true;
        if (map[y][x] >= 'A' && map[y][x] <= 'Z') return keys.includes(map[y][x].toLowerCase());
    }
    const possibleMoves = [];
    let steps = 0;
    if (canMoveTo(x+1, y)) possibleMoves.push({x:x+1, y});
    if (canMoveTo(x-1, y)) possibleMoves.push({x:x-1, y});
    if (canMoveTo(x, y+1)) possibleMoves.push({x, y:y+1});
    if (canMoveTo(x, y-1)) possibleMoves.push({x, y:y-1});
    
    if (possibleMoves.length === 0) return 1 + getSteps(possibleMoves[0], {x:cameFromY,y:cameFromY}, newKeys);
    else if (possibleMoves.length === 1) return 1 + getSteps(possibleMoves[0], {x,y}, newKeys);
    else return 1 + possibleMoves.reduce((minsteps, next) => Math.min(minsteps, getSteps(next, {x,y}, newKeys)));
}

console.log(getSteps({x:startx, y:starty}, {x:startx, y:starty}))