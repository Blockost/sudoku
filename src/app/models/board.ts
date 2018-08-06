export class Board {
  private readonly NUM_MIN = 1;
  private readonly NUM_MAX = 9;
  private _matrix: number[][];

  constructor(size: number) {
    this._matrix = [];
    for (let i = 0; i < size; i++) {
      this._matrix[i] = [];
      for (let j = 0; j < size; j++) {
        this._matrix[i][j] = this.getRandomNumber();
      }
    }
  }

  get matrix() {
    return this._matrix;
  }

  getColumn(index: number): number[] {
    return this._matrix.map((row) => row[index]);
  }

  isRowValid(index: number): boolean {
    return true;
  }

  isColumnValid(index: number): boolean {
    return true;
  }

  isSquareValid(index: number): boolean {
    return true;
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * this.NUM_MAX + this.NUM_MIN);
  }
}
