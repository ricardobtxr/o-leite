import { Component, OnInit } from '@angular/core';
import { Pesagem } from './pesagem.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';
import { Location } from '@angular/common';
import { MessageService } from '../messages/message.service';

@Component({
  selector: 'app-pesagem-lote',
  templateUrl: './pesagem-lote.component.html',
})
export class PesagemLoteComponent implements OnInit {
  pesagem: Pesagem;
  animal: Animal;
  numeroAnimal: number;
  pesoLeite: number;
  dataPesagem: Date;

  constructor(
    private location: Location,
    private animalService: AnimalService,
    private messaging: MessageService) { }

  ngOnInit(): void {
    this.dataPesagem = new Date();
    this.dataPesagem.setHours(0);
    this.dataPesagem.setMinutes(0);
    this.dataPesagem.setSeconds(0);
  }

  addPesagem(): void {
    this.messaging.clear();
    this.animalService.getAnimalByNumero(this.numeroAnimal).subscribe((animal) => {
      if (!animal) return;
      this.animal = animal;
      this.pesagem = {
        'id': this.animalService.genIdPesagem(this.animal.pesagensLeite),
        'peso': this.pesoLeite,
        'data': this.dataPesagem
      }
      this.animal.pesagensLeite.push(this.pesagem);
      var numero = this.numeroAnimal;
      this.animalService.updateAnimal(this.animal).subscribe((result) => {
        console.log(result);
        if (result.messages && result.messages.length>0) {
        } else {
          this.messaging.add(`Peso cadastrado para o animal número ${numero}.`);
        }
        this.numeroAnimal = null;
        this.pesoLeite = null;
      });
    });
  }

  goBack() {
    this.location.back();
  }

}
