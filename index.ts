import {Consola, default as consola, LogLevel} from 'consola';
import {promises} from 'fs';
import {join, resolve} from 'path';
import {Day} from './utils/day';

async function main() {
  consola.info('======== Advent of Code 2021 ========');
  const dayArg = process.argv[2];
  const testOrInput = process.argv[3] ?? 'input';
  let testMode = false;
  if (testOrInput.startsWith('test')) {
    testMode = true;
    consola.level = LogLevel.Verbose;
  }
  const dayDir = resolve(join('.', dayArg));
  try {
    await promises.stat(dayDir);
  } catch (e) {
    consola.fatal(`Unable to find day ${dayArg}`);
    return;
  }
  const dayCreator: {default: (logger: Consola, testMode: boolean) => Day} = require(dayDir);
  const day = dayCreator.default(consola, testMode);
  consola.info('=== Part 1 ===');
  try {
    const input1: string = await promises.readFile(resolve(join(dayDir, testOrInput)), {encoding: 'utf-8'});
    const input1Result: string = await day.part1(input1.split(/\r?\n/));
    consola.info('Part 1 result: ' + input1Result);
  } catch (e) {
    consola.error('Error doing part 1: ' + e.message);
    consola.error(e);
  }

  consola.info('=== Part 2 ===');
  try {
    const input2: string = await promises.readFile(resolve(join(dayDir, testOrInput)), {encoding: 'utf-8'});
    const input2Result: string = await day.part2(input2.split(/\r?\n/));
    consola.info('Part 2 result: ' + input2Result);
  } catch (e) {
    consola.error('Error doing part 2: ' + e.message);
  }
}

main().catch(err => console.error(err));
