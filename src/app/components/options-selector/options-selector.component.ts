import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { GameDifficulty } from '../../models/game-difficulty';

@Component({
  selector: 'app-options-selector',
  templateUrl: './options-selector.component.html',
  styleUrls: ['./options-selector.component.scss']
})
export class OptionsSelectorComponent {
  gameDifficulties = GameDifficulty.getList();

  constructor(private bottomSheetRef: MatBottomSheetRef) {}

  selectDifficulty(difficulty: string) {
    // Send the chosen difficulty back to the bottom sheet opener
    // and close it
    this.bottomSheetRef.dismiss(difficulty);
  }
}
