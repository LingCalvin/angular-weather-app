import { TemperatureDict } from './temperature-dict';

export interface ForecastBlock {
  dt: number;
  temp: number | TemperatureDict;
  apparentTemperature: number | TemperatureDict;
  windSpeed: number;
  description: string;
  icon: string;
  pressure: number;
  humidity: number;
  dewPoint: number;
  uvi: number;
  clouds: number;
  visibility: number;
  windGust?: number;
  windDeg: number;
  rain?: number;
  snow?: number;
}
