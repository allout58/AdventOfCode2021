import { Consola } from 'consola';
import { Day } from '../utils/day';

export default function (logger: Consola, testMode: boolean) {
  return new Day4(logger, testMode);
}

class Board {
  boardSize = 5;
  constructor(private board: number[][], private logger: Consola) { }

  private checkX(row: number): boolean {
    return this.board[row].every(x => x === -1);
  }

  private checkY(column: number): boolean {
    return this.board.every(row => row[column] === -1);
  }

  private checkDiagonals(): boolean {
    let down = true, up = true;
    for (let i = 0; i < this.boardSize; i++) {
      down = down && this.board[i][i] === -1;
      up = up && this.board[this.boardSize - i - 2][i] === -1;
    }

    return up || down;
  }

  public mark(num: number): boolean {
    let row = 0, column = 0;
    for (row = 0; row < 5; row++) {
      for (column = 0; column < 5; column++) {
        if (this.board[row][column] === num) {
          this.board[row][column] = -1;
          return this.checkDiagonals() || this.checkX(row) || this.checkY(column)
        }
      }
    }
    return false;
  }

  public logBoard() {
    this.logger.debug('\n' + this.board.map(row => row.map(x => x.toString().padStart(2, ' ')).join(' ')).join('\n'));
  }

  public sumNotMarked(): number {
    return this.board.reduce((sum, row) => {
      return sum + row.filter(x => x !== -1).reduce((s2, col) => s2 + col, 0)
    }, 0)
  }
}

class Day4 extends Day {
  async part1(input: string[]): Promise<string> {
    const draws = input[0].split(',').map(x => +x);
    const boards: Board[] = [];
    let row = 2;
    while (row < input.length) {
      boards.push(new Board(input.slice(row, row + 5).map(x => x.split(' ').filter(y => !!y).map(y => +y)), this.logger))
      row += 6;
    }
    for (const draw of draws) {
      this.logger.debug(`Draw: ${draw}`);
      for (const board of boards) {
        board.logBoard();
        if (board.mark(draw)) {
          this.logger.debug('Found board')
          board.logBoard()
          return (board.sumNotMarked() * draw) + '';
        }
      }
    }
    return 'not found';
  }

  async part2(input: string[]): Promise<string> {
    const draws = input[0].split(',').map(x => +x);
    const boards: Board[] = [];
    let row = 2;
    while (row < input.length) {
      boards.push(new Board(input.slice(row, row + 5).map(x => x.split(' ').filter(y => !!y).map(y => +y)), this.logger))
      row += 6;
    }
    for (const draw of draws) {
      this.logger.debug(`Draw: ${draw}`);
      for (let b = 0; b < boards.length; b++) {
        const board = boards[b];
        board.logBoard();
        if (board.mark(draw)) {
          boards.splice(b, 1);
          this.logger.debug('Found board')
          board.logBoard()
          if (boards.length === 0) {
            return (board.sumNotMarked() * draw) + '';
          }
        }
      }
    }
    return 'not found';
  }
}