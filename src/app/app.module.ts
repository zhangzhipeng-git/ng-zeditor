import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgZeditorModule} from '../../dist/bigbigbird/ng-zeditor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgZeditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
