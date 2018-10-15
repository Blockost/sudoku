import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IDifficulty } from '../../models/game-difficulty';
import { FacebookService } from '../../services/facebook/facebook.service';

@Component({
  selector: 'app-victory-dialog',
  templateUrl: './victory-dialog.component.html',
  styleUrls: ['./victory-dialog.component.scss']
})
export class VictoryDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<VictoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public gameDifficulty: IDifficulty,
    private facebookService: FacebookService
  ) {}

  shareOnFacebook() {
    this.facebookService.openShareDialog();
  }

  shareOnTwitter() {
    // TODO: 2018-10-14 Blockost
    throw new Error('Not implemented');
  }

  shareOnGooglePlus() {
    // TODO: 2018-10-14 Blockost
    throw new Error('Not implemented');
  }
}
