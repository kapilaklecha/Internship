/*Given a string S(input consisting) of ‘*’ and ‘#’. The length of the string is variable. The
task is to find the minimum number of ‘*’ or ‘#’ to make it a valid string. The string is
considered valid if the number of ‘*’ and ‘#’ are equal. The ‘*’ and ‘#’ can be at any
position in the string.
Note: The output will be a positive or negative integer based on the number of ‘*’ and ‘#’
in the input string.
Hint: (*>#): positive integer, (#>*): negative integer, (#=*): 0
Example 1:
Input 1:
###*** -> Value of S
Output :
● 0 → number of * and # are equal */

function validString(input) {
  let str = input.split("");
  let star = 0;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "*") {
      star++;
    } else if (str[i] === "#") {
      hash++;
    }
  }

  if (star > hash) {
    return "positive integer";
  } else if (star < hash) {
    return "negative integer";
  }
  return 0;
}
