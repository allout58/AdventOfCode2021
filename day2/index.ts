import {Consola} from 'consola';
import {Day} from '../utils/day';

export default function (logger: Consola, testMode: boolean) {
  return new Day2(logger, testMode);
}

class Day2 extends Day {
  async part1(input: string[]): Promise<string> {
    let forward = 0;
    let down = 0;
    for (const instruction of input.filter(x => x != '')) {
      const [dir, val] = instruction.split(' ');
      switch (dir) {
        case 'forward':
          forward += +val;
          break;
        case 'up':
          down -= +val;
          break;
        case 'down':
          down += +val;
          break;
        default:
          this.logger.error(`Unknown direction: ${dir}`);
      }
    }
    this.logger.debug(`forward: ${forward}, down: ${down}`);
    return (forward * down).toString();
  }

  async part2(input: string[]): Promise<string> {
    let forward = 0;
    let down = 0;
    let aim = 0;
    for (const instruction of input.filter(x => x != '')) {
      const [dir, val] = instruction.split(' ');
      const parsedVal = +val;
      switch (dir) {
        case 'forward':
          forward += parsedVal;
          down += aim * parsedVal;
          break;
        case 'up':
          aim -= parsedVal;
          break;
        case 'down':
          aim += parsedVal;
          break;
        default:
          this.logger.error(`Unknown direction: ${dir}`);
      }
      this.logger.debug(`after instruction ${dir} ${val} -> forward: ${forward}, down: ${down}, aim: ${aim}`);
    }
    this.logger.debug(`Result forward: ${forward}, down: ${down}, aim: ${aim}`);
    return (forward * down).toString();
  }
}
