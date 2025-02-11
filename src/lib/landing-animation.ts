import type p5 from "p5";
import { ComplexNumber, DFT, type DTFResult } from "./dft";
import { convertPathToComplexCoordinates } from "./svgHelper";
import { HEART02_PATH } from "./heart02";
const { cos, sin, PI } = Math


export default function sketch(s: p5): void {
  const WIDTH: number = window.innerWidth;
  const HEIGHT: number = window.innerHeight;
  const TAU: number = 2 * PI;
  const SKIP: number = 1;
  const PATH = HEART02_PATH;


  let path: { x: number, y: number }[] = [];
  let time: number = 0;
  let fourier_result: DTFResult[];
  const drawing = convertPathToComplexCoordinates(PATH, 400)

  let completeLoop = false;

  s.setup = () => {
    s.createCanvas(WIDTH, HEIGHT);

    const vertex: ComplexNumber[] = []
    for (let i = 0; i < drawing.length; i += SKIP) {
      const number = new ComplexNumber(drawing[i].x, drawing[i].y)
      vertex.push(number);
    }
    fourier_result = DFT(vertex);
  }

  function epicycles(x: number, y: number, fourier: DTFResult[]) {
    for (let i = 0; i < fourier.length; i++) {
      const f = fourier[i];
      let prevX = x;
      let prevY = y;
      const { frequency, amplitude, phase } = f;
      x += amplitude * cos(frequency * time + phase)
      y += amplitude * sin(frequency * time + phase)
      s.stroke(255, 100);
      s.noFill();
      s.ellipse(prevX, prevY, amplitude * 2);
      s.stroke(255);
      s.line(prevX, prevY, x, y);
    }
    return s.createVector(x, y)
  }

  s.draw = () => {
    s.background(0)
    // s.translate(WIDTH / 2, HEIGHT / 2)
    const v = epicycles(WIDTH / 2, HEIGHT / 2, fourier_result)

    path.unshift({ x: v.x, y: v.y });
    if (completeLoop) path.pop()

    s.beginShape();
    s.noFill();
    path.forEach(vertex => {
      s.vertex(vertex.x, vertex.y)
    });
    s.endShape()

    time += TAU / fourier_result.length;

    if (time < -TAU || time > TAU) {
      time = 0
      completeLoop = true;
    }
  }
}
