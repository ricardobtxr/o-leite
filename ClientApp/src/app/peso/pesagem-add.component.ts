import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Pesagem } from './pesagem.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';

@Component({
  selector: 'app-pesagem-add',
  templateUrl: './pesagem-add.component.html',
})

export class PesagemAddComponent {
  pesagem: Pesagem = this.vazio();
  @Input() animal: Animal;
  @Input() pesagens: Pesagem[];
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private modalService: NgbModal,
      private animalService: AnimalService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.addPesagem();
    }, (reason) => {
      this.pesagem = this.vazio();
    });
  }

  addPesagem(): void {
    this.pesagem.id = this.animalService.genIdPesagem(this.pesagens);
    this.pesagens.push(this.pesagem);
    this.animalService.updateAnimal(this.animal).subscribe(() => this.pesagem = this.vazio());
  }

  vazio(): Pesagem {
    return {id: null, data: null, peso: null};
  }

}
