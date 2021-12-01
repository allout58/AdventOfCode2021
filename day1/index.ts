import {Consola} from 'consola';
import {Day} from '../utils/day';

export default function (logger: Consola, testMode: boolean) {
  return new Day1(logger, testMode);
}

class Day1 extends Day {
  async part1(input: string[]): Promise<string> {
    const inputAsNumbers = input.filter(x => x).map(x => +x);
    return inputAsNumbers.filter((value, index, array) => index > 0 && value > array[index - 1]).length.toString();
  }

  async part2(input: string[]): Promise<string> {
    const inputAsNumbers = input.filter(x => x).map(x => +x);
    const windowSums = inputAsNumbers
      .slice(0, -2)
      .map((value, index) => value + inputAsNumbers[index + 1] + inputAsNumbers[index + 2]);
    this.logger.debug('WindowSums', windowSums);
    return windowSums.filter((value, index, array) => index > 0 && value > array[index - 1]).length.toString();
  }
}
