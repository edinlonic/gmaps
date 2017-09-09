import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import GMAPs
import { AgmCoreModule } from '@agm/core';
import {DataService} from "./services/data.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'KEY HERE'
    })
  ],
  exports: [

  ],
  providers: [ DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
