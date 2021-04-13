import { Pipe, PipeTransform } from '@angular/core';
import { Inseminacao } from './inseminacao.model';

@Pipe({
  name: 'sortInsemByData'
})
export class SortInsemByDataPipe implements PipeTransform {

  transform(arr: Inseminacao[], ...args: unknown[]): Inseminacao[] {
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
