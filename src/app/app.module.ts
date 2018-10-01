import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom modules
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';

// Custom components
import { AppComponent } from './app.component';
import { DifficultySelectorComponent } from './components/difficulty-selector/difficulty-selector.component';

@NgModule({
  declarations: [AppComponent, DifficultySelectorComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AngularMaterialModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DifficultySelectorComponent]
})
export class AppModule {}
