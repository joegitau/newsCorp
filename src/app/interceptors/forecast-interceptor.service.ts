import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { ForecastService } from '../weather/forecast.service';

@Injectable({
  providedIn: 'root'
})
export class ForecastInterceptorService implements HttpInterceptor {

  constructor(private forecastService: ForecastService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const params = this.forecastService
      .getCurrentLocation()
      .pipe(
        map(coords => {
          return new HttpParams()
            .set('lat', String(coords.latitude))
            .set('lon', String(coords.longitude))
            .set('units', 'metric')
            .set('appid', 'ffda23cc6f49430837eac691ed4e8754')
        })
      )

    return params.pipe(mergeMap(ps => {
      const clonedReq = req.clone({ params: ps });
      return next.handle(clonedReq);
    }));
  }
}
