import { NgModule } from '@angular/core';

import {
  MatBottomSheetModule,
  MatButtonModule,
  MatDialogModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: []
})
export class AngularMaterialModule {}
