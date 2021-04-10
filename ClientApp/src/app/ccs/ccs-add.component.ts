import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Ccs } from './ccs.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';

@Component({
  selector: 'app-ccs-add',
  templateUrl: './ccs-add.component.html',
})

export class CcsAddComponent {
  ccs: Ccs = this.vazio();
  @Input() animal: Animal;
  @Input() ccsLista: Ccs[];
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private modalService: NgbModal,
      private animalService: AnimalService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.addCcs();
    }, (reason) => {
      this.ccs = this.vazio();
    });
  }

  addCcs(): void {
    this.ccs.id = this.animalService.genIdCcs(this.ccsLista);
    this.ccsLista.push(this.ccs);
    this.animalService.updateAnimal(this.animal).subscribe(() => this.ccs = this.vazio());
  }

  vazio(): Ccs {
    return {id: null, data: null, valor: null};
  }

}
