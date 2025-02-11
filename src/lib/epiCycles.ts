const { cos, sin, PI } = Math
import type p5 from "p5";
import type { DTFResult } from "./dft";
export function epicycles(x: number, y: number, fourier: DTFResult[], time: number, s: p5) {
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


