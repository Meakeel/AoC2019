let test1 = [
  'COM)B',
  'B)C',
  'C)D',
  'D)E',
  'E)F',
  'B)G',
  'G)H',
  'D)I',
  'E)J',
  'J)K',
  'K)L'];

let debug = false;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day-06/input.txt')
});

let orbits = []
let count = 0;

function addOrbit(orbit) {
  let objects = orbit.split(')')
  orbits[objects[1]] = objects[0];
}

function mapOrbits() {
let orbitKeys = Object.keys(orbits);

for (let i = 0; i < orbitKeys.length; i++) {
  const currentObject = orbitKeys[i];

  let nextObject = orbits[currentObject];

  while (nextObject) {
      nextObject = orbits[nextObject];
      count += 1;
  }
}
}


lineReader.on('line', function (line) {
  if (!debug) {
    addOrbit(line);
  }
});


lineReader.on('close', function () {
  mapOrbits();
  console.log('Total number of direct and indirect orbits: ' + count);

});


function test() {
  for (let i = 0; i < test1.length; i++) {
    addOrbit(test1[i]); 
  }

  mapOrbits();
  console.log('Total number of direct and indirect orbits: ' + count);
}


// test();