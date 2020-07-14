import { Component, OnInit, Input } from '@angular/core';
import { ForecastBlock } from '../forecast-block';
import { TemperatureDict } from '../temperature-dict';
import { SpeedUnit } from '../speed-unit.enum';
import { TemperatureUnit } from '../temperature-unit.enum';
import { PressureUnit } from '../pressure-unit.enum';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.css'],
})
export class DailyForecastComponent implements OnInit {
  @Input() weather!: ForecastBlock[];
  @Input() pressureUnit = PressureUnit.HPA;
  @Input() speedUnit = SpeedUnit.MILES_PER_HOUR;
  @Input() temperatureUnit = TemperatureUnit.FAHRENHEIT;

  constructor() {}

  ngOnInit(): void {}

  extractTemperatureDict(dict: number | TemperatureDict): TemperatureDict {
    return dict as TemperatureDict;
  }
}
