/*. Write a function that takes an array of numbers and the number as an input.
The function should return true if the sum of the two numbers in the array is
equal to the given number; otherwise, it should return false*/

function checkSum(arr, num) {
  let sum = arr.reduce((acc, num) => acc + num, 0);
  if (sum === num) {
    return true;
  }
  return false;
}
console.log(checkSum([1, 3, 4], 7));
checkSum([1, 3, 4], 7);
