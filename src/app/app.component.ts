import { Component, OnInit } from '@angular/core';

import { MatBottomSheet, MatDialog } from '@angular/material';
import { DifficultySelectorComponent } from './components/difficulty-selector/difficulty-selector.component';
import { VictoryDialogComponent } from './components/victory-dialog/victory-dialog.component';
import { Board } from './models/board';
import { GameDifficulty } from './models/game-difficulty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  board: Board;
  availableValues: number[] = [];
  private readonly BOARD_SIZE = 9;
  private gameDifficulty = GameDifficulty.EASY;

  constructor(
    private matBottomSheet: MatBottomSheet,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.board = new Board(this.BOARD_SIZE, this.gameDifficulty.level);
    for (let i = 1; i <= this.BOARD_SIZE; i++) {
      this.availableValues.push(i);
    }
  }

  selectDifficulty() {
    this.matBottomSheet
      // Open a bottom sheet for the player to choose the difficulty of the game
      .open(DifficultySelectorComponent)
      // Wait for the player to choose the difficulty and for the bottom
      // sheet to be dismissed
      .afterDismissed()
      // Listen to data returned when the component is dismissed
      .subscribe((difficultyName: string) => {
        if (difficultyName !== undefined) {
          const newDifficulty = GameDifficulty.parse(difficultyName);
          if (newDifficulty !== this.gameDifficulty) {
            // Re-generate the board according to the new game difficulty
            // chosen by the player
            this.gameDifficulty = newDifficulty;
            this.board = new Board(this.BOARD_SIZE, this.gameDifficulty.level);
          }
        }
      });
  }

  selectCell(rowIndex: number, colIndex: number) {
    // Clear the focus on the previous cells
    this.board.clearHighlight();
    if (this.board.currentCell) {
      this.board.currentCell.unselect();
    }

    this.board.currentCell = this.board.getCell(rowIndex, colIndex);
    this.board.currentCell.select();
    this.board.highlight();
  }

  selectValue(value: number) {
    const currentCell = this.board.currentCell;

    // If curentCell is not defined, do nothing
    if (currentCell === undefined || !currentCell.isFillable) {
      return;
    }

    // Clear the highlighting on the previous cells by value
    this.board.clearHighlightByValue(this.board.selectedValue);

    this.board.selectedValue = value;
    this.board.currentCell.userValue = value;
    this.board.currentCell.show();

    // Highlight all the cells with the same value
    this.board.highlightByValue(value);

    // Validate the board
    this.validate();
  }

  removeValue() {
    const currentCell = this.board.currentCell;

    // If curentCell is not defined, do nothing
    if (currentCell === undefined || !currentCell.isFillable) {
      return;
    }

    // Clear the focus on the previous cells by value
    this.board.clearHighlightByValue(this.board.selectedValue);

    // Reset userValue back to 0
    this.board.currentCell.userValue = 0;
    this.board.currentCell.hide();
    return;
  }

  private validate() {
    if (this.board.getRemainingCellsToFill().length !== 0) {
      return;
    }

    if (this.board.validate()) {
      this.matDialog.open(VictoryDialogComponent, {
        data: this.gameDifficulty,
        autoFocus: false
      });
    } else {
      alert('MISTAKES WERE MADE...');
    }
  }
}
