import { Component, OnInit } from '@angular/core';

import { Board } from './models/board';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  board: Board;

  private value = 1;

  ngOnInit(): void {
    this.board = new Board(9);
  }

  onClick(rowIndex: number, colIndex: number) {
    this.board.clearFocus();

    const cell = this.board.getCell(rowIndex, colIndex);
    cell.neighbors.forEach((c) => c.focus());

    if (cell.isAssignable) {
      cell.value = this.value;
      cell.show();
    }
  }
}
