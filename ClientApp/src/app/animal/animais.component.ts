import { Component, OnInit } from '@angular/core';
import { Animal } from './animal.model';
import { AnimalService } from './animal.service';
import { Router } from '@angular/router';
import { MessageService } from '../messages/message.service';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
})

export class AnimaisComponent implements OnInit {

  animais: Animal[];
  selectedAnimal: Animal;
  filter = '';
  paraInseminar: boolean;
  prenha: boolean;
  todosAnimais: boolean;
  observacaoParto: boolean;

  constructor(
    private router: Router,
    private animalService: AnimalService,
    private message: MessageService
  ) {}

  onlyOneValue(e)
  {
    if (e.target.id == "paraInseminar") {
        this.paraInseminar = true;
        this.prenha = false;
        this.todosAnimais = false;
        this.observacaoParto = false;
      }
    else  if (e.target.id == "prenha") {
        this.paraInseminar = false;
        this.prenha = true ;
        this.todosAnimais = false;
        this.observacaoParto = false;
      }
    else if (e.target.id == "todosAnimais") {
      this.paraInseminar = false;
      this.prenha = false;
      this.todosAnimais = true;
      this.observacaoParto = false;
    }
    else if (e.target.id == "observacaoParto") {
      this.paraInseminar = false;
      this.prenha = false;
      this.todosAnimais = false;
      this.observacaoParto = true;
    }
  }

  ngOnInit(): void {
    this.getAnimais();
    this.todosAnimais = true;
    this.message.clear();
  }

  getAnimais(): void {
    this.animalService.getAnimais().subscribe((animais) => (this.animais = animais));
  }

  delete(animal: Animal) {
    this.animalService.deleteAnimal(animal).subscribe((response) => {
      if (typeof response !== 'undefined') {
        this.animais = this.animais.filter((animalItem) => animalItem !== animal);
      }
    });
  }

  onFilter(term: string) {
    this.filter = term;
  }

  onAdd() {
    this.router.navigate(['/novoAnimal']);
  }

}
