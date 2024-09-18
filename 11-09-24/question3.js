/*
An automobile company manufactures both a two wheeler (TW) and a four wheeler
(FW). A company manager wants to make the production of both types of vehicle
according to the given data below:
● 1st data, Total number of vehicles (two-wheeler + four-wheeler)=v
● 2nd data, Total number of wheels = W
The task is to find the number of two-wheelers and four-wheelers that need to be manufactured
based on the given data.:
Input :
200 -> Value of V
540 -> Value of W
*/

// cant figur out correct solution there is a mistake in tw equation
function vehicles(v, w) {
  let tw = v - w / 2; // here it is giving a negative number.
  let fw = v - tw;

  if (tw >= 0 && fw >= 0 && tw % 2 == 0) {
    return [fw, tw];
  }
  return "no solution found";
}
