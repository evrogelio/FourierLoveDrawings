import type p5 from "p5";
import { ComplexNumber, DFT, type DTFResult } from "./dft";
import { convertPathToComplexCoordinates } from "./svgHelper";
import { HEART02_PATH } from "./heart02";
import { HEART01_PATH } from "./heart01";
import { HEART03_PATH } from "./heart03";

const { cos, sin, PI } = Math


export default function sketch(s: p5): void {
  const isLandscape = window.innerWidth > window.innerHeight;
  const WIDTH: number = isLandscape ? window.innerWidth / 2 : window.innerWidth;
  const HEIGHT: number = isLandscape ? window.innerHeight : window.innerHeight / 2;
  const TAU: number = 2 * PI;
  const SKIP: number = 1;
  const PATH = HEART03_PATH;


  let path: { x: number, y: number }[] = [];
  let time: number = 0;
  let fourier_result: DTFResult[];
  let currentMaxPoints = 300;
  let prevMaxPoints = currentMaxPoints;
  let completeLoop = false;
  s.setup = () => {
    s.createCanvas(WIDTH, HEIGHT);
    fourier_result = transform();
  }
  function transform() {
    const drawing = convertPathToComplexCoordinates(PATH, currentMaxPoints, Math.min(WIDTH, HEIGHT)*.9);
    const vertex: ComplexNumber[] = []
    for (let i = 0; i < drawing.length; i += SKIP) {
      const number = new ComplexNumber(drawing[i].x, drawing[i].y)
      vertex.push(number);
    }
    return DFT(vertex);
  }

  function epicycles(x: number, y: number, fourier: DTFResult[]) {
    for (let i = 0; i < fourier.length; i++) {
      const f = fourier[i];
      let prevX = x;
      let prevY = y;
      const { frequency, amplitude, phase } = f;
      x += amplitude * cos(frequency * time + phase)
      y += amplitude * sin(frequency * time + phase)
      s.stroke(0, 50);
      s.strokeWeight(1)
      s.noFill();
      s.ellipse(prevX, prevY, amplitude * 2);
      s.line(prevX, prevY, x, y);
    }
    return s.createVector(x, y)
  }

  s.draw = () => {
    s.clear()
    if (prevMaxPoints != currentMaxPoints) {
      fourier_result = transform();
      completeLoop = false
    }
    const v = epicycles(WIDTH / 2, HEIGHT / 2, fourier_result)
    path.unshift({ x: v.x, y: v.y });
    if (completeLoop) path.pop()
    s.stroke(255, 177, 212)
    s.strokeWeight(3)
    s.beginShape();
    path.forEach(vertex => {
      s.vertex(vertex.x, vertex.y)
    });
    s.endShape();
    time += TAU / currentMaxPoints
    if (time < -TAU || time > TAU) {
      time = 0
      completeLoop = true;
    }
  }
}
