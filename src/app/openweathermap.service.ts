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
    return (({
      feels_like,
      wind_speed,
      wind_deg,
      weather,
      dew_point,
      wind_gust,
      ...rest
    }) => {
      return {
        ...rest,
        apparentTemperature: feels_like,
        windSpeed: wind_speed,
        windDeg: wind_deg,
        description: weather[0].description,
        icon: OpenweathermapService.getIconUrl(weather[0].icon),
        dewPoint: dew_point,
        windGust: wind_gust,
      };
    })(respCurrent);
  }

  static extractHourly(
    response: OpenweathermapOnecallResponse
  ): ForecastBlock[] {
    const respHourly = response.hourly;
    return respHourly.map(
      ({
        feels_like,
        wind_speed,
        wind_deg,
        weather,
        dew_point,
        wind_gust,
        ...rest
      }) => {
        return {
          ...rest,
          apparentTemperature: feels_like,
          windSpeed: wind_speed,
          windDeg: wind_deg,
          description: weather[0].description,
          icon: OpenweathermapService.getIconUrl(weather[0].icon),
          dewPoint: dew_point,
          windGust: wind_gust,
        };
      }
    );
  }

  static extractDaily(
    response: OpenweathermapOnecallResponse
  ): ForecastBlock[] {
    const respDaily = response.daily;
    return respDaily.map(
      ({
        feels_like,
        wind_speed,
        wind_deg,
        weather,
        dew_point,
        wind_gust,
        ...rest
      }) => {
        return {
          ...rest,
          apparentTemperature: feels_like,
          windSpeed: wind_speed,
          windDeg: wind_deg,
          description: weather[0].description,
          icon: OpenweathermapService.getIconUrl(weather[0].icon),
          dewPoint: dew_point,
          windGust: wind_gust,
        };
      }
    );
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
