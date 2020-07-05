import { Component, OnInit, Input } from '@angular/core';
import { ForecastBlock } from '../forecast-block';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.css'],
})
export class HourlyForecastComponent implements OnInit {
  @Input() weather!: ForecastBlock[];

  constructor() {}

  ngOnInit(): void {}
}
