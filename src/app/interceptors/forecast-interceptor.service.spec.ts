import { TestBed } from '@angular/core/testing';

import { ForecastInterceptorService } from './forecast-interceptor.service';

describe('ForecastInterceptorService', () => {
  let service: ForecastInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
