import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ArcgisGeocodingService } from '../arcgis-geocoding.service';
import { Subject, Observable, of, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LocationSuggestion } from '../location-suggestion';
import { FormControl, FormGroup } from '@angular/forms';
import { Coordinates } from '../coordinates';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css'],
})
export class LocationSearchComponent implements OnInit {
  @Output() locationSelected = new EventEmitter<Coordinates>();

  coordinates: Observable<Coordinates>;
  locationForm = new FormGroup({
    location: new FormControl(''),
  });
  suggestions$!: Observable<LocationSuggestion[]>;

  private coordinatesSubject = new Subject<Coordinates>();
  private queries = new Subject<string>();

  constructor(private geocoder: ArcgisGeocodingService) {
    this.coordinates = this.coordinatesSubject.asObservable();
  }

  ngOnInit(): void {
    this.suggestions$ = this.getSuggestions();
  }

  extractSuggestionText(suggestion: LocationSuggestion): string {
    return suggestion.text;
  }

  search(query: string): void {
    this.queries.next(query);
  }

  onSubmit(): void {
    const locationSuggestion = this.locationForm.value.location;
    const singleLine = locationSuggestion.text;
    const magicKey = locationSuggestion.magicKey;
    this.geocoder.getCoordinates(singleLine, magicKey).subscribe((coord) => {
      this.locationSelected.emit(coord);
    });
    this.resetForm();
  }

  resetForm(): void {
    this.locationForm = new FormGroup({
      location: new FormControl(''),
    });
    this.suggestions$ = this.getSuggestions();
  }

  getSuggestions(): Observable<LocationSuggestion[]> {
    return this.queries.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((query) => this.geocoder.getSuggestions(query))
    );
  }
}
