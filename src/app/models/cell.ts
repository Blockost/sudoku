import { Coord } from './coord';

/**
 * Reprensent a box on the game board.
 */
export class Cell {
  neighbors: Set<Cell>;
  private _isFocused: boolean;

  constructor(public value: number, public coord: Coord) {
    this._isFocused = false;
  }

  get isFocused(): boolean {
    return this._isFocused;
  }

  focus() {
    this._isFocused = true;
  }

  unfocus() {
    this._isFocused = false;
  }
}
