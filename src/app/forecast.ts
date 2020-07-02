import { ForecastBlock } from './forecast-block';

export interface Forecast {
  readonly current: ForecastBlock;
  readonly hourly: ForecastBlock[];
  readonly daily: ForecastBlock[];
}
