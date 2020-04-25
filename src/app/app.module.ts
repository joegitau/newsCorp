import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { WeatherModule } from './weather/weather.module';
import { AppComponent } from './app.component';
import { ForecastInterceptorService } from './interceptors/forecast-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WeatherModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: ForecastInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
