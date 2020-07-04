import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTemperature',
})
export class ConvertTemperaturePipe implements PipeTransform {
  transform(value: number, sourceScale: string, targetScale: string): number {
    if (sourceScale === 'K' && targetScale === 'C') {
      return value - 273.15;
    }
    if (sourceScale === 'K' && targetScale === 'F') {
      return value * (9 / 5) - 459.67;
    }
    return value;
  }
}
