import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordinates } from '../coordinates';
import { LocationSearchComponent } from '../location-search/location-search.component';
import { OpenweathermapService } from '../openweathermap.service';
import { Forecast } from '../forecast';
import { ArcgisGeocodingService } from '../arcgis-geocoding.service';
import { Location } from '../location';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit, AfterViewInit {
  @ViewChild('locationSearch') locationSearch!: LocationSearchComponent;
  coordinates$!: Observable<Coordinates>;
  forecast$?: Observable<Forecast>;
  title = '';

  onLocationSelected(coordinates: Coordinates): void {
    this.geocoder
      .reverseGeocode(coordinates.latitude, coordinates.longitude)
      .subscribe((loc: Location) => {
        this.title = `${loc.city}, ${loc.region}`;
      });
    this.forecast$ = this.weatherService.getForecast(
      coordinates.latitude,
      coordinates.longitude
    );
  }

  constructor(
    private weatherService: OpenweathermapService,
    private geocoder: ArcgisGeocodingService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.coordinates$ = this.locationSearch.coordinates;
    this.locationSearch.coordinates.subscribe((coord) => {
      this.geocoder
        .reverseGeocode(coord.latitude, coord.longitude)
        .subscribe((loc) => {
          this.title = `${loc.city}, ${loc.region}`;
        });
      this.forecast$ = this.weatherService.getForecast(
        coord.latitude,
        coord.longitude
      );
    });
  }
}
