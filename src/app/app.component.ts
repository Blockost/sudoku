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
  private currentCell: Cell;

  ngOnInit(): void {
    this.board = new Board(this.BOARD_SIZE);
    for (let i = 1; i <= this.BOARD_SIZE; i++) {
      this.availableValues.push(i);
    }
  }

  selectCell(rowIndex: number, colIndex: number) {
    this.board.clearFocus();

    this.currentCell = this.board.getCell(rowIndex, colIndex);
    this.currentCell.neighbors.forEach((c) => c.focus());
  }

  selectValue(value: number, event: Event) {
    if (this.currentCell !== undefined && this.currentCell.isAssignable) {
      this.currentCell.value = value;
      this.currentCell.show();
    }
  }
}
