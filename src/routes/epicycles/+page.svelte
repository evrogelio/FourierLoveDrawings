<script lang="ts">
  import { CodeBlock, type FocusBlock } from "svhighlight";
  import 'highlight.js/styles/base16/dracula.css'
  let code = `
    import type p5 from "p5";
import { ComplexNumber, DFT, type DTFResult } from "./dft";
import { convertPathToComplexCoordinates } from "./svgHelper";
import { HEART_PATH } from "./heart";

const { cos, sin, PI } = Math


export default function sketch(s: p5): void {
  const WIDTH: number = window.innerWidth / 2;
  const HEIGHT: number = window.innerHeight;
  const TAU: number = 2 * PI;
  const SKIP: number = 1;
  const PATH = HEART_PATH;


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
    const drawing = convertPathToComplexCoordinates(PATH, currentMaxPoints);
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
  `
  let step = 0;
  let steps: FocusBlock[] = [
    {lines: '', scrollLine: 1, text: "Unblur"},
    {lines: '27', scrollLine: 1, text: "1: Convert SVG to complex coordinates"},
    {lines: '29-32', scrollLine: 15, text: "2: Apply the descrete Fourier Transform"},
    {lines: '36-51', scrollLine: 27, text: "3: Calculate the ending position of the point"},

  ]
</script>
<div class="flex items-center w-full h-full">
	<div class="flex w-1/3 flex-col p-8 h-full">
		<h1 class="text-6xl zain pink mb-8">What are the epicycles?</h1>
		<p class="zain text-xl dark-pink">
			Epicycles are circles moving on circles, a concept dating back to Ptolemy’s planetary models.
		</p>
		<p class="zain text-xl dark-pink">With enough of them, we can approximate any closed shape.</p> 
	</div>
  <div class="w-2/3 h-full p-4 max-h-screen">
    <CodeBlock 
      {code} 
      focusBlocks={steps}
      showFocusButtons={true}
      language="typescript"
      dimensions="max-h-full"
    />
  </div>
</div>
