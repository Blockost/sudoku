import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { GameDifficulty } from '../../models/game-difficulty';

@Component({
  selector: 'app-difficulty-selector',
  templateUrl: './difficulty-selector.component.html',
  styleUrls: ['./difficulty-selector.component.scss']
})
export class DifficultySelectorComponent {
  gameDifficulty = Object.keys(GameDifficulty);

  constructor(private bottomSheetRef: MatBottomSheetRef) {}

  selectDifficulty(difficulty: string) {
    // Send the chosen difficulty back to the bottom sheet opener
    // and close it
    this.bottomSheetRef.dismiss(difficulty);
  }
}
