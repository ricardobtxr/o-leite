import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Inseminacao } from './inseminacao.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';

@Component({
  selector: 'app-inseminacao-detail',
  templateUrl: './inseminacao-detail.component.html',
})

export class InseminacaoDetailComponent {
  @Input() inseminacao: Inseminacao;
  @Input() animal: Animal;
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private modalService: NgbModal,
      private animalService: AnimalService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.updateInseminacao();
    }, (reason) => {
      null;
    });
  }

  updateInseminacao(): void {
    var i = 0;
    while (i < this.animal.inseminacoes.length) {
      if (this.animal.inseminacoes[i].id === this.inseminacao.id) {
        this.animal.inseminacoes[i] = this.inseminacao;
        break;
      }
      i++;
    }
    this.animalService.updateAnimal(this.animal).subscribe();
  }

}
