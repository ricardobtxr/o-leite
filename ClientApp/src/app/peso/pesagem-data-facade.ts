import { AnimalService } from '../animal/animal.service';
import { AnimalChartData } from '../chart/chart-data.model';
import { Subject } from 'rxjs';
import { Animal } from '../animal/animal.model';
import { IDataFacade } from '../chart/idata-facade';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PesagemDataFacade implements IDataFacade {

  constructor(
    private animalService: AnimalService
  ) { }

  public chartDataSubject = new Subject<AnimalChartData>();

  public getData(id: any): void {
    this.animalService.getAnimal(id).subscribe((animal) => {
      var animalChartData: AnimalChartData = new AnimalChartData();
      animalChartData.titulo = 'Gráfico de Pesagem de Animais';
      animalChartData.labelData = 'Peso do Animal';
      this.sortPesagens(animal).forEach(pesagem => {
        animalChartData.labels.push(pesagem.data);
        animalChartData.dados.push(pesagem.peso);
      });
      this.chartDataSubject.next(animalChartData);
    });
  }

  private sortPesagens(animal: Animal) {
    var pesagens = animal.pesagens;
    pesagens.sort((a, b) => (a.data > b.data) ? 1 : ((b.data > a.data) ? -1 : 0));
    return pesagens;
  }

}
