import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { GameDifficulty } from '../../models/game-difficulty';
import { GameOptions } from '../../models/game-options';

@Component({
  selector: 'app-options-selector',
  templateUrl: './options-selector.component.html',
  styleUrls: ['./options-selector.component.scss']
})
export class OptionsSelectorComponent {
  gameDifficulties = GameDifficulty.getList();

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public gameOptions: GameOptions
  ) {}

  selectDifficulty(difficultyName: string) {
    this.gameOptions.gameDifficulty = GameDifficulty.parse(difficultyName);
  }

  apply() {
    // Send the new game options back to the bottom sheet opener and close it
    this.bottomSheetRef.dismiss(this.gameOptions);
  }

  cancel() {
    this.bottomSheetRef.dismiss();
  }
}
