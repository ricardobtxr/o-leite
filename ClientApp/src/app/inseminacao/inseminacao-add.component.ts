import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Inseminacao } from './inseminacao.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';

@Component({
  selector: 'app-inseminacao-add',
  templateUrl: './inseminacao-add.component.html',
})

export class InseminacaoAddComponent {
  inseminacao: Inseminacao = this.vazio();
  @Input() animal: Animal;
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private modalService: NgbModal,
      private animalService: AnimalService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.addInseminacao();
    }, (reason) => {
      this.inseminacao = this.vazio();
    });
  }

  addInseminacao(): void {
    this.inseminacao.id = this.animalService.genIdInseminacao(this.animal);
    this.animal.inseminacoes.push(this.inseminacao);
    this.animalService.updateAnimal(this.animal).subscribe(() => this.inseminacao = this.vazio());
  }

  vazio(): Inseminacao {
    return {id: null, data: null, confirmado: false};
  }

}
