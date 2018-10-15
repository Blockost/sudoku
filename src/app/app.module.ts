import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom modules
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';

// Custom components
import { AppComponent } from './app.component';
import { FireworksComponent } from './components/fireworks/fireworks.component';
import { OptionsSelectorComponent } from './components/options-selector/options-selector.component';
import { VictoryDialogComponent } from './components/victory-dialog/victory-dialog.component';

// Custom services
import { FacebookService } from './services/facebook/facebook.service';

@NgModule({
  // List of components that will be available to templates
  declarations: [
    AppComponent,
    OptionsSelectorComponent,
    FireworksComponent,
    VictoryDialogComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AngularMaterialModule, FormsModule],
  // List of components that will be available for injection
  providers: [FacebookService],
  bootstrap: [AppComponent],
  // List of components that will be build and injected dynamically at runtime
  entryComponents: [OptionsSelectorComponent, FireworksComponent, VictoryDialogComponent]
})
export class AppModule {}
