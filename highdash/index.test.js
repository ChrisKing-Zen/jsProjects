const { forEach, map } = require("./index.js");
const assert = require("assert").strict;

// let sum = 0;

// forEach([1, 2, 3], value => {
//   sum += value;
// });

// if (sum !== 6) {
//   throw new Error("Expected Array to equal 6");
// }

// mapResult = map([1, 2, 3], value => {
//   return value * 2;
// });

// if (mapResult[0] != 2) {
//   throw new Error(
//     `1st number should == 2, but turned out to be ${mapResult[0]}`
//   );
// }

// if (mapResult[1] != 4) {
//   throw new Error(`2st number should == 4, but turned out to be ${mapResult}`);
// }

// if (mapResult[2] != 6) {
//   throw new Error(
//     `3st number should == 6, but turned out to be ${mapResult[2]}`
//   );
// }

it("The map function", () => {
  const result = map([1, 2, 3], value => {
    return value * 2;
  });
  assert.deepStrictEqual(result, [2, 4, 6]);
});
