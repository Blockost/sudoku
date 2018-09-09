import { Cell } from './cell';
import { Coord } from './coord';

/**
 * Represents the game board.
 */
export class Board {
  private readonly NUM_MIN = 1;
  private readonly NUM_MAX = 9;
  private readonly MAX_NUM_CELLS_TO_HIDE = 3;
  private readonly ALL_CELLS: Cell[] = [];
  private readonly CELLS_TO_FILL = [];
  private size: number;
  private matrix: Cell[][];
  currentCell: Cell;
  selectedValue: number;

  constructor(size: number) {
    this.matrix = [];
    this.size = size;

    // Generate a board full of zero
    for (let i = 0; i < this.size; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.size; j++) {
        const cell = new Cell(new Coord(i, j));
        this.matrix[i][j] = cell;
        // Push the cell in the flatten array
        this.ALL_CELLS.push(cell);
      }
    }

    // Assign neighbors to each cell
    this.ALL_CELLS.forEach((cell) => {
      cell.neighborsInRow = this.getRow(cell);
      cell.neighborsInColumn = this.getColumn(cell);
      cell.neighborsInSquare = this.getSquare(cell);
    });

    // For each cell, assign a coherent value based on its neighbors
    // XXX 2018-08-11 We're using a copy of the original ALL_CELLS array so that the
    // method below does not affect it
    this.assignValueToCells(this.ALL_CELLS.slice());

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

  getCellsByValue(value: number) {
    return this.ALL_CELLS.filter((cell) => cell.userValue === value);
  }

  getCellsToFill(): Cell[] {
    return this.CELLS_TO_FILL;
  }

  getRemainingCellsToFill(): Cell[] {
    return this.CELLS_TO_FILL.filter((cell) => cell.userValue === 0);
  }

  validate(): boolean {
    // TODO: 2018-08-09 To remove when game is ready for production
    console.log(
      this.CELLS_TO_FILL.filter((cell) => cell.userValue !== cell.realValue)
    );
    return (
      this.CELLS_TO_FILL.filter((cell) => cell.userValue !== cell.realValue)
        .length === 0
    );
  }

  focus() {
    // Do not focus neighbors in the square because it makes the
    // board unreadable
    this.currentCell.neighborsInRow.forEach((c) => c.focus());
    this.currentCell.neighborsInColumn.forEach((c) => c.focus());
  }

  focusByValue(value: number) {
    this.ALL_CELLS.filter((cell) => cell.userValue === value).forEach((cell) =>
      cell.focus()
    );
  }

  clearFocus() {
    this.ALL_CELLS.forEach((cell) => cell.unfocus());
  }

  clearFocusByValue(value: number) {
    this.ALL_CELLS.filter((cell) => cell.userValue === value).forEach((cell) =>
      cell.unfocus()
    );
    // Because the unfocus method may have removed the focus on neighbors of the
    // current cell, we re-focus it
    this.focus();
  }

  private getRow(cell: Cell): Set<Cell> {
    const neighbors = new Set<Cell>();

    this.matrix[cell.coord.x].forEach((c) => neighbors.add(c));
    return neighbors;
  }

  private getColumn(cell: Cell): Set<Cell> {
    const neighbors = new Set<Cell>();

    this.matrix.forEach((row) => neighbors.add(row[cell.coord.y]));
    return neighbors;
  }

  private getSquare(cell: Cell): Set<Cell> {
    const neighbors = new Set<Cell>();

    const squareSize = Math.sqrt(this.size);
    const squareStartRow = Math.floor(cell.coord.x / squareSize) * squareSize;
    const squareStartColumn =
      Math.floor(cell.coord.y / squareSize) * squareSize;

    for (let i = squareStartRow; i < squareStartRow + squareSize; i++) {
      for (let j = squareStartColumn; j < squareStartColumn + squareSize; j++) {
        neighbors.add(this.matrix[i][j]);
      }
    }

    return neighbors;
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
    cell.neighborsInRow.forEach((c) => neighborValues.push(c.realValue));
    cell.neighborsInColumn.forEach((c) => neighborValues.push(c.realValue));
    cell.neighborsInSquare.forEach((c) => neighborValues.push(c.realValue));

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
