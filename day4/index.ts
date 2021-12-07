import { Consola } from 'consola';
import { Day } from '../utils/day';

export default function (logger: Consola, testMode: boolean) {
  return new Day4(logger, testMode);
}

class Board {
  boardSize = 5;
  constructor(private board: number[][]) { }

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
      up = up && this.board[this.boardSize - i][i] === -1;
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

  public sumNotMarked(): number {
    return this.board.reduce((sum, row) => {
      return sum + row.filter(x => x !== -1).reduce((s2, col) => s2 + col)
    }, 0)
  }
}

class Day4 extends Day {
  async part1(input: string[]): Promise<string> {
    const draws = input[0].split(',').map(x => +x);
    const boards: Board[] = [];
    let row = 2;
    while (row < input.length) {
      boards.push(new Board(input.slice(row, row + 5).map(x => x.split(' ').map(y => +y))))
    }
    for (const draw of draws) {
      for (const board of boards) {
        if (board.mark(draw)) {
          return board.sumNotMarked() + '';
        }
      }
    }
    return 'not found';
  }

  async part2(input: string[]): Promise<string> {
    return '';
  }
}