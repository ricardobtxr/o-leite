import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ccs } from './ccs.model';
import { Animal } from '../animal/animal.model';
import {AnimalService} from '../animal/animal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ccs-lista',
  templateUrl: './ccs-lista.component.html',
})
export class CcsListaComponent implements OnInit {

  @Input() animal: Animal;
  @Input() ccsLista: Ccs[];
  @Input() chartName: string;
  @Output() animalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private animalService: AnimalService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  delete(ccs: Ccs): void {
    var i = 0;
    while (i < this.ccsLista.length) {
      if (this.ccsLista[i].id === ccs.id) {
        this.ccsLista.splice(i, 1);
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
