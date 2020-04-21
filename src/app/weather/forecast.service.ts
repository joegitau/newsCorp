import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  getForecast() {
    return this.getCurrentLocation()
      .pipe(
        map( coords => {
          return new HttpParams()
            .set('lat', String(coords.latitude))
            .set('lon', String(coords.longitude))
            .set('units', 'metrics')
            .set('appid', 'ffda23cc6f49430837eac691ed4e8754')
        })
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

  constructor() { }
}
