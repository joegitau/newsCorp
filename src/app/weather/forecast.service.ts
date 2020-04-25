import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, pluck, mergeMap, filter, toArray, share } from 'rxjs/operators'
import { WeatherRes, Forecast } from './forecast/shared/weather-schema';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }

  getForecast(): Observable<Forecast[]> {
    return this.getCurrentLocation()
      .pipe(
        map(coords => {
          return new HttpParams()
            .set('lat', String(coords.latitude))
            .set('lon', String(coords.longitude))
            .set('units', 'metric')
            .set('appid', 'ffda23cc6f49430837eac691ed4e8754')
        }),
        switchMap(params => this.http.get<WeatherRes>(this.BASE_URL, { params })),
        pluck('list'),
        mergeMap(value => of(...value)),
        filter((valAsObs, index) => index % 8 === 0),
        map(valAsObs => {
          return {
            dateStr: valAsObs.dt_txt,
            temp: valAsObs.main.temp
          }
        }),
        toArray(),
        share()
      );
  }

  getCurrentLocation(): Observable<Coordinates> {
    return new Observable<Coordinates>(observer => {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          observer.next(position.coords);
          observer.complete();
        },
        err => observer.error(err)
      )
    });
  }

}
