import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Ocorrencia } from './ocorrencia.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';
import { LISTA_OCORRENCIA } from './lista-tipo-ocorrencia';

@Component({
  selector: 'app-ocorrencia-detail',
  templateUrl: './ocorrencia-detail.component.html',
})

export class OcorrenciaDetailComponent {
  @Input() ocorrencia: Ocorrencia;
  @Input() ocorrencias: Ocorrencia[];
  @Input() animal: Animal;
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  listaOcorrencia: String[] = LISTA_OCORRENCIA;

  constructor(
      private modalService: NgbModal,
      private animalService: AnimalService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.updateOcorrencia();
    }, (reason) => {
      null;
    });
  }

  updateOcorrencia(): void {
    var i = 0;
    while (i < this.ocorrencias.length) {
      if (this.ocorrencias[i].id === this.ocorrencia.id) {
        this.ocorrencias[i] = this.ocorrencia;
        break;
      }
      i++;
    }
    this.animalService.updateAnimal(this.animal).subscribe(() => null);
  }

}
