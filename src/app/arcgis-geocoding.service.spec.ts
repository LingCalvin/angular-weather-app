import { TestBed } from '@angular/core/testing';

import { ArcgisGeocodingService } from './arcgis-geocoding.service';

describe('ArcgisGeocodingService', () => {
  let service: ArcgisGeocodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArcgisGeocodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
