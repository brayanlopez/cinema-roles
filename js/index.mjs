import { fillData } from "./fillData.mjs";
import { addScroll2TopFunction } from "./scrollFunction.mjs";

const mainFlow = async () => {
  fillData();
  addScroll2TopFunction();
};

mainFlow();
