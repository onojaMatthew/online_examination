const _ = require("underscore");

var arr = [4,5,2,3,6.1];
// Testing _.shuffle
var testShuffle = function () {
  for (let i = 0; i < 3; i++) {
    const shuffle = _.shuffle(arr)
    const mappedArr = shuffle.map(a => a);
    console.log(shuffle, " the shuffled")
    console.log(mappedArr, " the arr")
  }
  
};
testShuffle();