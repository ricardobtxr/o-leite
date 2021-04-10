import { Pipe, PipeTransform } from '@angular/core';
import { Animal } from './animal.model';

@Pipe({
  name: 'animalOptionsFilter'
})
export class AnimalOptionsFilterPipe implements PipeTransform {

  transform(animais: Animal[], paraInseminar: boolean, prenha: boolean, observacaoParto: boolean): Animal[] {

    if (!paraInseminar && !prenha && !observacaoParto) {
      return animais;
    }

    return (
      animais && animais.filter(
        (animal) => (
             (animal.estaParaInseminar && paraInseminar)
          || (animal.estaInseminada && prenha)
          || (animal.isObservacaoParto && observacaoParto))
      ));
  }

}
