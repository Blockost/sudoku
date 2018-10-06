import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom modules
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';

// Custom components
import { AppComponent } from './app.component';
import { DifficultySelectorComponent } from './components/difficulty-selector/difficulty-selector.component';
import { FireworksComponent } from './components/fireworks/fireworks.component';
import { VictoryDialogComponent } from './components/victory-dialog/victory-dialog.component';

@NgModule({
  // List of components that will be available to templates
  declarations: [
    AppComponent,
    DifficultySelectorComponent,
    FireworksComponent,
    VictoryDialogComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AngularMaterialModule],
  // List of components that will be available for injection
  providers: [],
  bootstrap: [AppComponent],
  // List of components that will be build and injected dynamically at runtime
  entryComponents: [
    DifficultySelectorComponent,
    FireworksComponent,
    VictoryDialogComponent
  ]
})
export class AppModule {}
