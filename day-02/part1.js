let test1 = [1, 0, 0, 0, 99];
let test1Result = [2, 0, 0, 0, 99];
let test2 = [2, 3, 0, 3, 99];
let test2Result = [2, 3, 0, 6, 99];
let test3 = [2, 4, 4, 5, 99, 0];
let test3Result = [2, 4, 4, 5, 99, 9801];
let test4 = [1, 1, 1, 4, 99, 5, 6, 0, 99];
let test5Result = [30, 1, 1, 4, 2, 5, 6, 0, 99];
let debug = false;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let index = 0;
let step = 3;
let array = null;

function processOpCode() {
  // op codes 
  // 1 +
  // 2 *
  // 99 done
  let opCode = array[index];
  let valueOnePosition = array[index + 1];
  let valueTwoPosition = array[index + 2];
  let resultPosition = array[index + 3];

  switch (opCode) {
    case 1:
      add(valueOnePosition, valueTwoPosition, resultPosition);
      break;
    case 2:
      multiply(valueOnePosition, valueTwoPosition, resultPosition);
      break;
    case 99:
      console.log('output is ' + array[0]);
      return;

    default:
      console.log('there has been an error reading op code: ' + opCode)
      debugger;
      break;
  }
  
  index = index + 4;
  processOpCode();
}

function add(valueOnePosition, valueTwoPosition, resultPosition) {
  array[resultPosition] = array[valueOnePosition] + array[valueTwoPosition];
}

function multiply(valueOnePosition, valueTwoPosition, resultPosition) {
  array[resultPosition] = array[valueOnePosition] * array[valueTwoPosition];
}

lineReader.on('line', function (line) {
  if (!debug) {
    array = Array.from(line.split(',')).map(item => Number(item));
    processOpCode();
  }
});


lineReader.on('close', function () {
});


function test() {
  array = test1;
  console.log(processOpCode() === test1Result);
}


test();