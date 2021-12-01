import {default as consola} from 'consola';
import {default as fs} from 'fs';
import {resolve} from 'path';
import {agent} from 'superagent';

// First arg to us, arg 0 is tsnode and arg 1 is this script
const day = process.argv[2];

if (!day || !day.match(/^day\d+$/)) {
  consola.error('Must have a valid [day] argument');
  process.exit(-1);
}

if (fs.existsSync(day)) {
  consola.error(`Day "${day}" already exists`);
  process.exit(-1);
}

const dayAsClassName = day.replace('day', 'Day');
const dayNumberRegex = /(\d+)$/.exec(day);
if (!dayNumberRegex) {
  consola.error('Must have a valid day argument');
  process.exit(-1);
}
const dayNumber = dayNumberRegex[1];

fs.mkdirSync(day);
fs.writeFileSync(
  resolve(day, 'index.ts'),
  `import {Consola} from 'consola';
import {Day} from '../utils/day';

export default function (logger: Consola, testMode: boolean) {
  return new ${dayAsClassName}(logger, testMode);
}

class ${dayAsClassName} extends Day {
  async part1(input: string[]): Promise<string> {
    return '';
  }

  async part2(input: string[]): Promise<string> {
    return '';
  }
}`
);
const aoc_session = '53616c7465645f5fd4b02ea0f4a5ab969ed656377a05c88d338b1239df4f54c2eedd35cb61f1bb3d388d9bd1fcbaecf5';
consola.info('Getting: ' + `https://adventofcode.com/2021/day/${dayNumber}/input`);
agent()
  .set('Cookie', ['session=' + aoc_session])
  .get(`https://adventofcode.com/2021/day/${dayNumber}/input`)
  .then(resp => {
    if (resp.ok) {
      fs.writeFileSync(resolve(day, 'input'), resp.text);
    } else {
      consola.error('Unable to get input', resp.error);
    }
  })
  .catch(err => {
    consola.error('Unable to get input', err);
  });
fs.writeFileSync(resolve(day, 'test'), '');
fs.writeFileSync(resolve(day, 'test2'), '');
