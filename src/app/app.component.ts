import { Component, OnInit } from '@angular/core';

import { Board } from './models/board';
import { Cell } from './models/cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  board: Board;
  availableValues: number[] = [];
  private readonly BOARD_SIZE = 9;

  ngOnInit(): void {
    this.board = new Board(this.BOARD_SIZE);
    for (let i = 1; i <= this.BOARD_SIZE; i++) {
      this.availableValues.push(i);
    }
  }

  selectCell(rowIndex: number, colIndex: number) {
    // Clear the focus on the previous cells
    this.board.clearFocus();

    this.board.currentCell = this.board.getCell(rowIndex, colIndex);
    this.board.focus();
  }

  selectValue(value: number) {
    const currentCell = this.board.currentCell;
    if (currentCell === undefined || !currentCell.isFillable) {
      return;
    }

    // Clear the focus on the previous cells by value
    this.board.clearFocusByValue(this.board.selectedValue);

    this.board.selectedValue = value;
    this.board.currentCell.userValue = value;
    this.board.currentCell.show();

    // Focus all the cells with the same value
    this.board.focusByValue(value);

    // Validate the board
    this.validate();
  }

  private validate() {
    if (this.board.getRemainingCellsToFill().length !== 0) {
      return;
    }

    if (this.board.validate()) {
      alert('BRAVO!');
    } else {
      alert('MISTAKES WERE MADE...');
    }
  }
}
