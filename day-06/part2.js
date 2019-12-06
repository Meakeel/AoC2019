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
  'K)L'
];

let debug = false;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day-06/input.txt')
});

let orbits = []
let distances = {};

function addOrbit(orbit) {
  let objects = orbit.split(')')
  orbits[objects[1]] = objects[0];
}

function mapOrbits() {
  let orbitKeys = Object.keys(orbits);

  for (let i = 0; i < orbitKeys.length; i++) {
    let visited = [];
    let count = 0;
    let currentObject = orbitKeys[i];
    let nextObject = orbits[currentObject];

    while (nextObject) {
      nextObject = orbits[nextObject];
      count += 1;

      if (nextObject != undefined) {
        visited.push([nextObject, count]);
      }
    }

    distances[currentObject] = visited;
  }
}

function findPath() {
  let closestCommonObjectToYou = distances['YOU']
    .filter(([object]) => distances['SAN'].find(([otherObject]) => object === otherObject))
    .sort((a, b) => a[1] - b[1])[0];

  let closestCommonObjectToSan = distances['SAN']
    .find(([object]) => object === closestCommonObjectToYou[0]);

  return closestCommonObjectToYou[1] + closestCommonObjectToSan[1];
}



lineReader.on('line', function (line) {
  if (!debug) {
    addOrbit(line);
  }
});


lineReader.on('close', function () {
  mapOrbits();
  console.log('minimum number of orbital transfers required: ' + findPath());

});


function test() {
  for (let i = 0; i < test1.length; i++) {
    addOrbit(test1[i]);
  }

  mapOrbits();
  console.log('minimum number of orbital transfers required: ' + count);
}


// test();