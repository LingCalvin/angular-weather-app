import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Forecast } from './forecast';
import { ForecastBlock } from './forecast-block';
import { API_KEYS } from './api-keys';
import { OpenweathermapOnecallResponse } from './openweathermap-onecall-response';

@Injectable({
  providedIn: 'root',
})
export class OpenweathermapService {
  private readonly API_KEY: string;
  private readonly API_URL = 'https://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) {
    this.API_KEY = API_KEYS.openweathermap;
  }

  static extractCurrent(
    response: OpenweathermapOnecallResponse
  ): ForecastBlock {
    const respCurrent = response.current;
    return {
      dt: respCurrent.dt,
      temp: respCurrent.temp,
      apparentTemperature: respCurrent.feels_like,
      windSpeed: respCurrent.wind_speed,
      description: respCurrent.weather[0].description,
      icon: OpenweathermapService.getIconUrl(respCurrent.weather[0].icon),
    };
  }

  static extractHourly(
    response: OpenweathermapOnecallResponse
  ): ForecastBlock[] {
    const respHourly = response.hourly;
    return respHourly.map(({ weather, feels_like, wind_speed, ...rest }) => {
      return {
        ...rest,
        apparentTemperature: feels_like,
        description: weather[0].description,
        windSpeed: wind_speed,
        icon: OpenweathermapService.getIconUrl(weather[0].icon),
      };
    });
  }

  static extractDaily(
    response: OpenweathermapOnecallResponse
  ): ForecastBlock[] {
    const respDaily = response.daily;
    return respDaily.map(({ weather, feels_like, wind_speed, ...rest }) => {
      return {
        ...rest,
        apparentTemperature: feels_like,
        description: weather[0].description,
        windSpeed: wind_speed,
        icon: OpenweathermapService.getIconUrl(weather[0].icon),
      };
    });
  }

  static getIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@4x.png`;
  }

  getForecast(latitude: number, longitude: number): Observable<Forecast> {
    const url = `${this.API_URL}onecall`;
    return this.http
      .get<OpenweathermapOnecallResponse>(url, {
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
