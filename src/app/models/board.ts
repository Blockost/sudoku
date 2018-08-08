import { Cell } from './cell';
import { Coord } from './coord';

/**
 * Represents the game board.
 */
export class Board {
  private readonly NUM_MIN = 1;
  private readonly NUM_MAX = 9;
  private size: number;
  private _matrix: Cell[][];

  constructor(size: number) {
    this._matrix = [];
    this.size = size;

    // Generate a board full of zero
    for (let i = 0; i < this.size; i++) {
      this._matrix[i] = [];
      for (let j = 0; j < this.size; j++) {
        this._matrix[i][j] = new Cell(0, new Coord(i, j));
      }
    }

    // Assign neighbors to cells
    this._matrix.forEach((row) =>
      row.forEach((cell) => {
        cell.neighbors = this.getNeighbors(cell);
      })
    );
  }

  generate() {
    // Retrieve all cells
    const allCells: Cell[] = [];
    this._matrix.forEach((row) => row.forEach((cell) => allCells.push(cell)));

    this.doGenerate(allCells);
  }

  private doGenerate(remainingCells: Cell[]): boolean {
    const cell = remainingCells.shift();
    const possibleValues = this.getPossibleValuesForCell(cell);
    this.shuffle(possibleValues);

    for (const value of possibleValues) {
      cell.value = value;

      // Base case: it is the last cell to be processed
      if (remainingCells.length === 0) {
        return true;
      }

      // Here's the recursion
      if (this.doGenerate(remainingCells)) {
        return true;
      }
    }

    // Being here means that we've been trying all the possible values
    // but all of them have failed...Error happened before.
    // Reset cell value, put back cell in the list and re-do
    cell.value = 0;
    remainingCells.unshift(cell);
    return false;
  }

  private shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  get matrix() {
    return this._matrix;
  }

  getCell(rowIndex: number, colIndex: number): Cell {
    return this.matrix[rowIndex][colIndex];
  }

  isCellValid(rowIndex: number, colIndex): boolean {
    return (
      this.isRowValid(rowIndex) &&
      this.isColumnValid(colIndex) &&
      this.isSquareValid(rowIndex, colIndex)
    );
  }

  /**
   * Checks whether a given row is valid against the game's rule
   *
   * @param index the index of the row to check
   */
  isRowValid(index: number): boolean {
    return this.validate(this.getRow(index).map((box) => box.value));
  }

  /**
   * Checks whether a given row is valid against the game's rule
   *
   * @param index the index of the column to check
   */
  isColumnValid(index: number): boolean {
    return this.validate(this.getColumn(index).map((box) => box.value));
  }

  isSquareValid(rowIndex: number, colIndex: number): boolean {
    return this.validate(
      this.getSquare(rowIndex, colIndex).map((box) => box.value)
    );
  }

  clearFocus() {
    this.matrix.map((row) => row.map((box) => box.unfocus()));
  }

  /**
   * Retreives all the neighbors to a given cell.
   * Neighbors are all the cells on the same line, column and square.
   *
   * @param cell the cell we want to search the neighbors of
   */
  private getNeighbors(cell: Cell): Set<Cell> {
    const neighbors = new Set<Cell>();
    const rowIndex = cell.coord.x;
    const colIndex = cell.coord.y;

    this.getRow(rowIndex).forEach((c) => neighbors.add(c));
    this.getColumn(colIndex).forEach((c) => neighbors.add(c));
    this.getSquare(rowIndex, colIndex).forEach((c) => neighbors.add(c));

    return neighbors;
  }

  private getRow(index: number): Cell[] {
    return this._matrix[index];
  }

  private getColumn(index: number): Cell[] {
    return this._matrix.map((row) => row[index]);
  }

  private getSquare(rowIndex: number, colIndex: number): Cell[] {
    const squareSize = Math.sqrt(this.size);
    const squareStartRow = Math.floor(rowIndex / squareSize) * squareSize;
    const squareStartColumn = Math.floor(colIndex / squareSize) * squareSize;

    const boxes = [];
    for (let i = squareStartRow; i < squareStartRow + squareSize; i++) {
      for (let j = squareStartColumn; j < squareStartColumn + squareSize; j++) {
        boxes.push(this._matrix[i][j]);
      }
    }

    return boxes;
  }

  /**
   * Validates the given number against Sodoku game's rules: each number must be unique in its `area`.
   *
   * @param array the array of number to validate
   */
  private validate(array: number[]): boolean {
    array = array.filter((item) => item !== 0);
    const array_size = array.length;
    const set_boxes = new Set(array);
    return array_size === set_boxes.size;
  }

  private getPossibleValuesForCell(cell: Cell) {
    const possibleValues: number[] = [];
    for (let i = this.NUM_MIN; i <= this.NUM_MAX; i++) {
      possibleValues.push(i);
    }

    const neighborValues: number[] = [];
    cell.neighbors.forEach((c) => neighborValues.push(c.value));

    // For each value found in neighbors, wipe the entry from the possible options
    neighborValues.forEach((value) => {
      const index = possibleValues.indexOf(value);
      if (index !== -1) {
        possibleValues.splice(index, 1);
      }
    });

    return possibleValues;
  }

  private getRandom(): number {
    return Math.floor(Math.random() * this.NUM_MAX + this.NUM_MIN);
  }
}
