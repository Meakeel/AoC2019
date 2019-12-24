let map = [];
let minutes = 0;
const bug = '#';
const empty = '.'

function createMap(input) {
    let rows = input.split(/\r|\n/);
    map = [];

    rows.forEach(row => {
        map.push([...row.split('')]);
    });
}

function processMinute() {
    var newMap = map.map(function(row) {
        return row.slice();
    });

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let tile = map[i][j];

            let howManyAdjacentBugs = checkForAdjacentBugs(i, j);
            
            if (tile === bug && howManyAdjacentBugs !== 1) {
                newMap[i][j] = empty;
            }
            
            if (tile === empty && (howManyAdjacentBugs === 1 || howManyAdjacentBugs === 2)) {
                newMap[i][j] = bug;
            }
        }
    }

    map = newMap.map(function(row) {
        return row.slice();
    });
}

function checkForAdjacentBugs(i, j) {
    let count = 0;

    if (i > 0) {
        map[i - 1][j] === bug ? count++ : count;        
    }
    if (i < 4) {
        map[i + 1][j] === bug ? count++ : count;        
    }

    map[i][j - 1] === bug ? count++ : count;
    map[i][j + 1] === bug ? count++ : count;

    return count;
}

function stringMap(){
    mapResult = '';
    map.forEach((row, i) => {
        mapResult += `${row.join('')}`;
    });
    return mapResult;
}

function run(input, minutes) {
    createMap(input);

    let counter = 0;
    let results = [];
    let match = false;
    let result = 0;

    results.push(stringMap());

    while (match === false) {
        processMinute();
        let stringedMap = stringMap();
        result = results.indexOf(stringedMap);

        if (result > 0) {
            match = true;
        }

        results.push(stringedMap);

        counter++;
    }

    let stringedMap = stringMap();
    let total = 0;


    for (let i = 0; i < stringedMap.length; i++) {
        total = total + (stringedMap[i] === bug ? 2 ** i : 0);
        
    }

    return total;
}

2,147,483,648 

// let testInput = 
// `....#
// #..#.
// #..##
// ..#..
// #....`;

// let resultOneMinutes = `#..#.
// ####.
// ###.#
// ##.##
// .##..`;

// let resultTwoMinutes = `#####
// ....#
// ....#
// ...#.
// #.###`;

// let resultThreeMinutes = `#....
// ####.
// ...##
// #.##.
// .##.#`;

// let resultFourMinutes = `####.
// ....#
// ##..#
// .....
// ##...`;

// console.log(run(testInput, 1) === resultOneMinutes);
// console.log('');
// console.log(run(testInput, 2) === resultTwoMinutes);
// console.log('');
// console.log(run(testInput, 3) === resultThreeMinutes);
// console.log('');
// console.log(run(testInput, 4) === resultFourMinutes);

let input = `###..
.##..
#....
##..#
.###.`;
console.log(run(input));