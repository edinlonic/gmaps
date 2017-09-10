import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';

// Import GMAPs
import { AgmCoreModule } from '@agm/core';
import { DataService } from './services/data.service';
import { DirectionsMapDirective  } from './directives/map-directions.directive';

@NgModule({
  declarations: [
    AppComponent,
    DirectionsMapDirective
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCKvcmdt69DOW-_INM7ltCooGLRSfjtclM'
    }),
    FormsModule,
    HttpModule
  ],
  exports: [

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
