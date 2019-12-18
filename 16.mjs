const input = '12345678'.split('').map(a => parseInt(a));
const basePattern = [0, 1, 0, -1];

function getPatternMultiplierForPosition(i, position) {
    return basePattern[(Math.floor((position + 1) / (i + 1)) % basePattern.length)];
}

function getOutputForI(input, i) {
    let total = 0;
    for (let position = 0; position < input.length; position++) {
        const multiplier = getPatternMultiplierForPosition(i, position);
        // console.log(position, multiplier, multiplier * input[position]);
        total += multiplier * input[position];
    }
    return Math.abs(total % 10);
}

function getOutput(input, map) {
    let output = '';
    // multiplicationMap = map || getMultiplicationMap(input.length);
    for (let i = 0; i < input.length; i++) {
        output += getOutputForI(input, i).toString();
        // output += input[i] * multiplicationMap[i];
        // if (i % 1000 === 0) console.log('Done', i+1, 'digits');
    }
    return output;
}

function getOutputAfter(input, times) {
    const map = getMultiplicationMap(input.length);
    for (let i = 1; i <= times; i++) {
        input = getOutput(input, map);
        console.log('Completed', i, 'times');
    }
    return input;
}

// console.log(getOutput(input));
// console.log(getOutputForI(input, 0));
// console.log(getOutputForI(input, 0));
const realinput = '59780176309114213563411626026169666104817684921893071067383638084250265421019328368225128428386936441394524895942728601425760032014955705443784868243628812602566362770025248002047665862182359972049066337062474501456044845186075662674133860649155136761608960499705430799727618774927266451344390608561172248303976122250556049804603801229800955311861516221350410859443914220073199362772401326473021912965036313026340226279842955200981164839607677446008052286512958337184508094828519352406975784409736797004839330203116319228217356639104735058156971535587602857072841795273789293961554043997424706355960679467792876567163751777958148340336385972649515437';
console.log(getOutputAfter('59780176309114213563411626026169666104817684921893071067383638084250265421019328368225128428386936441394524895942728601425760032014955705443784868243628812602566362770025248002047665862182359972049066337062474501456044845186075662674133860649155136761608960499705430799727618774927266451344390608561172248303976122250556049804603801229800955311861516221350410859443914220073199362772401326473021912965036313026340226279842955200981164839607677446008052286512958337184508094828519352406975784409736797004839330203116319228217356639104735058156971535587602857072841795273789293961554043997424706355960679467792876567163751777958148340336385972649515437', 100).slice(parseInt(realinput.slice(7)), 8));

// Part 2 - Optimization
// Work out how many of each position to multiply by. This never changes.

function getMultiplicationMap(messageLength) {
    const result = [];
    for (let i = 0; i < messageLength; i++) {
        let multiplier = 0;
        for (let row = 0; row < messageLength; row++) {
            multiplier += getPatternMultiplierForPosition(row, i);
        }
        result[i] = multiplier;
    }
    return result;
}

// console.log(getMultiplicationMap(realinput.length * 10000));


// Plan B
// Work out the repeating pattern of the 10,000 repeats
import {lcm} from "./utils";