import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnimaisComponent } from './animal/animais.component';
import { AnimalDetailComponent } from './animal/animal-detail.component';
import { AnimalAddComponent} from './animal/animal-add.component';
import { PesagensChartComponent } from './chart/pesagens-chart.component';
import { PesagemLoteComponent } from './peso/pesagem-lote.component';
import { InseminacaoLoteComponent } from './inseminacao/inseminacao-lote.component';

const routes: Routes = [
  { path: '', redirectTo: '/animais', pathMatch: 'full' },
  { path: 'animais/:id', component: AnimalDetailComponent },
  { path: 'animais', component: AnimaisComponent },
  { path: 'novoAnimal', component: AnimalAddComponent },
  { path: 'pesagemLote', component: PesagemLoteComponent },
  { path: 'inseminacaoLote', component: InseminacaoLoteComponent },
  { path: 'chart/:id', component: PesagensChartComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
