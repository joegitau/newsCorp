import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'
import { WeatherRes } from './forecast/shared/weather-schema';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private BASE_URL = 'api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }

  getForecast() {
    return this.getCurrentLocation()
      .pipe(
        map( coords => {
          return new HttpParams()
            .set('lat', String(coords.latitude))
            .set('lon', String(coords.longitude))
            .set('units', 'metrics')
            .set('appid', 'ffda23cc6f49430837eac691ed4e8754')
        }),
        switchMap(params => this.http.get<WeatherRes>(this.BASE_URL, { params }))
      );
  }

  getCurrentLocation(): Observable<Coordinates> {
    return new Observable(subscribe => {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          subscribe.next(position.coords);
          subscribe.complete();
        },
        error => console.error(error)
      )
    });
  }

}
