export interface OpenweathermapOnecallResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_gust?: number;
    wind_deg: number;
    weather: { id: number; main: string; description: string; icon: string }[];
  };
  minutely?: { dt: number; precipitation: number }[];
  hourly: {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_gust?: number;
    wind_deg: number;
    weather: { id: number; main: string; description: string; icon: string }[];
  }[];
  daily: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: {
      morn: number;
      day: number;
      eve: number;
      night: number;
      min: number;
      max: number;
    };
    feels_like: {
      morn: number;
      day: number;
      eve: number;
      night: number;
      min: number;
      max: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_gust?: number;
    wind_deg: number;
    rain?: number;
    snow?: number;
    weather: { id: number; main: string; description: string; icon: string }[];
  }[];
}
