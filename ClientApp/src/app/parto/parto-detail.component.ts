import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Parto } from './parto.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';

@Component({
  selector: 'app-parto-detail',
  templateUrl: './parto-detail.component.html',
})

export class PartoDetailComponent {
  @Input() parto: Parto;
  @Input() partos: Parto[];
  @Input() animal: Animal;
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private modalService: NgbModal,
      private animalService: AnimalService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.updateParto();
    }, (reason) => {
      null;
    });
  }

  updateParto(): void {
    var i = 0;
    while (i < this.partos.length) {
      if (this.partos[i].id === this.parto.id) {
        this.partos[i] = this.parto;
        return;
      }
      i++;
    }
    this.animalService.updateAnimal(this.animal).subscribe();
  }

}
