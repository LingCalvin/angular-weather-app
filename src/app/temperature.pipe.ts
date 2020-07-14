import { Pipe, PipeTransform } from '@angular/core';
import { TemperatureUnit } from './temperature-unit.enum';

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {
  private convert(k: number, unit: TemperatureUnit): number {
    switch (unit) {
      case TemperatureUnit.CELCIUS:
        return k - 273.15;
      case TemperatureUnit.FAHRENHEIT:
        return k * (9 / 5) - 459.67;
      case TemperatureUnit.KELVIN:
        return k;
    }
  }

  transform(
    value: number,
    unit: TemperatureUnit,
    fixed?: number,
    precision?: number
  ): string {
    let result = this.convert(value, unit);
    if (fixed !== undefined) {
      result = +result.toFixed(fixed);
    }
    if (precision !== undefined) {
      result = +result.toPrecision(precision);
    }

    if (unit !== TemperatureUnit.KELVIN) {
      return `${result}\u00B0${unit}`;
    }

    return `${result} ${unit}`;
  }
}
