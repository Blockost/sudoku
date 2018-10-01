import { NgModule } from '@angular/core';

import { MatBottomSheetModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: []
})
export class AngularMaterialModule {}
