import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Vacina } from './vacina.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';
import { LISTA } from './lista-vacina';

@Component({
  selector: 'app-vacina-detail',
  templateUrl: './vacina-detail.component.html',
})

export class VacinaDetailComponent {
  @Input() vacina: Vacina;
  @Input() vacinas: Vacina[];
  @Input() animal: Animal;
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  listaVacina: String[] = LISTA;

  constructor(
      private modalService: NgbModal,
      private animalService: AnimalService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.updateVacina();
    }, (reason) => {
      null;
    });
  }

  updateVacina(): void {
    var i = 0;
    while (i < this.vacinas.length) {
      if (this.vacinas[i].id === this.vacina.id) {
        this.vacinas[i] = this.vacina;
        break;
      }
      i++;
    }
    this.animalService.updateAnimal(this.animal).subscribe(() => null);
  }

}
