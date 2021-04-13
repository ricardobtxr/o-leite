import { Pipe, PipeTransform } from '@angular/core';
import { Parto } from './parto.model';

@Pipe({
  name: 'sortPartoByData'
})
export class SortPartoByDataPipe implements PipeTransform {

  transform(arr: Parto[], ...args: unknown[]): Parto[] {
    return arr.sort((a, b) => {
      if (a.data > b.data) {
        return -1;
      }
      if (a.data < b.data) {
        return 1;
      }
      return 0;
    });
  }

}
