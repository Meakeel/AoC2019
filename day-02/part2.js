let debug = false;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let index = 0;
let step = 4;
let array = null;
let answerFound = false;

function processOpCode() {
  // op codes 
  // 1 +
  // 2 *
  // 99 done
  let opCode = array[index];
  let valueOnePosition = array[index + 1];
  let valueTwoPosition = array[index + 2];
  let resultPosition = array[index + 3];
  
  if (array[0] === 19690720) {
    answerFound = true;
    return;
  }

  switch (opCode) {
    case 1:
      add(valueOnePosition, valueTwoPosition, resultPosition);
      break;
    case 2:
      multiply(valueOnePosition, valueTwoPosition, resultPosition);
      break;
    case 99:
      return;

    default:
      console.log('there has been an error reading op code: ' + opCode)
      break;
  }

  index = index + step;
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
    let originalArray = Array.from(line.split(',')).map(item => Number(item));

    let counter = 0;
    let noun = 0
    let verb = 0;

    while (answerFound === false) {
      array = originalArray.slice(0);
      array[1] = noun;
      array[2] = verb;
      
      processOpCode();

      if(!answerFound){
        if (noun > 99) {
          noun = 0;
          verb = verb + 1;
          continue;
        }

        noun = noun + 1;
        counter = counter + 1;
        index = 0;
      }

      if (noun > 99 && verb > 99) {
        console.log('error with the data');
        return;
      }

      if (counter > 10100) {
        console.log('too many loops');
        return;
      }
    }

    console.log('verb is: ' + verb);
    console.log('noun is: ' + noun);
    console.log('answer is: ' + 100 * (noun + verb));
  }
});


lineReader.on('close', function () {
});