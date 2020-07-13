import { Component, OnInit, Input } from '@angular/core';
import { ForecastBlock } from '../forecast-block';
import { TemperatureDict } from '../temperature-dict';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.css'],
})
export class DailyForecastComponent implements OnInit {
  @Input() weather!: ForecastBlock[];

  constructor() {}

  ngOnInit(): void {}

  extractTemperatureDict(dict: number | TemperatureDict): TemperatureDict {
    return dict as TemperatureDict;
  }
}
