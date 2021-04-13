import { Pipe, PipeTransform } from '@angular/core';
import { Ocorrencia } from './ocorrencia.model';

@Pipe({
  name: 'sortOcorrenciaByData'
})
export class SortOcorrenciaByDataPipe implements PipeTransform {

  transform(arr: Ocorrencia[], ...args: unknown[]): Ocorrencia[] {
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
