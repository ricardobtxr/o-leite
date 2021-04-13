import { Pipe, PipeTransform } from '@angular/core';
import { Pesagem } from './pesagem.model';

@Pipe({
  name: 'sortPesagemByData'
})
export class SortPesagemByDataPipe implements PipeTransform {

  transform(arr: Pesagem[], ...args: unknown[]): Pesagem[] {
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
