import { Cell } from './cell';
import { Coord } from './coord';

/**
 * Represents the game board.
 */
export class Board {
  private readonly NUM_MIN = 1;
  private readonly NUM_MAX = 9;
  private readonly MAX_NUM_CELLS_TO_HIDE = 3;
  private readonly CELLS_TO_FILL = [];
  private size: number;
  private matrix: Cell[][];

  constructor(size: number) {
    this.matrix = [];
    this.size = size;

    // Generate a board full of zero
    for (let i = 0; i < this.size; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.matrix[i][j] = new Cell(new Coord(i, j));
      }
    }

    // Retrieve all cells
    const allCells: Cell[] = [];
    this.matrix.forEach((row) => row.forEach((cell) => allCells.push(cell)));

    // Assign neighbors to each cell
    allCells.forEach((cell) => {
      cell.neighbors = this.getNeighbors(cell);
    });

    // For each cell, assign a coherent value based on its neighbors
    this.assignValueToCells(allCells);

    // Hide some cells at random
    // TODO: 2018-08-08 Make it based on difficulty level
    this.matrix.forEach((row) => {
      for (let i = 0; i < this.MAX_NUM_CELLS_TO_HIDE; i++) {
        const cell = row[this.getRandomNumber(0, 8)];
        cell.hide();
        cell.isFillable = true;
        cell.userValue = 0;
        this.CELLS_TO_FILL.push(cell);
      }
    });
  }

  getMatrix() {
    return this.matrix;
  }

  getCell(rowIndex: number, colIndex: number): Cell {
    return this.matrix[rowIndex][colIndex];
  }

  getCellsToFill(): Cell[] {
    return this.CELLS_TO_FILL;
  }

  getRemainingCellsToFill(): Cell[] {
    return this.CELLS_TO_FILL.filter((cell) => cell.userValue === 0);
  }

  public validate(): boolean {
    // TODO: 2018-08-09 To remove when game is ready for production
    console.log(
      this.CELLS_TO_FILL.filter((cell) => cell.userValue !== cell.realValue)
    );
    return (
      this.CELLS_TO_FILL.filter((cell) => cell.userValue !== cell.realValue)
        .length === 0
    );
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
    return this.matrix[cell.coord.x];
  }

  private getColumn(cell: Cell): Cell[] {
    return this.matrix.map((row) => row[cell.coord.y]);
  }

  private getSquare(cell: Cell): Cell[] {
    const squareSize = Math.sqrt(this.size);
    const squareStartRow = Math.floor(cell.coord.x / squareSize) * squareSize;
    const squareStartColumn =
      Math.floor(cell.coord.y / squareSize) * squareSize;

    const cells = [];
    for (let i = squareStartRow; i < squareStartRow + squareSize; i++) {
      for (let j = squareStartColumn; j < squareStartColumn + squareSize; j++) {
        cells.push(this.matrix[i][j]);
      }
    }

    return cells;
  }

  private assignValueToCells(remainingCells: Cell[]): boolean {
    const cell = remainingCells.shift();
    const possibleValues = this.shuffleArray(
      this.getPossibleValuesForCell(cell)
    );

    for (const value of possibleValues) {
      cell.realValue = value;

      // Base case: no remaining cells to be processed
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
    cell.realValue = 0;
    remainingCells.unshift(cell);
    return false;
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
    cell.neighbors.forEach((c) => neighborValues.push(c.realValue));

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
    const _array = array.slice();

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
