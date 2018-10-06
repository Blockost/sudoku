import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IDifficulty } from '../../models/game-difficulty';

@Component({
  selector: 'app-victory-dialog',
  templateUrl: './victory-dialog.component.html',
  styleUrls: ['./victory-dialog.component.scss']
})
export class VictoryDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<VictoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public gameDifficulty: IDifficulty
  ) {}
}
