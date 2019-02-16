import {MathUtils} from "./utilities/mathUtils";

const mathUtils = new MathUtils();

const n1 = 2;
const n2 = 2;
const sum = mathUtils.add(n1, n2);
console.log(`sum of ${n1} and ${n2} = ${sum}`);

const product = mathUtils.multiply(n1, n2);
console.log(`product of ${n1} and ${n2} = ${product}`);
