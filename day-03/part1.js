// let testOne = 'R8,U5,L5,D3';
// let testTwo = 'U7,R6,D4,L4';
let testOne = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
let testTwo = 'U62,R66,U55,R34,D71,R55,D58,R83';

let testThree = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51';
let testFour = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7';

let testResult = 159;
let testTwoResult = 135;
let debug = false;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let position;
let map;
let inputs = [];

function plotArray(array) {
  position = [0, 0];
  map = [];

  for (let i = 0; i < array.length; i++) {
    let instruction = array[i];

    switch (instruction.direction) {
      case "R":
        moveRight(instruction.movement);
        break;
      case "L":
        moveLeft(instruction.movement);
        break;
      case "U":
        moveUp(instruction.movement);
        break;
      case "D":
        moveDown(instruction.movement);
        break;

      default:
        console.log('unkown instruction');
        debugger;
        break;
    }
  }

  return map;
}

function moveRight(movement) {
  for (let i = 0; i < movement; i++) {
    position[0] = position[0] + 1;
    fillPosition();
  }
}

function moveLeft(movement) {
  for (let i = 0; i < movement; i++) {
    position[0] = position[0] - 1;
    fillPosition();
  }
}

function moveUp(movement) {
  for (let i = 0; i < movement; i++) {
    position[1] = position[1] - 1;
    fillPosition();
  }
}

function moveDown(movement) {
  for (let i = 0; i < movement; i++) {
    position[1] = position[1] + 1;
    fillPosition();
  }
}

function fillPosition() {
  map.push(JSON.stringify(position));
}

function getCloest(mapOne, mapTwo) {
  return mapOne
    .filter((position) => mapTwo.includes(position))
    .map((position) => position.replace('[', '').replace(']', '').split(',').map(Number))
    .map(([x, y]) => Math.abs(x) + Math.abs(y))
    .sort((a, b) => a - b)[0];
}

lineReader.on('line', function (line) {
  if (!debug) {
    let array = Array.from(line.split(',')).map(item => ({
      direction: item.substring(0, 1),
      movement: Number(item.substring(1))
    }));

    map = [];
    inputs.push(array);
  }
});


lineReader.on('close', function () {
  if (!debug) {
    console.log('running');
    let mapOne = plotArray(inputs[0]);
    let mapTwo = plotArray(inputs[1]);
    console.log('smallest distance is: ' + getCloest(mapOne, mapTwo));
  }
});


function test() {
  let arrayOne = Array.from(testOne.split(',')).map(item => ({
    direction: item.substring(0, 1),
    movement: Number(item.substring(1))
  }));

  let arrayTwo = Array.from(testTwo.split(',')).map(item => ({
    direction: item.substring(0, 1),
    movement: Number(item.substring(1))
  }));

  let mapOne = plotArray(arrayOne);
  let mapTwo = plotArray(arrayTwo);
  console.log('smallest distance is: ' + getCloest(mapOne, mapTwo));
}

function test2() {
  let arrayOne = Array.from(testThree.split(',')).map(item => ({
    direction: item.substring(0, 1),
    movement: Number(item.substring(1))
  }));

  let arrayTwo = Array.from(testFour.split(',')).map(item => ({
    direction: item.substring(0, 1),
    movement: Number(item.substring(1))
  }));

  let mapOne = plotArray(arrayOne);
  let mapTwo = plotArray(arrayTwo);
  console.log('smallest distance is: ' + getCloest(mapOne, mapTwo));
}

test();
map = [];
test2();
map = [];