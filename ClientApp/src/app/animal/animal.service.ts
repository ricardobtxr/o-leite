import { Injectable } from '@angular/core';
import { Animal, Resposta } from './animal.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from '../messages/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Pesagem } from '../peso/pesagem.model';
import { Vacina } from '../vacina/vacina.model';
import { Parto } from '../parto/parto.model';
import { Ocorrencia } from '../ocorrencia/ocorrencia.model';
import { Ccs } from '../ccs/ccs.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private animaisUrl = `${environment.baseUrl}/animais`;
  private ultimoNumeroUrl = `${environment.baseUrl}/ultimoNumeroAnimal`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Authorization': 'Bearer '+this.authService.myToken,
    }),
  };

  // GET /animais
  getAnimais(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.animaisUrl, this.httpOptions).pipe(
      tap((animais) => {}),
      catchError(this.handleError<Animal[]>('getAnimais', []))
    );
  }

  // GET /ultimoNumeroAnimal
  getUltimoNumero(): Observable<number> {
    return this.http.get<number>(this.ultimoNumeroUrl, this.httpOptions).pipe(
      tap(() => {}),
      catchError(this.handleError<number>('getUltimoNumero'))
    );
  }

  // GET /animais/id
  getAnimal(myId: string): Observable<Animal> {
    const url = `${this.animaisUrl}/${myId}`;

    return this.http.get<Animal>(url, this.httpOptions).pipe(
      tap(() => null),
      catchError(this.handleError<Animal>('getAnimais'))
    );
  }

  // GET /animais/campo/id
  getAnimalByNumero(numero: number): Observable<Animal> {
    const campo = `numero`;
    const url = `${this.animaisUrl}/${campo}/${numero}`;

    return this.http.get<Animal>(url, this.httpOptions).pipe(
      tap(() => null),
      catchError(this.handleError<Animal>('getAnimais'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      var operacao = `${operation} falhou:`;
      switch (error.status) {


        case 404:
          this.log(`${operacao} Registro não localizado.`);
          break;
        case 401:
        case 403:
          this.log(`${operacao} Operação não autorizada.`);
          break;
        default:
          this.log(`${operacao} ${error.message}`);

      }

      return of(result as T);
    };
  }

  private log(message: string) {

    this.messageService.add(`AnimalService: ${message}`);
  }

  // PUT /animais/id
  updateAnimal(animal: Animal): Observable<Resposta> {
    const url = `${this.animaisUrl}/${animal.id}`;

    return this.http.put(url, animal, this.httpOptions).pipe(
      tap((resposta: Resposta) => {
        if (resposta.messages.length == 0) this.messageService.clear();
        resposta.messages.forEach(message => {
          this.messageService.add(`AnimalService: ${message}`);
        });
      }),
      catchError(this.handleError<Resposta>('updateAnimal'))
    );
  }

  // POST /animais
  addAnimal(animal: Animal): Observable<Resposta> {
    return this.http.post(this.animaisUrl, animal, this.httpOptions).pipe(
      tap((resposta: Resposta) => {
        if (resposta.messages.length == 0) this.messageService.clear();
        resposta.messages.forEach(message => {
          this.messageService.add(`AnimalService: ${message}`);
        });
      }),
      catchError(this.handleError<Resposta>('addAnimal'))
    );
  }

  // DELETE /animais/id
  deleteAnimal(animal: Animal): Observable<any> {
    const url = `${this.animaisUrl}/${animal.id}`;

    return this.http.delete<any>(url, this.httpOptions).pipe(
      tap(() => null),
      catchError(this.handleError<Animal>('deleteAnimal'))
    );
  }

  // GET /animais/?name=term
  searchAnimais(term: string): Observable<Animal[]> {
    if (!(term && term.trim())) {
      return of([]);
    }

    return this.http.get<Animal[]>(`${this.animaisUrl}/?name=${term}`, this.httpOptions).pipe(
      tap((animais) => {
        if (animais && animais.length) {
        } else {
          this.log('não encontrados animais');
        }
      }),
      catchError(this.handleError<Animal[]>('getAnimais', []))
    );
  };

  genIdInseminacao(animal: Animal): number {
    return animal.inseminacoes.length > 0
      ? Math.max(...animal.inseminacoes.map((inseminacao) => inseminacao.id)) + 1
      : 1;
  };

  genIdPesagem(pesagens: Pesagem[]): number {
    return pesagens.length > 0
      ? Math.max(...pesagens.map((pesagem) => pesagem.id)) + 1
      : 1;
  };

  genIdVacina(vacinas: Vacina[]): number {
    return vacinas.length > 0
      ? Math.max(...vacinas.map((vacina) => vacina.id)) + 1
      : 1;
  };

  genIdParto(partos: Parto[]): number {
    return partos.length > 0
      ? Math.max(...partos.map((parto) => parto.id)) + 1
      : 1;
  };

  genIdOcorrencia(ocorrencias: Ocorrencia[]): number {
    return ocorrencias.length > 0
      ? Math.max(...ocorrencias.map((ocorrencia) => ocorrencia.id)) + 1
      : 1;
  };

  genIdCcs(ccsLista: Ccs[]): number {
    return ccsLista.length > 0
      ? Math.max(...ccsLista.map((ccs) => ccs.id)) + 1
      : 1;
  };

  animalVazio(): Animal {
    return  {id: null, nascimento: null, nome: '', numero: null,
      inseminacoes: [], ultimoParto: null, pesagens: [], pesagensLeite: [], vacinas: [],
      partos: [], ocorrencias: [], ccsLista: [], diasVida: 0,
      estaParaInseminar:false, estaInseminada: false, temIdadeParaInseminar: false,
      isUltimoPartoAntigo: false, ultimaInseminacao: null, isObservacaoParto: null,
      ultimaPesagemLeite: null, numeroMae: null, sexo: 'F',
      observacao: null,
    };
  }

}
