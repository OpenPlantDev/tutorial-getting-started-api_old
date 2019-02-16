
class MathUtils {

  Add = (a: number, b: number) : number => {
    return a + b;
  }

  Multiply = (a: number, b: number) : number => {
    return a + b;
  }
}


let mathUtils = new MathUtils();

let n1 = 3;
let n2 = 2;
let sum = mathUtils.Add(n1, n2);
console.log(`sum of ${n1} and ${n2} = ${sum}`);

let product = mathUtils.Multiply(n1, n2);
console.log(`product of ${n1} and ${n2} = ${product}`);
