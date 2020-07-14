import { Pipe, PipeTransform } from '@angular/core';
import { PressureUnit } from './pressure-unit.enum';

@Pipe({
  name: 'pressure',
})
export class PressurePipe implements PipeTransform {
  private convert(value: number, unit: PressureUnit): number {
    switch (unit) {
      case PressureUnit.HPA:
        return value;
    }
  }

  transform(
    value: number,
    unit: PressureUnit,
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
