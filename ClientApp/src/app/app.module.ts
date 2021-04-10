import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchInputComponent } from './search-input/search-input.component';
import { AnimaisComponent } from './animal/animais.component';
import { AnimalDetailComponent } from './animal/animal-detail.component';
import { AnimalAddComponent } from './animal/animal-add.component';
import { AnimalFilterPipe } from './animal/animal-filter.pipe';
import { AnimalOptionsFilterPipe } from './animal/animal-options-filter.pipe';
import { AnimalSearchComponent } from './animal/animal-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InseminacoesComponent } from './inseminacao/inseminacoes.component';
import { InseminacaoAddComponent } from './inseminacao/inseminacao-add.component';
import { InseminacaoDetailComponent } from './inseminacao/inseminacao-detail.component';
import { PesagemAddComponent } from './peso/pesagem-add.component';
import { PesagemDetailComponent } from './peso/pesagem-detail.component';
import { PesagensComponent } from './peso/pesagens.component';
import { VacinaAddComponent } from './vacina/vacina-add.component';
import { VacinaDetailComponent } from './vacina/vacina-detail.component';
import { VacinasComponent } from './vacina/vacinas.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PartoAddComponent } from './parto/parto-add.component';
import { PartoDetailComponent } from './parto/parto-detail.component';
import { PartosComponent } from './parto/partos.component';
import { OcorrenciaAddComponent } from './ocorrencia/ocorrencia-add.component';
import { OcorrenciaDetailComponent } from './ocorrencia/ocorrencia-detail.component';
import { OcorrenciasComponent } from './ocorrencia/ocorrencias.component';
import { CcsAddComponent } from './ccs/ccs-add.component';
import { CcsDetailComponent } from './ccs/ccs-detail.component';
import { CcsListaComponent } from './ccs/ccs-lista.component';
import { ChartsModule } from 'ng2-charts';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider  } from 'angularx-social-login';
import { PesagensChartComponent } from './chart/pesagens-chart.component';
import { environment } from '../environments/environment';
import { SignInComponent } from './signin/signin.component'
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from "./auth.service";

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    NavbarComponent,
    SearchInputComponent,
    AnimaisComponent,
    AnimalDetailComponent,
    AnimalAddComponent,
    AnimalFilterPipe,
    AnimalOptionsFilterPipe,
    AnimalSearchComponent,
    InseminacoesComponent,
    InseminacaoAddComponent,
    InseminacaoDetailComponent,
    PesagemAddComponent,
    PesagemDetailComponent,
    PesagensComponent,
    VacinaAddComponent,
    VacinaDetailComponent,
    VacinasComponent,
    PartoAddComponent,
    PartoDetailComponent,
    PartosComponent,
    OcorrenciaAddComponent,
    OcorrenciaDetailComponent,
    OcorrenciasComponent,
    CcsAddComponent,
    CcsDetailComponent,
    CcsListaComponent,
    PesagensChartComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, NgbCollapseModule, HttpClientModule, NgbModule, NgSelectModule, SocialLoginModule, ChartsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
