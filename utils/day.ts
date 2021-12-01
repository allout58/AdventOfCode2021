import {Consola} from 'consola';

export abstract class Day {
  constructor(protected logger: Consola, protected testMode = false) {}
  abstract part1(input: string[]): Promise<string>;
  abstract part2(input: string[]): Promise<string>;
}
