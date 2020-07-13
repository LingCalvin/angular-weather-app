import { TemperatureDict } from './temperature-dict';

export interface ForecastBlock {
  dt: number;
  temp: number | TemperatureDict;
  apparentTemperature: number | TemperatureDict;
  windSpeed: number;
  description: string;
  icon: string;
}
