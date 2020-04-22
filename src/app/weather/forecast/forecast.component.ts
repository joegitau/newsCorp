import { Component, OnInit } from '@angular/core';

import { ForecastService } from '../forecast.service';
import { Forecast } from './shared/weather-schema';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  forecast$: Observable<Forecast[]>;

  constructor(private forecastService: ForecastService) { }

  ngOnInit(): void {
    this.forecast$ = this.forecastService.getForecast();
  }

}
