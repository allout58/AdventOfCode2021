import {Consola} from 'consola';
import {Day} from '../utils/day';

export default function (logger: Consola, testMode: boolean) {
  return new Day3(logger, testMode);
}

class Day3 extends Day {
  async part1(input: string[]): Promise<string> {
    let gammaBitString = '';
    for (let ndx = 0; ndx < input[0].length; ndx++) {
      let count0s = 0;
      let count1s = 0;
      for (const inputStr of input.filter(x => !!x)) {
        if (inputStr[ndx] === '0') {
          count0s++;
        } else {
          count1s++;
        }
      }
      gammaBitString += count0s > count1s ? '0' : '1';
    }
    const gamma = Number.parseInt(gammaBitString, 2);
    this.logger.debug(`Gamma: ${gamma} [${gammaBitString}]`);
    // Can't use JS bit inverse, as it produces a signed output, which we don't want
    const epsilonBitString = gammaBitString
      .split('')
      .map(x => (x === '0' ? '1' : '0'))
      .join('');
    const epsilon = Number.parseInt(epsilonBitString, 2);
    this.logger.debug(`Epsilon: ${epsilon} [${epsilonBitString}]`);
    return (gamma * epsilon).toString();
  }

  async part2(input: string[]): Promise<string> {
    // O2
    let o2Inputs = input.filter(x => !!x);
    let o2Rating: number = 0;
    for (let ndx = 0; ndx < input[0].length; ndx++) {
      let count0s = 0;
      let count1s = 0;
      for (const inputStr of o2Inputs) {
        if (inputStr[ndx] === '0') {
          count0s++;
        } else {
          count1s++;
        }
      }
      const mostCommon = count0s > count1s ? '0' : '1';
      this.logger.debug(`Most common at bit ${ndx}: ${mostCommon}`);
      o2Inputs = o2Inputs.filter(x => x[ndx] === mostCommon);
      this.logger.debug(`Number of entries remaining: ${o2Inputs.length}`);
      if (o2Inputs.length === 1) {
        o2Rating = Number.parseInt(o2Inputs[0], 2);
        break;
      }
    }
    this.logger.debug(`O2 Rating: ${o2Rating} [${o2Inputs[0]}]`);

    // O2
    let co2Inputs = input.filter(x => !!x);
    let co2Rating: number = 0;
    for (let ndx = 0; ndx < input[0].length; ndx++) {
      let count0s = 0;
      let count1s = 0;
      for (const inputStr of co2Inputs) {
        if (inputStr[ndx] === '0') {
          count0s++;
        } else {
          count1s++;
        }
      }
      const leastCommon = count0s <= count1s ? '0' : '1';
      this.logger.debug(`Least common at bit ${ndx}: ${leastCommon}`);
      co2Inputs = co2Inputs.filter(x => x[ndx] === leastCommon);
      this.logger.debug(`Number of entries remaining: ${co2Inputs.length}`);
      if (co2Inputs.length === 1) {
        co2Rating = Number.parseInt(co2Inputs[0], 2);
        break;
      }
    }
    this.logger.debug(`CO2 Rating: ${co2Rating}`);
    return (o2Rating * co2Rating).toString();
  }
}
