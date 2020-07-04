import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number, scale: string): string {
    if (scale === 'C' || scale === 'F') {
      return `${value.toFixed()}\u00B0${scale}`;
    }
    return `${value.toString()} ${scale}`;
  }
}
