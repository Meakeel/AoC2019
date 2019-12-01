let test1 = 1969;
let test1Result = 966;
let test2 = 100756;
let test2Result = 50346; 
let debug = false;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let output = 0;

function calculate(rowNumber) {
  // divide by 3
  // round down
  // subtract 2
  let result = Math.floor((rowNumber / 3)) - 2;

  if (result > 0) {
    return result + calculate(result);
  }

  return 0;
}

lineReader.on('line', function (line) {
  if(!debug) {
    output += calculate(line);
  }
});


lineReader.on('close', function () {
  console.log(output);
});


function test() {
  console.log(calculate(test1) === test1Result);
  console.log(calculate(test2) === test2Result);
}


test();