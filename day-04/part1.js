let testOne = 111111; // true
let testTwo = 223450; // false
let testThree = 123789; // false

let inputStart = 123257;
let inputEnd = 647015;

let count = 0;
let results = [];

function isValid(number) {
  let previousNumber = 0;
  let atLeastOneDuplicate = false;

  let numberString = number.toString();

  for (let i = 0; i < numberString.length; i++) {
    let n = Number(numberString[i]);
    
    if (previousNumber > n) {
      return false;
    }

    if (n === previousNumber) {
      atLeastOneDuplicate = true;
    }

    previousNumber = n;
  }

  return atLeastOneDuplicate;;
}

function bruteMe() {
  for (let i = inputStart; i < inputEnd + 1; i++) {
    if (isValid(i)) {
      count++;
      results.push(i);
    }
  }

  console.log('total results: ' + count);
}

console.log(isValid(testOne));
console.log(isValid(testTwo));
console.log(isValid(testThree));

bruteMe();
