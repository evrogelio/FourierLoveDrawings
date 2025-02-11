const {cos, sin, PI, atan2, sqrt} = Math;
const TAU = 2*PI;

export class ComplexNumber {
  constructor(public real: number, public complex: number){}
  static addition(a: ComplexNumber, b: ComplexNumber){
    return new ComplexNumber(a.real + b.real, a.complex + b.complex)
  }
  static multiplication(a: ComplexNumber, b: ComplexNumber){
    return new ComplexNumber(
      a.real * b.real - a.complex * b.complex,
      a.real * b.complex + a.complex * b.real
    )
  }

  add(number: ComplexNumber){
    const result = ComplexNumber.addition(this, number);
    this.real = result.real;
    this.complex = result.complex;
    return this;
  }

  multiply(coeficient: ComplexNumber){
    return ComplexNumber.multiplication(this, coeficient);
  }
}

export type DTFResult = {
  frequency: number,
  amplitude: number,
  phase: number,
}
export function DFT(datapoints: ComplexNumber[]){
  const N = datapoints.length;
  const result: DTFResult[] = [];
  for (let k = 0; k < N; k++) {
    let sum = new ComplexNumber(0,0);
    datapoints.forEach((datapoint, n)=>{
      const angle = (TAU * k * n) / N;
      const coeficient = new ComplexNumber(cos(angle), -sin(angle));
      sum.add(datapoint.multiply(coeficient));
    })
    sum.complex = sum.complex/N
    sum.real = sum.real/N
    const dtfResult = { 
      frequency: k,
      amplitude: sqrt(sum.real**2 + sum.complex ** 2),
      phase: atan2(sum.complex, sum.real)
    }
    result.push(dtfResult)
  }
  result.sort((a,b)=>b.amplitude - a.amplitude)
  return result
}
