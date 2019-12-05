let test1 = [1002, 4, 3, 4, 33, 99];
let debug = false;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day-05/input.txt')
});

let input = 1;
let output = 0;
let index = 0;
let array = null;

function processOpCode() {
  let instructionSet = array[index];

  let opCode = instructionSet % 100;
  let modes = instructionSet.toString().substring(0, instructionSet.toString().length - 2).padStart(3, '0');

  // break down op code and mode
  // 1002,4,3,4
  // 02
  // param 1 - 0 address
  // param 2 - 1 value
  // param 3 - missing (so 0)

  let valueOneInstruction = array[index + 1];
  let valueTwoInsruction = array[index + 2];
  let resultPosition = array[index + 3];

  switch (opCode) {
    case 1:
      add(valueOneInstruction, valueTwoInsruction, resultPosition, modes);
      index += 4;
      break;
    case 2:
      multiply(valueOneInstruction, valueTwoInsruction, resultPosition, modes);
      index += 4;
      break;
    case 3:
      // Opcode 3 takes a single integer as input and saves it to the position given by its only parameter. 
      // For example, the instruction 3,50 would take an input value and store it at address 50.
      saveInput(valueOneInstruction)
      index += 2;
      break;
    case 4:
      // Opcode 4 outputs the value of its only parameter. For example, 
      // the instruction 4,50 would output the value at address 50.
      outputValue(valueOneInstruction, modes)
      index += 2;
      break;
    case 99:
      console.log('final output is: ' + output);
      return;

    default:
      console.log('there has been an error reading op code: ' + opCode)
      debugger;
      break;
  }

  processOpCode();
}

function add(valueOneInstruction, valueTwoInsruction, resultPosition, modes) {
  array[resultPosition] = (modes[2] == '0' ? array[valueOneInstruction] : valueOneInstruction) + (modes[1] == '0' ? array[valueTwoInsruction] : valueTwoInsruction);
}

function multiply(valueOneInstruction, valueTwoInsruction, resultPosition, modes) {
  array[resultPosition] = (modes[2] == '0' ? array[valueOneInstruction] : valueOneInstruction) * (modes[1] == '0' ? array[valueTwoInsruction] : valueTwoInsruction);
}

function saveInput(valueOneInstruction) {
  array[valueOneInstruction] = input;
}

function outputValue(valueOneInstruction, modes) {
  output = modes[2] == '0' ? array[valueOneInstruction] : valueOneInstruction

  console.log(output);
}

lineReader.on('line', function (line) {
  if (!debug) {
    array = Array.from(line.split(',')).map(item => Number(item));
    processOpCode();
  }
});


lineReader.on('close', function () {});


function test() {
  array = test1;
  console.log(processOpCode() === test1Result);
}


// test();