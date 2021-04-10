import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vacina } from './vacina.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';

@Component({
  selector: 'app-vacinas',
  templateUrl: './vacinas.component.html',
})
export class VacinasComponent implements OnInit {

  @Input() animal: Animal;
  @Input() vacinas: Vacina[];
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
  }

  delete(vacina: Vacina): void {
    var i = 0;
    while (i < this.vacinas.length) {
      if (this.vacinas[i].id === vacina.id) {
        this.vacinas.splice(i, 1);
        break;
      }
      i++;
    }
    this.animalService.updateAnimal(this.animal).subscribe(() => null);
  }

}
