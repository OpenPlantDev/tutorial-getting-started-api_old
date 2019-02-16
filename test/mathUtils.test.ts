import {expect} from "chai";
import {MathUtils} from "../src/utilities/mathUtils";

let mathUtils = new MathUtils();

describe("MathUtils tests", () => {

  describe("add tests", () => {

    it("Should return 0", () => {
      expect(mathUtils.add(0,0)).to.equal(0);
    });
    it("Should return 10", () => {
      expect(mathUtils.add(5,5)).to.equal(10);
    });


  });

  describe("multipy tests", () => {

    it("Should return 0", () => {
      expect(mathUtils.multiply(0,0)).to.equal(0);
    });
    it("Should return 25", () => {
      expect(mathUtils.multiply(5,5)).to.equal(25);
    });


  });

});

