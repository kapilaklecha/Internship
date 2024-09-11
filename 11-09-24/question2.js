/*
Write the program to give the following output on given inputs
a. Example 1:
Input: a1b10
Output: abbbbbbbbbb
b. Example 2:
Input:b3c6d15
Output: bbbccccccddddddddddddddd
Note: The numbers get veries from 1 to 99
*/

function decode(code) {
  let output = "";
  let char = "";
  let i = 0;
  while (i < code.length) {
    let char = code[i];
    i++;
    let num = "";
    while (i < code.length && !isNaN(input[i])) {
      num += code[i];
      i++;
    }
    let count = parseInt(num);
    output += char.repeat(count);
  }
  return output;
}
