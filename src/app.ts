
class MathUtils {

  public add = (a: number, b: number): number => {
    return a + b;
  }

  public multiply = (a: number, b: number): number => {
    return a + b;
  }
}

let mathUtils = new MathUtils();

let n1 = 2;
let n2 = 2;
let sum = mathUtils.add(n1, n2);
console.log(`sum of ${n1} and ${n2} = ${sum}`);

let product = mathUtils.multiply(n1, n2);
console.log(`product of ${n1} and ${n2} = ${product}`);
