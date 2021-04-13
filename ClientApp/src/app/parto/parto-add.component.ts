import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Parto } from './parto.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';

@Component({
  selector: 'app-parto-add',
  templateUrl: './parto-add.component.html',
})

export class PartoAddComponent {
  parto: Parto = this.vazio();
  @Input() animal: Animal;
  @Input() partos: Parto[];
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private modalService: NgbModal,
      private animalService: AnimalService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.addParto();
    }, (reason) => {
      this.parto = this.vazio();
    });
  }

  addParto(): void {
    this.parto.id = this.animalService.genIdParto(this.partos);
    this.partos.push(this.parto);
    this.animalService.updateAnimal(this.animal).subscribe(() => {
      if (this.parto.criarFilho) {
        this.addBezerro();
      } else {
        this.parto = this.vazio();
      }
    });
  }

  private addBezerro() {
    var bezerro = this.animalService.animalVazio();
    this.animalService.getUltimoNumero().subscribe((ultimoNumero) => {
      bezerro.numero = ultimoNumero + 1;
      bezerro.nascimento = this.parto.data;
      bezerro.nome = 'Filho de ' + this.animal.nome;
      this.animalService.addAnimal(bezerro).subscribe(() => null);
      this.parto = this.vazio();
    });
  }

  vazio(): Parto {
    return {
      id: null, data: null, observacao: null, criarFilho: true,
      secagem: null, previsaoSecagem: null,
    };
  }

}
