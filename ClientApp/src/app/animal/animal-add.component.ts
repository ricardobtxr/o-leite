import { Component } from '@angular/core';
import { Animal } from './animal.model';
import { AnimalService } from './animal.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-animal-add',
  templateUrl: './animal-add.component.html',
})
export class AnimalAddComponent {

  animal: Animal = this.animalService.animalVazio();

  constructor(
    private location: Location,
    private animalService: AnimalService
  ) {}

  onAdd() {
    this.animalService.addAnimal(this.animal).subscribe((resposta) => {
        if (resposta.messages.length == 0) {
          this.goBack();
        }
      });
  }

  goBack() {
    this.location.back();
  }

}
