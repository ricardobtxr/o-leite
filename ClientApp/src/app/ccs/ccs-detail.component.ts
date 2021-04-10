import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Ccs } from './ccs.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';

@Component({
  selector: 'app-ccs-detail',
  templateUrl: './ccs-detail.component.html',
})

export class CcsDetailComponent {
  @Input() ccs: Ccs;
  @Input() ccsLista: Ccs[];
  @Input() animal: Animal;
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private modalService: NgbModal,
      private animalService: AnimalService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.updateCcs();
    }, (reason) => {
      null;
    });
  }

  updateCcs(): void {
    var i = 0;
    while (i < this.ccsLista.length) {
      if (this.ccsLista[i].id === this.ccs.id) {
        this.ccsLista[i] = this.ccs;
        break;
      }
      i++;
    }
    this.animalService.updateAnimal(this.animal).subscribe(() => null);
  }

}
