let test1 = [0, 1, 2, 3, 4];
let debug = false;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day-07/input.txt')
});

let maxOutput = [];
let isFirstInput = true;
let input = 0;
let secondInput = 0;
let output = 0;
let index = 0;
let array = null;


const getPermutations = (set = []) => {
  const permutations = [];

  const permute = (candidates = [], sequence = []) => {
    if (!candidates.length) {
      permutations.push(sequence);

      return;
    }

    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];
      permute(
        [...candidates.filter((x) => x !== candidate)],
        [...sequence, candidate]
      );
    }
  };

  permute(set);

  return permutations;
};

function processOpCode() {
  let instructionSet = array[index];

  let opCode = instructionSet % 100;
  let modes = instructionSet.toString().substring(0, instructionSet.toString().length - 2).padStart(3, '0');

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
    case 5:
      jumpIfTrue(valueOneInstruction, valueTwoInsruction, modes);
      break;
    case 6:
      jumpIfFalse(valueOneInstruction, valueTwoInsruction, modes);
      break;
    case 7:
      isLessThan(valueOneInstruction, valueTwoInsruction, resultPosition, modes);
      index += 4;
      break;
    case 8:
      isEqual(valueOneInstruction, valueTwoInsruction, resultPosition, modes);
      index += 4;
      break;
    case 99:
      console.log('run output is: ' + output);
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
  if (isFirstInput) {
    array[valueOneInstruction] = input;
    isFirstInput = false;
  } else {
    array[valueOneInstruction] = secondInput;
  }
}

function outputValue(valueOneInstruction, modes) {
  output = modes[2] == '0' ? array[valueOneInstruction] : valueOneInstruction

  console.log(output);
}

function jumpIfTrue(valueOneInstruction, valueTwoInsruction, modes) {
  if ((modes[2] == '0' ? array[valueOneInstruction] : valueOneInstruction) !== 0) {
    index = modes[1] == '0' ? array[valueTwoInsruction] : valueTwoInsruction;
    return;
  }

  index += 3;
}

function jumpIfFalse(valueOneInstruction, valueTwoInsruction, modes) {
  if ((modes[2] == '0' ? array[valueOneInstruction] : valueOneInstruction) === 0) {
    index = modes[1] == '0' ? array[valueTwoInsruction] : valueTwoInsruction;
    return;
  }

  index += 3;
}

function isLessThan(valueOneInstruction, valueTwoInsruction, resultPosition, modes) {
  array[resultPosition] = (modes[2] == '0' ? array[valueOneInstruction] : valueOneInstruction) < (modes[1] == '0' ? array[valueTwoInsruction] : valueTwoInsruction) ? 1 : 0;
}

function isEqual(valueOneInstruction, valueTwoInsruction, resultPosition, modes) {
  array[resultPosition] = (modes[2] == '0' ? array[valueOneInstruction] : valueOneInstruction) === (modes[1] == '0' ? array[valueTwoInsruction] : valueTwoInsruction) ? 1 : 0;
}

lineReader.on('line', function (line) {
  if (!debug) {
    originalArray = Array.from(line.split(',')).map(item => Number(item));
  }
});


lineReader.on('close', function () {
  if (!debug) {

    const phases = getPermutations([0, 1, 2, 3, 4]);

    for (let j = 0; j < phases.length; j++) {
      output = 0;
      secondInput = 0;

      for (let i = 0; i < 5; i++) {
        isFirstInput = true;
        input = phases[j][i];
        array = originalArray.slice(0);
        index = 0;

        processOpCode();

        // get the output ready for the next one
        secondInput = output;
      }

      maxOutput.push({
        output: output,
        phase: phases[j]
      });
    }

    let max = maxOutput.sort((a,b) => a.output < b.output ? 1 : -1);
    console.log('Max found signal output is: ' + max[0].output);
  }

});


function test() {
  array = test1;
  console.log(processOpCode() === test1Result);
}


// test();