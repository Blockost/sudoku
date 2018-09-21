import { Coord } from './coord';

/**
 * Reprensent a box on the game board.
 */
export class Cell {
  neighborsInRow: Set<Cell>;
  neighborsInColumn: Set<Cell>;
  neighborsInSquare: Set<Cell>;
  userValue: number;
  isFillable = false;
  private _realValue: number;
  private _isVisible = true;
  private _isHighlighted = false;
  private _isSelected = false;

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

  get isHighlighted(): boolean {
    return this._isHighlighted;
  }

  highlight(highlight: boolean) {
    this._isHighlighted = highlight;
  }

  select() {
    this._isSelected = true;
  }

  unselect() {
    this._isSelected = false;
  }

  get isSelected(): boolean {
    return this._isSelected;
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
