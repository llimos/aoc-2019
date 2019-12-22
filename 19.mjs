import {compute} from './IntcodeComputer.mjs';

const intcode = [109,424,203,1,21102,1,11,0,1106,0,282,21101,0,18,0,1106,0,259,1202,1,1,221,203,1,21101,0,31,0,1105,1,282,21102,38,1,0,1105,1,259,20102,1,23,2,21201,1,0,3,21102,1,1,1,21101,0,57,0,1105,1,303,2101,0,1,222,20102,1,221,3,21002,221,1,2,21101,0,259,1,21101,0,80,0,1106,0,225,21102,1,152,2,21101,91,0,0,1106,0,303,1201,1,0,223,21001,222,0,4,21101,0,259,3,21102,225,1,2,21101,0,225,1,21102,1,118,0,1105,1,225,20101,0,222,3,21102,61,1,2,21101,133,0,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21102,148,1,0,1105,1,259,2101,0,1,223,21001,221,0,4,21001,222,0,3,21101,0,14,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21101,0,195,0,105,1,109,20207,1,223,2,20101,0,23,1,21102,-1,1,3,21102,214,1,0,1105,1,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,2101,0,-4,249,21202,-3,1,1,21202,-2,1,2,21201,-1,0,3,21102,1,250,0,1106,0,225,22101,0,1,-4,109,-5,2106,0,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2105,1,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,22102,1,-2,-2,109,-3,2105,1,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,21202,-2,1,3,21101,343,0,0,1106,0,303,1105,1,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,22101,0,-4,1,21101,0,384,0,1106,0,303,1105,1,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,21201,1,0,-4,109,-5,2106,0,0];

function isInRange(x, y) {
    return compute([...intcode], [x,y]).value[0];
}

function getTotalPoints(intcode, range) {
    let total = 0;
    for (let x=0; x<range; x++) for (let y=0; y<range; y++) {
        total += isInRange(x,y);
    }
    return total;
}
// console.log(getTotalPoints([...intcode], 50));


// Part 2
// Build a map
let y = 0;
let prevRowCount = 0;
let prevBeamStart = 0;
let enoughWidth = false;
while (true) {
    let x = Math.max(prevBeamStart - 1, 0); // No row's beam starts before the previous row
    let beamStart = null, beamEnd = null;
    let endBeam = false;
    while (!endBeam) {
        const here = compute([...intcode], [x,y]).value[0];
        // Special cases for the first few which don't have any cells in the row
        if (y < 10 && x > 10) {
            endBeam = true;
        }
        if (here && beamStart === null) { // First hit
            beamStart = x;
            // No row has less than prev row count - 1, so we can skip checking those
            x += Math.max(prevRowCount - 2, 1);
        } else {
            if (beamStart !== null && !here) {
                beamEnd = x - 1;
                endBeam = true;
            }
            x++;
        }
    }
    // console.log('Row', y, 'has', rowCount);
    const rowCount = beamStart && beamEnd ? beamEnd - beamStart + 1 : 0;
    prevRowCount = rowCount;
    prevBeamStart = beamStart;
    // console.log('Row',y, 'beam from', beamStart, 'to', beamEnd, 'width', rowCount);
    if (rowCount >= 100) {
        console.log('First row with width 100', y);
        // Check if 100 below it is caught
        // Test 100 below and to the left
        if (
            isInRange(beamEnd - 99, y + 99)
        ) {
            console.log('Found it', beamEnd-99, y, ' - ', beamEnd, y + 99);
            break;
        }
    }
    y++;
}