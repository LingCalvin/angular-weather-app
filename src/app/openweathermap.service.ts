import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Forecast } from './forecast';
import { ForecastBlock } from './forecast-block';
import { API_KEYS } from './api-keys';

@Injectable({
  providedIn: 'root',
})
export class OpenweathermapService {
  private readonly API_KEY: string;
  private readonly API_URL = 'https://api.openweathermap.org/data/2.5/';
  constructor(private http: HttpClient) {
    this.API_KEY = API_KEYS.openweathermap;
  }

  static extractCurrent(response: any): ForecastBlock {
    const respCurrent = response.current;
    return {
      dt: respCurrent.dt,
      temp: respCurrent.temp,
      windSpeed: respCurrent.wind_speed,
      description: respCurrent.weather[0].description,
    };
  }

  static extractHourly(response: any): ForecastBlock[] {
    const respHourly: { weather: Array<any> }[] = response.hourly;
    return respHourly.map(({ weather, ...rest }) => {
      return { ...rest, description: weather[0].description } as ForecastBlock;
    });
  }

  static extractDaily(response: any): ForecastBlock[] {
    const respDaily: { weather: Array<any> }[] = response.daily;
    return respDaily.map(({ weather, ...rest }) => {
      return { ...rest, description: weather[0].description } as ForecastBlock;
    });
  }

  getForecast(latitude: number, longitude: number): Observable<Forecast> {
    const url = `${this.API_URL}onecall`;
    return this.http
      .get(url, {
        params: {
          lat: latitude.toString(),
          lon: longitude.toString(),
          appid: this.API_KEY,
        },
      })
      .pipe(
        map((resp) => {
          return {
            current: OpenweathermapService.extractCurrent(resp),
            hourly: OpenweathermapService.extractHourly(resp),
            daily: OpenweathermapService.extractDaily(resp),
          };
        })
      );
  }
}
