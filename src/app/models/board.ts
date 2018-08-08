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

    // Retrieve all cells
    const allCells: Cell[] = [];
    this._matrix.forEach((row) => row.forEach((cell) => allCells.push(cell)));

    // Assign neighbors to each cell
    allCells.forEach((cell) => {
      cell.neighbors = this.getNeighbors(cell);
    });

    // For each cell, assign a coherent value based on its neighbors
    this.assignValueToCells(allCells);
  }

  private assignValueToCells(remainingCells: Cell[]): boolean {
    const cell = remainingCells.shift();
    const possibleValues = this.shuffleArray(
      this.getPossibleValuesForCell(cell)
    );

    for (const value of possibleValues) {
      cell.value = value;

      // Base case: it is the last cell to be processed
      if (remainingCells.length === 0) {
        return true;
      }

      // Here's the recursion
      if (this.assignValueToCells(remainingCells)) {
        return true;
      }
    }

    // Being here means that we've been trying all the possible values
    // but all of them have failed. So, an error have happened before.
    // Reset cell value, put it back in the list and backtrack
    cell.value = 0;
    remainingCells.unshift(cell);
    return false;
  }

  get matrix() {
    return this._matrix;
  }

  getCell(rowIndex: number, colIndex: number): Cell {
    return this.matrix[rowIndex][colIndex];
  }

  isCellValid(cell: Cell): boolean {
    return (
      this.isRowValid(cell) &&
      this.isColumnValid(cell) &&
      this.isSquareValid(cell)
    );
  }

  /**
   * Checks whether a given row is valid against the game's rule
   */
  isRowValid(cell: Cell): boolean {
    return this.validate(this.getRow(cell).map((c) => c.value));
  }

  /**
   * Checks whether a given row is valid against the game's rule
   */
  isColumnValid(cell: Cell): boolean {
    return this.validate(this.getColumn(cell).map((c) => c.value));
  }

  isSquareValid(cell: Cell): boolean {
    return this.validate(this.getSquare(cell).map((c) => c.value));
  }

  clearFocus() {
    this.matrix.map((row) => row.map((cell) => cell.unfocus()));
  }

  /**
   * Retreives all the neighbors to a given cell.
   * Neighbors are all the cells on the same line, column and square.
   */
  private getNeighbors(cell: Cell): Set<Cell> {
    const neighbors = new Set<Cell>();

    this.getRow(cell).forEach((c) => neighbors.add(c));
    this.getColumn(cell).forEach((c) => neighbors.add(c));
    this.getSquare(cell).forEach((c) => neighbors.add(c));

    return neighbors;
  }

  private getRow(cell: Cell): Cell[] {
    return this._matrix[cell.coord.x];
  }

  private getColumn(cell: Cell): Cell[] {
    return this._matrix.map((row) => row[cell.coord.y]);
  }

  private getSquare(cell: Cell): Cell[] {
    const squareSize = Math.sqrt(this.size);
    const squareStartRow = Math.floor(cell.coord.x / squareSize) * squareSize;
    const squareStartColumn =
      Math.floor(cell.coord.y / squareSize) * squareSize;

    const cells = [];
    for (let i = squareStartRow; i < squareStartRow + squareSize; i++) {
      for (let j = squareStartColumn; j < squareStartColumn + squareSize; j++) {
        cells.push(this._matrix[i][j]);
      }
    }

    return cells;
  }

  /**
   * Validates the given number against Sodoku game's rules: each number must be unique in its `area`.
   */
  private validate(array: number[]): boolean {
    array = array.filter((item) => item !== 0);
    const array_size = array.length;
    const set_boxes = new Set(array);
    return array_size === set_boxes.size;
  }

  /**
   * Get possible values for a given cell based on the values already asigned to its neighbors.
   */
  private getPossibleValuesForCell(cell: Cell): number[] {
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

  /**
   * Shuffle the values in the given array and returns it. The given array is NOT modified.
   */
  private shuffleArray(array: number[]): number[] {
    const _array = array;

    for (let i = _array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [_array[i], _array[j]] = [_array[j], _array[i]];
    }

    return _array;
  }

  /**
   * Get a random number between two values.
   */
  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * max + min);
  }
}
