import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ocorrencia } from './ocorrencia.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';

@Component({
  selector: 'app-ocorrencias',
  templateUrl: './ocorrencias.component.html',
})
export class OcorrenciasComponent implements OnInit {

  @Input() animal: Animal;
  @Input() ocorrencias: Ocorrencia[];
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
  }

  delete(ocorrencia: Ocorrencia): void {
    var i = 0;
    while (i < this.ocorrencias.length) {
      if (this.ocorrencias[i].id === ocorrencia.id) {
        this.ocorrencias.splice(i, 1);
        break;
      }
      i++;
    }
    this.animalService.updateAnimal(this.animal).subscribe(() => null);
  }

}
