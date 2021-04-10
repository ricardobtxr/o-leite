import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Parto } from './parto.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';

@Component({
  selector: 'app-partos',
  templateUrl: './partos.component.html',
})
export class PartosComponent implements OnInit {

  @Input() animal: Animal;
  @Input() partos: Parto[];
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
  }

  delete(parto: Parto): void {
    var i = 0;
    while (i < this.partos.length) {
      if (this.partos[i].id === parto.id) {
        this.partos.splice(i, 1);
        break;
      }
      i++;
    }
    this.animalService.updateAnimal(this.animal).subscribe(() => null);
  }

}
