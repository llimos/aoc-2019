function newStack(deck) {
    return deck.reverse();
}

function cut(deck, n) {
    if (n >= 0) {
        const spliced = deck.splice(0, n);
        return [...deck, spliced];
    } else {
        const spliced = deck.splice(n);
        return [...spliced, deck];
    }
}

function deal(deck, increment) {
    let next = 0;
    const newDeck = [];
    const length = deck.length;
    while (deck.length >= 0) {
        newDeck[(next++ * increment) % length] = deck.shift();
    }
    return newDeck;
}

