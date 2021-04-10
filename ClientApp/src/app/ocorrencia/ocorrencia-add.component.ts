import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Ocorrencia } from './ocorrencia.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';
import {LISTA_OCORRENCIA} from './lista-tipo-ocorrencia';

@Component({
  selector: 'app-ocorrencia-add',
  templateUrl: './ocorrencia-add.component.html',
})

export class OcorrenciaAddComponent implements OnInit {
  ocorrencia: Ocorrencia = this.vazio();
  listaOcorrencia: String[] = LISTA_OCORRENCIA;
  @Input() animal: Animal;
  @Input() ocorrencias: Ocorrencia[];
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private modalService: NgbModal,
      private animalService: AnimalService)
  {}

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.addOcorrencia();
    }, (reason) => {
      this.ocorrencia = this.vazio();
    });
  }

  addOcorrencia(): void {
    this.ocorrencia.id = this.animalService.genIdOcorrencia(this.ocorrencias);
    this.ocorrencias.push(this.ocorrencia);
    this.animalService.updateAnimal(this.animal).subscribe(() => this.ocorrencia = this.vazio());
  }

  vazio(): Ocorrencia {
    return {id: null, data: null, nome: null, observacao: null};
  }

}
