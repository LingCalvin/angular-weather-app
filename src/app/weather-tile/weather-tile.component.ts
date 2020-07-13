import { Component, OnInit, Input } from '@angular/core';
import { ForecastBlock } from '../forecast-block';
import { TemperatureDict } from '../temperature-dict';

@Component({
  selector: 'app-weather-tile',
  templateUrl: './weather-tile.component.html',
  styleUrls: ['./weather-tile.component.css'],
})
export class WeatherTileComponent implements OnInit {
  @Input() weather!: ForecastBlock;

  constructor() {}

  ngOnInit(): void {}

  extractTemp(temp: number | TemperatureDict): number {
    return temp as number;
  }
}
