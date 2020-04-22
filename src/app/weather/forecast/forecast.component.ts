import { Component, OnInit } from '@angular/core';

import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  constructor(private forecastService: ForecastService) { }

  ngOnInit(): void {
    this.forecastService.getForecast().subscribe(forecastData => console.log(forecastData));
  }

}
