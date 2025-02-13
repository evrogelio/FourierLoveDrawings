import { HEART02_PATH } from "./heart02";
import { convertPathToComplexCoordinates } from "./svgHelper";
import * as fs from "fs";

const data = convertPathToComplexCoordinates(HEART02_PATH, 300);
let write = `export const HEART02_POINTS = [`
data.forEach(p=>write += `\n\t{x: ${p.x}, y: ${p.y}},`)
write += `\n];`
fs.writeFileSync('HEART02_Points.ts', write)
console.log(write)
