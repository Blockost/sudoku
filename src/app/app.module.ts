import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom modules
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';

// Custom components
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FireworksComponent } from './components/fireworks/fireworks.component';
import { OptionsSelectorComponent } from './components/options-selector/options-selector.component';
import { VictoryDialogComponent } from './components/victory-dialog/victory-dialog.component';

@NgModule({
  // List of components that will be available to templates
  declarations: [
    AppComponent,
    OptionsSelectorComponent,
    FireworksComponent,
    VictoryDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule
  ],
  // List of components that will be available for injection
  providers: [],
  bootstrap: [AppComponent],
  // List of components that will be build and injected dynamically at runtime
  entryComponents: [
    OptionsSelectorComponent,
    FireworksComponent,
    VictoryDialogComponent
  ]
})
export class AppModule {}
