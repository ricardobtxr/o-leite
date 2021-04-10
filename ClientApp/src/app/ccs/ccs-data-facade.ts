import { AnimalService } from '../animal/animal.service';
import { AnimalChartData } from '../chart/chart-data.model';
import { Subject } from 'rxjs';
import { Animal } from '../animal/animal.model';
import { IDataFacade } from '../chart/idata-facade';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CcsDataFacade implements IDataFacade {

  constructor(
    private animalService: AnimalService
  ) { }

  public chartDataSubject = new Subject<AnimalChartData>();

  public getData(id: any): void {
    this.animalService.getAnimal(id).subscribe((animal) => {
      var animalChartData: AnimalChartData = new AnimalChartData();
      animalChartData.titulo = 'Gráfico de CCS';
      animalChartData.labelData = 'CCS';
      this.sortCcsList(animal).forEach(ccs => {
        animalChartData.labels.push(ccs.data);
        animalChartData.dados.push(ccs.valor);
      });
      this.chartDataSubject.next(animalChartData);
    });
  }

  private sortCcsList(animal: Animal) {
    var ccsLista = animal.ccsLista;
    ccsLista.sort((a, b) => (a.data > b.data) ? 1 : ((b.data > a.data) ? -1 : 0));
    return ccsLista;
  }

}
