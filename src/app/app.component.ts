import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { OptionsSelectorComponent } from './components/options-selector/options-selector.component';
import { VictoryDialogComponent } from './components/victory-dialog/victory-dialog.component';
import { Board } from './models/board';
import { GameDifficulty } from './models/game-difficulty';
import { GameOptions } from './models/game-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  board: Board;
  availableValues: number[] = [];
  private readonly BOARD_SIZE = 9;

  constructor(private matBottomSheet: MatBottomSheet, private matDialog: MatDialog) {}

  ngOnInit(): void {
    const gameOptions = new GameOptions(GameDifficulty.EASY, true);
    this.board = new Board(this.BOARD_SIZE, gameOptions);
    for (let i = 1; i <= this.BOARD_SIZE; i++) {
      this.availableValues.push(i);
    }
  }

  selectDifficulty() {
    const _gameOptions = Object.assign({}, this.board.gameOptions);
    this.matBottomSheet
      // Open a bottom sheet for the player to choose the difficulty of the game
      .open(OptionsSelectorComponent, { data: _gameOptions })
      // Wait for the player to choose the difficulty and for the bottom
      // sheet to be dismissed
      .afterDismissed()
      // Listen to data returned when the component is dismissed
      .subscribe(this.processNewGameOptions.bind(this));
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
        data: this.board.gameOptions.gameDifficulty,
        autoFocus: false
      });
    } else {
      alert('MISTAKES WERE MADE...');
    }
  }

  private processNewGameOptions(newGameOptions: GameOptions) {
    const oldGameOptions = this.board.gameOptions;
    if (newGameOptions === undefined) {
      return;
    }

    if (newGameOptions === oldGameOptions) {
      return;
    }

    if (newGameOptions.gameDifficulty !== oldGameOptions.gameDifficulty) {
      // Re-generate the board according to the new game options chosen by the player
      this.board.gameOptions = newGameOptions;
      this.board = new Board(this.BOARD_SIZE, newGameOptions);
      return;
    }

    if (newGameOptions.showConflictingCells !== oldGameOptions.showConflictingCells) {
      this.board.gameOptions = newGameOptions;
      this.board.clearConflictingCells();
    }
  }
}
