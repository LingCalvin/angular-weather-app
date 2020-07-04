import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocationSuggestion } from './location-suggestion';
import { ArcgisSuggestResponse } from './arcgis-suggest-response';
import { Coordinates } from './coordinates';
import { Location } from './location';
import { ArcgisReversegeocodeJsonResponse } from './arcgis-reversegeocode-json-response';

@Injectable({
  providedIn: 'root',
})
export class ArcgisGeocodingService {
  API_URL =
    'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/';

  constructor(private http: HttpClient) {}

  getSuggestions(query: string): Observable<LocationSuggestion[]> {
    if (!query.trim()) {
      return of([]);
    }
    const url = `${this.API_URL}suggest`;
    return this.http
      .get<ArcgisSuggestResponse>(url, { params: { text: query, f: 'json' } })
      .pipe(
        map((resp) => {
          return resp.suggestions;
        })
      );
  }

  getCoordinates(
    singleLine: string,
    magicKey?: string
  ): Observable<Coordinates> {
    type HttpParameters = { [param: string]: string };
    const params: HttpParameters = { f: 'json', Singleline: singleLine };
    if (magicKey) {
      params.magicKey = magicKey;
    }
    return this.http
      .get(`${this.API_URL}findAddressCandidates`, { params })
      .pipe(
        map((resp) => {
          const candidates = (resp as {
            candidates: { location: { x: number; y: number } }[];
          }).candidates;
          return {
            latitude: +candidates[0].location.y,
            longitude: +candidates[0].location.x,
          };
        })
      );
  }

  reverseGeocode(latitude: number, longitude: number): Observable<Location> {
    type HttpParameters = { [param: string]: string };
    const params: HttpParameters = {
      f: 'json',
      location: `${longitude},${latitude}`,
    };
    return this.http
      .get<ArcgisReversegeocodeJsonResponse>(`${this.API_URL}reverseGeocode`, {
        params,
      })
      .pipe(
        map((resp) => {
          return {
            city: resp.address.City,
            region: resp.address.Region,
            country: resp.address.CountryCode,
            latitude: resp.location.y,
            longitude: resp.location.x,
          };
        })
      );
  }
}
