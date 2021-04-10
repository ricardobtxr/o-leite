import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Inseminacao } from './inseminacao.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';

@Component({
  selector: 'app-inseminacoes',
  templateUrl: './inseminacoes.component.html',
})
export class InseminacoesComponent implements OnInit {

  @Input() animal: Animal;
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
  }

  delete(inseminacao: Inseminacao): void {
    var i = 0;
    while (i < this.animal.inseminacoes.length) {
      if (this.animal.inseminacoes[i].id === inseminacao.id) {
        this.animal.inseminacoes.splice(i, 1);
        this.animalService.updateAnimal(this.animal).subscribe(() => null);
        break;
      }
      i++;
    }
  }

}
