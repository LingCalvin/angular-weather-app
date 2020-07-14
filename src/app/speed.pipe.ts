import { Pipe, PipeTransform } from '@angular/core';
import { SpeedUnit } from './speed-unit.enum';

@Pipe({
  name: 'speed',
})
export class SpeedPipe implements PipeTransform {
  private convert(value: number, unit: SpeedUnit): number {
    switch (unit) {
      case SpeedUnit.METERS_PER_SECOND:
        return value;
      case SpeedUnit.MILES_PER_HOUR:
        return value * 2.237;
    }
  }

  transform(
    value: number,
    unit: SpeedUnit,
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

    return `${result} ${unit}`;
  }
}
