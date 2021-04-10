import { Pipe, PipeTransform } from '@angular/core';
import { Animal } from './animal.model';

@Pipe({
  name: 'animalFilter'
})
export class AnimalFilterPipe implements PipeTransform {

  transform(animais: Animal[], filter: string): Animal[] {
    const nameFilter = filter.trim().toLowerCase();

    if (!nameFilter) {
      return animais;
    }

    return (
      animais && animais.filter(
        (animal) => (
             animal.nome.toLowerCase().indexOf(nameFilter) !== -1
          || animal.numero.toString() === nameFilter)
      ));
  }

}
