function newStack(deck) {
    return deck.reverse();
}

function cut(n, deck) {
    if (n >= 0) {
        const spliced = deck.splice(0, n);
        return [...deck, ...spliced];
    } else {
        const spliced = deck.splice(n);
        return [...spliced, ...deck];
    }
}

function deal(increment, deck) {
    let next = 0;
    const newDeck = [];
    const length = deck.length;
    while (deck.length > 0) {
        newDeck[(next++ * increment) % length] = deck.shift();
    }
    return newDeck;
}

function createDeck(cards) {
    return new Array(cards).fill().map((a,i)=>i);
}
// const deck = new Array(10).fill().map((a,i)=>i);
// console.log(newStack(newStack(deal(7, [...deck]))));
// console.log(cut(-1, deal(3, deal(9, cut(3, deal(7, cut(-4, cut(8, deal(7, cut(-2, newStack([...deck])))))))))));

function parseAndShuffle(input, deck) {
    const steps = input.split('\n');
    let step;
    while (step = steps.shift()) {
        if (step === 'deal into new stack')
            deck = newStack(deck);
        else if (step.startsWith('cut'))
            deck = cut(parseInt(step.split(' ')[1]), deck);
        else if (step.startsWith('deal with increment'))
            deck = deal(parseInt(step.split(' ')[3]), deck);
    }
    return deck;
}

const input = `deal with increment 34
cut 9781
deal with increment 20
cut 8981
deal with increment 11
cut -3391
deal with increment 15
cut 1485
deal with increment 10
cut 4826
deal into new stack
cut 1026
deal with increment 30
cut 1354
deal with increment 46
cut 1955
deal with increment 19
cut 1359
deal with increment 22
cut 9483
deal with increment 52
cut -2090
deal with increment 50
deal into new stack
cut -2205
deal with increment 69
cut -7934
deal with increment 11
cut 8311
deal with increment 42
cut -5430
deal with increment 57
deal into new stack
cut -2616
deal with increment 22
deal into new stack
cut 3540
deal with increment 38
cut -9097
deal with increment 37
cut -7014
deal with increment 26
cut 6983
deal with increment 11
deal into new stack
cut -4825
deal into new stack
cut -5791
deal with increment 19
cut -3577
deal with increment 6
deal into new stack
deal with increment 29
cut 7299
deal with increment 75
cut -8498
deal with increment 21
cut 5748
deal with increment 63
cut -344
deal with increment 5
cut -4306
deal with increment 65
cut 9431
deal with increment 7
cut 6825
deal with increment 28
deal into new stack
deal with increment 66
cut -1421
deal with increment 19
cut -8965
deal with increment 48
cut -5780
deal with increment 75
cut -3280
deal with increment 50
cut 6866
deal with increment 72
cut -5471
deal with increment 49
cut -8247
deal with increment 65
cut 3056
deal into new stack
deal with increment 39
cut 7011
deal with increment 48
cut -9660
deal with increment 56
cut -6843
deal into new stack
cut 5111
deal with increment 29
cut -7700
deal into new stack
deal with increment 23
cut -5263
deal with increment 61
deal into new stack`;
console.log(parseAndShuffle(input, createDeck(10007)).indexOf(2019));

function getPosition(input, cards, position) {
    const steps = input.split('\n');
    let step;
    while (step = steps.shift()) {
        if (step === 'deal into new stack')
            position = cards - position;
        else if (step.startsWith('cut')) {
            const cut = parseInt(step.split(' ')[1]);
            if (cut >= 0) {
                if (position < cut) {
                    position += (cards - cut);
                } else {
                    position -= cut;
                }
            } else {
                if (position < cards - cut) {
                    position -= cut;
                } else {
                    position -= cut;
                }
            }
        } else if (step.startsWith('deal with increment'))
            position = position * parseInt(step.split(' ')[3]) % cards;
    }
    return position;
}




function getReversePosition(input, cards, position) {
    const steps = input.split('\n');
    let step;
    while (step = steps.pop()) {
        if (step === 'deal into new stack')
            position = cards - position;
        else if (step.startsWith('cut')) {
            const cut = parseInt(step.split(' ')[1]);
            if (cut >= 0) {
                if (position < cards - cut) {
                    position += cut;
                } else {
                    position -= (cards - cut)
                }
            } else {
                if (position > -cut) {
                    position += cut;
                } else {
                    position += cards + cut;
                }
            }
        } else if (step.startsWith('deal with increment')) {
            const increment = parseInt(step.split(' ')[3]);
            // Find which round we added it in
            const placedEachRound = cards / increment;
            const round = position % increment;
            const placingsPerRound = Math.floor(cards / increment);
            // Find an integer multiple of the increment
            let result, i = 0;
            do {
                result = ((i++ * cards) + position) / increment;
            } while (!Number.isInteger(result));
            position = result;
        }
        // console.log(step, position, `(-${cards-position})`);
    }
    return position;
}



function repeatReverseShuffle(input, cards, repeat, position) {
    let i = 0, currentPosition = position, prevPosition;
    do {
        console.log(i, currentPosition, 'diff', currentPosition - prevPosition, 'ratio', currentPosition / prevPosition);
        prevPosition = currentPosition;
        currentPosition = getReversePosition(input, cards, currentPosition);
        i++;
        // if (i % 100000 === 0) console.log(i, currentPosition);
    } while (currentPosition !== position && i < repeat);
    console.log('Got back to', position, 'after', i, 'iterations');
}
console.log(repeatReverseShuffle(input, 119315717514047, 101741582076661, 2020));


// It must be we can come up with a formula for the nth term
// Arithmetic or geometric series?