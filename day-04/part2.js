let testOne = 112233; // true
let testTwo = 123444; // false
let testThree = 111122; // true

let inputStart = 123257;
let inputEnd = 647015;

let count = 0;
let results = [];

function isValid(number) {
  let previousNumber = 0;
  let atLeastOneDuplicate = false;  
  let numbers = [0,0,0,0,0,0,0,0,0,0];

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
    numbers[n]++; 
  }

  let atLeastOnePair = numbers.filter((x) => x === 2);

  return atLeastOneDuplicate && atLeastOnePair.length > 0;
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
