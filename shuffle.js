const _ = require("underscore");

var arr = [1,2,3,4,5,6];
// Testing _.shuffle
var testShuffle = function () {
  
  // for (let i = 0; i < 1000; i++) {
    arr = _.shuffle(arr);
  // }
  console.log(arr, " the arr")
};
testShuffle();