let deck = [];
let deckSize = 0;

function shuffle(input, inputDeckSize) {
    deckSize = inputDeckSize;
    let instructions = input.split(/\r|\n/);
    
    deck = [...Array(deckSize).keys()];

    instructions.forEach(instruction => {
        if (instruction.substring(0, 3) == 'Cut' || instruction.substring(0, 3) == 'cut') {
            cut(Number(instruction.substring(3)));
        } else if (instruction.substring(0, 19) == 'deal into new stack') {
            newStackReverse();
        } else if (instruction.substring(0, 19) == 'deal with increment') {
            dealWithIncrement(Number(instruction.substring(20)));
        }
    });
    return deck;
}

function newStackReverse() {
    deck.reverse();
}

function cut(n) {
    let left = deck.slice(n);
    let right = deck.slice(0, n);
    deck = left.concat(right);
}

function dealWithIncrement(n) {
    let newDeck = Array(deckSize);
    
    let originalIndex = 0
    let index = 0

    while (originalIndex < deckSize) {
      if (newDeck[index % deckSize] === undefined) {
        newDeck[index % deckSize] = deck[originalIndex]
        originalIndex++
      }

      index =  index + n
    }

    deck = newDeck;
}


let testOne = `deal with increment 7
deal into new stack
deal into new stack`;

let testTwo = `Cut 6
deal with increment 7
deal into new stack`;

let testThree = `deal with increment 7
deal with increment 9
Cut -2`;

let testFour = `deal into new stack
Cut -2
deal with increment 7
Cut 8
Cut -4
deal with increment 7
Cut 3
deal with increment 9
deal with increment 3
Cut -1`;

let cutTest = shuffle('Cut 3', 10).join(' ');
console.log(cutTest == '3 4 5 6 7 8 9 0 1 2');

let cutNegativeTest = shuffle('Cut -4', 10).join(' ');
console.log(cutNegativeTest == '6 7 8 9 0 1 2 3 4 5');

let dealNewStackTest = shuffle('deal into new stack', 10).join(' ');
console.log(dealNewStackTest == '9 8 7 6 5 4 3 2 1 0');

let dealWithIncrementTest = shuffle('deal with increment 3', 10).join(' ');
console.log(dealWithIncrementTest == '0 7 4 1 8 5 2 9 6 3');

let result = shuffle(testOne, 10).join(' ');
console.log(result == '0 3 6 9 2 5 8 1 4 7');

let resultTwo = shuffle(testTwo, 10).join(' ');
console.log(resultTwo == '3 0 7 4 1 8 5 2 9 6');

let resultThree = shuffle(testThree, 10).join(' ');
console.log(resultThree == '6 3 0 7 4 1 8 5 2 9');

let resultFour = shuffle(testFour, 10).join(' ');
console.log(resultFour == '9 2 5 8 1 4 7 0 3 6');

let puzzleInput = `deal with increment 64
deal into new stack
cut 1004
deal with increment 31
cut 5258
deal into new stack
deal with increment 5
cut -517
deal with increment 67
deal into new stack
cut -4095
deal with increment 27
cut 4167
deal with increment 30
cut -5968
deal into new stack
deal with increment 40
deal into new stack
deal with increment 57
cut -5128
deal with increment 75
deal into new stack
deal with increment 75
cut -1399
deal with increment 12
cut -2107
deal with increment 9
cut -7110
deal into new stack
deal with increment 14
cut 3318
deal into new stack
deal with increment 57
cut -8250
deal with increment 5
deal into new stack
cut 903
deal with increment 28
deal into new stack
cut 2546
deal with increment 68
cut 9343
deal with increment 67
cut -6004
deal with increment 24
deal into new stack
cut -816
deal with increment 66
deal into new stack
deal with increment 13
cut 5894
deal with increment 43
deal into new stack
cut 4550
deal with increment 67
cut -3053
deal with increment 42
deal into new stack
deal with increment 32
cut -5985
deal with increment 18
cut -2808
deal with increment 44
cut -1586
deal with increment 16
cut 2173
deal with increment 53
cut 5338
deal with increment 48
cut -2640
deal with increment 36
deal into new stack
deal with increment 13
cut -5520
deal with increment 61
cut -3199
deal into new stack
cut 4535
deal with increment 17
cut -4277
deal with increment 72
cut -7377
deal into new stack
deal with increment 37
cut 6665
deal into new stack
cut 908
deal into new stack
cut 9957
deal with increment 31
cut 9108
deal with increment 44
cut -7565
deal with increment 33
cut -7563
deal with increment 23
cut -3424
deal with increment 63
cut -3513
deal with increment 74`;

let puzzleAnswer = shuffle(puzzleInput, 10007);
let answer = puzzleAnswer.findIndex((x) => x === 2019);

console.log(`answer is ${answer}`);