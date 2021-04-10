import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Vacina } from './vacina.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';
import {LISTA} from './lista-vacina';

@Component({
  selector: 'app-vacina-add',
  templateUrl: './vacina-add.component.html',
})

export class VacinaAddComponent implements OnInit {
  vacina: Vacina = this.vazio();
  listaVacina: String[] = LISTA;
  @Input() animal: Animal;
  @Input() vacinas: Vacina[];
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private modalService: NgbModal,
      private animalService: AnimalService)
  {}

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.addVacina();
    }, (reason) => {
      this.vacina = this.vazio();
    });
  }

  addVacina(): void {
    this.vacina.id = this.animalService.genIdVacina(this.vacinas);
    this.vacinas.push(this.vacina);
    this.animalService.updateAnimal(this.animal).subscribe(() => this.vacina = this.vazio());
  }

  vazio(): Vacina {
    return {id: null, data: null, nome: null};
  }

}
