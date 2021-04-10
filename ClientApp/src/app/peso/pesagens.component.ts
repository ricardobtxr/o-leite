import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pesagem } from './pesagem.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesagens',
  templateUrl: './pesagens.component.html',
})
export class PesagensComponent implements OnInit {

  @Input() animal: Animal;
  @Input() pesagens: Pesagem[];
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() chartName: String;

  constructor(
    private animalService: AnimalService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  delete(pesagem: Pesagem): void {
    var i = 0;
    while (i < this.pesagens.length) {
      if (this.pesagens[i].id === pesagem.id) {
        this.pesagens.splice(i, 1);
        break;
      }
      i++;
    }
    this.animalService.updateAnimal(this.animal).subscribe(() => null);
  }

  showChart(): void {
    this.router.navigateByUrl('/chart/'+this.animal.id+'?chartName='+this.chartName);
  }

}
