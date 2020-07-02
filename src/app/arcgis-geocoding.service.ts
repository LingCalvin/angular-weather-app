import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocationSuggestion } from './location-suggestion';
import { ArcgisSuggestResponse } from './arcgis-suggest-response';
import { Coordinates } from './coordinates';
import { splitNsName } from '@angular/compiler';

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
    const params: any = { f: 'json', Singleline: singleLine };
    if (magicKey) {
      params.magicKey = magicKey;
    }
    return this.http
      .get(`${this.API_URL}findAddressCandidates`, { params })
      .pipe(
        map((resp) => {
          const candidates: Array<any> = (resp as { candidates: [] })
            .candidates;
          return {
            latitude: +candidates[0].location.y,
            longitude: +candidates[0].location.x,
          };
        })
      );
  }
}
