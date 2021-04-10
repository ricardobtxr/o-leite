import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Pesagem } from './pesagem.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';

@Component({
  selector: 'app-pesagem-detail',
  templateUrl: './pesagem-detail.component.html',
})

export class PesagemDetailComponent {
  @Input() pesagem: Pesagem;
  @Input() pesagens: Pesagem[];
  @Input() animal: Animal;
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private modalService: NgbModal,
      private animalService: AnimalService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.updatePesagem();
    }, (reason) => {
      null;
    });
  }

  updatePesagem(): void {
    var i = 0;
    while (i < this.pesagens.length) {
      if (this.pesagens[i].id === this.pesagem.id) {
        this.pesagens[i] = this.pesagem;
        break;
      }
      i++;
    }
    this.animalService.updateAnimal(this.animal).subscribe(() => null);
  }

}
