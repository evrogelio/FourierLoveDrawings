<script lang="ts">
	import { CodeBlock, type FocusBlock } from 'svhighlight';
	import 'highlight.js/styles/base16/dracula.css';
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
  `;
	let step = 0;
	let steps: FocusBlock[] = [
		{ lines: '', scrollLine: 1, text: 'Unblur' },
		{ lines: '27-31', scrollLine: 25, text: '1: Convert SVG to complex coordinates' },
		{ lines: '33', scrollLine: 25, text: '2: Apply the descrete Fourier Transform' },
		{ lines: '36-51', scrollLine: 33, text: '3: Draw Epicycles and calculate the ending position of the point' },
    { lines: '60-73', scrollLine: 60, text: '4: Add endpoint to path, and trace the path with color'}
	];
</script>

<div
	class="grid grid-cols-1 lg:grid-cols-[33%_67%] grid-rows-[30%_70%] lg:grid-rows-1 w-full h-full"
>
	<div class="flex w-full flex-col p-8 h-full">
		<h1 class="text-4xl lg:text-6xl zain pink mb-4 lg:mb-8">What are the epicycles?</h1>
		<p class="zain text-xl dark-pink max-w-full">
			Epicycles are circles moving on circles, a concept dating back to Ptolemy’s planetary models.
		</p>
		<p class="zain text-xl dark-pink">With enough of them, we can approximate any closed shape.</p>
	</div>
	<div class="h-full p-4">
		<CodeBlock
			{code}
			focusBlocks={steps}
			showFocusButtons={true}
			language="typescript"
			dimensions="h-full"
		/>
	</div>
</div>
