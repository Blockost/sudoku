import { NgModule } from '@angular/core';

import { MatBottomSheetModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [MatBottomSheetModule, MatListModule, MatIconModule],
  exports: [MatBottomSheetModule, MatListModule, MatIconModule],
  declarations: []
})
export class AngularMaterialModule {}
