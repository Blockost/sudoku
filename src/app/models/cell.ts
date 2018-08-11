import { Coord } from './coord';

/**
 * Reprensent a box on the game board.
 */
export class Cell {
  neighbors: Set<Cell>;
  userValue: number;
  isFillable = false;
  private _realValue: number;
  private _isVisible = true;
  private _isFocused = false;

  constructor(public coord: Coord) {}

  get realValue() {
    return this._realValue;
  }

  set realValue(value: number) {
    this._realValue = value;
    // At first, user value is the same as the real value
    // It will be wiped when we will hide some cells at random during board init
    this.userValue = value;
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
