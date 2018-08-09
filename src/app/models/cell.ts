import { Coord } from './coord';

/**
 * Reprensent a box on the game board.
 */
export class Cell {
  neighbors: Set<Cell>;
  isAssignable = false;
  private _isVisible = true;
  private _isFocused = false;

  constructor(public value: number, public coord: Coord) {}

  get isFocused(): boolean {
    return this._isFocused;
  }

  focus() {
    this._isFocused = true;
  }

  unfocus() {
    this._isFocused = false;
  }

  get isVisible(): boolean {
    return this._isVisible;
  }

  show() {
    this._isVisible = true;
  }

  hide() {
    this._isVisible = false;
  }
}
