import { Component, OnInit, Input } from '@angular/core';
import { ForecastBlock } from '../forecast-block';
import { TemperatureDict } from '../temperature-dict';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  @Input() weather?: ForecastBlock;

  constructor() {}

  ngOnInit(): void {}

  extractTemp(temp: number | TemperatureDict): number {
    return temp as number;
  }
}
