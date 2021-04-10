import { Component, OnInit, Input } from '@angular/core';
import { Animal } from './animal.model';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from './animal.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
})
export class AnimalDetailComponent implements OnInit {

  @Input() animal: Animal;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private animalService: AnimalService
  ) {}

  getAnimal(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.animalService.getAnimal(id).subscribe((animal) => (this.animal = animal));
  }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.getAnimal();
  }

  save() {
    this.animalService.updateAnimal(this.animal).subscribe((resposta) => {
      if (resposta.messages.length == 0) {
        this.goBack();
      }
    });
  }

}
