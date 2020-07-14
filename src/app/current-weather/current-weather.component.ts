import { Component, OnInit, Input } from '@angular/core';
import { ForecastBlock } from '../forecast-block';
import { TemperatureDict } from '../temperature-dict';
import { SpeedUnit } from '../speed-unit.enum';
import { TemperatureUnit } from '../temperature-unit.enum';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  @Input() weather!: ForecastBlock;
  @Input() speedUnit = SpeedUnit.MILES_PER_HOUR;
  @Input() temperatureUnit = TemperatureUnit.FAHRENHEIT;

  constructor() {}

  ngOnInit(): void {}

  extractTemp(temp: number | TemperatureDict): number {
    return temp as number;
  }
}
