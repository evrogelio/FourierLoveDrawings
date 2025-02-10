import type p5 from "p5";
const { cos, sin } = Math
export default function sketch(s: p5): void {
  const shapes: SpinCircle[] = []
  const WIDTH: number = 800;
  const HEIGHT: number = 800;

  let time: number = 0;
  s.setup = () => {
    s.createCanvas(WIDTH, HEIGHT);
    console.log("Hello")
    shapes.push(new SpinCircle(s))
  }

  s.draw = () => {
    s.background(0)
    s.translate(WIDTH / 2, HEIGHT / 2)

    shapes.forEach(shape => shape.draw(time))
    time -= 0.01;
  }
}

class SpinCircle {
  centerX: number = 0
  centerY: number = 0
  x: number = 0
  y: number = 0
  radius: number = 100
  color: number = 255
  p5: p5

  constructor(p5: p5) {
    this.p5 = p5
  }

  animate(time: number) {
    this.x = this.radius * cos(time)
    this.y = this.radius * sin(time)
  }

  renderShapes() {
    this.p5.noFill()
    this.p5.stroke(this.color)
    this.p5.ellipse(this.centerX, this.centerY, this.radius * 2)
    this.p5.line(this.centerX, this.centerY, this.x, this.y)
    this.p5.fill(this.color)
    this.p5.ellipse(this.x, this.y, 8)
  }

  draw(time: number) {
    this.animate(time)
    this.renderShapes()
  }
}
