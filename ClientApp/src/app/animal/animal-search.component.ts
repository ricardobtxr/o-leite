import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AnimalService } from './animal.service';
import { Animal } from './animal.model';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-animal-search',
  templateUrl: './animal-search.component.html'
})

export class AnimalSearchComponent implements OnInit {

  animais$: Observable<Animal[]>; // Convenção utilizar o $ no final de variáveis do tipo Observable
  private searchTerms = new Subject<string>();

  constructor(private animalService: AnimalService) {}

  ngOnInit(): void {
    this.getAnimais();
  }

  getAnimais() {
    this.animais$ = this.searchTerms.pipe(
      debounceTime(300),        // Aguardar digitação
      distinctUntilChanged(),   // Não faz nova busca se não mudar o termpo
      // Buscar no backend
      switchMap((term: string) => this.animalService.searchAnimais(term))
    );
  }

  onSearch(term: string) {
    this.searchTerms.next(term);
  }

}
