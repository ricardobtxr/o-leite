import { Component, OnInit } from '@angular/core';
import { Inseminacao } from './inseminacao.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';
import { Location } from '@angular/common';
import { MessageService } from '../messages/message.service';

@Component({
  selector: 'app-inseminacao-lote',
  templateUrl: './inseminacao-lote.component.html',
})
export class InseminacaoLoteComponent implements OnInit {
  inseminacao: Inseminacao;
  animal: Animal;
  numeroAnimal: number;
  dataInseminacao: Date;

  constructor(
    private location: Location,
    private animalService: AnimalService,
    private messaging: MessageService) { }

  ngOnInit(): void {
    this.dataInseminacao = new Date();
    this.dataInseminacao.setHours(0);
    this.dataInseminacao.setMinutes(0);
    this.dataInseminacao.setSeconds(0);
  }

  addInseminacao(): void {
    this.messaging.clear();
    this.animalService.getAnimalByNumero(this.numeroAnimal).subscribe((animal) => {
      if (!animal) return;
      this.animal = animal;
      this.inseminacao = {
        'id': this.animalService.genIdInseminacao(this.animal),
        'data': this.dataInseminacao,
        'confirmado': false
      }
      this.animal.inseminacoes.push(this.inseminacao);
      var numero = this.numeroAnimal;
      this.animalService.updateAnimal(this.animal).subscribe((result) => {
        console.log(result);
        if (result.messages && result.messages.length>0) {
        } else {
          this.messaging.add(`Inseminação cadastrada para o animal número ${numero}.`);
        }
      });
      this.numeroAnimal = null;
    });
  }

  goBack() {
    this.location.back();
  }

}
