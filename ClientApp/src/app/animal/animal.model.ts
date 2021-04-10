import { Inseminacao } from '../inseminacao/inseminacao.model';
import { Pesagem } from '../peso/pesagem.model';
import { Vacina } from '../vacina/vacina.model';
import { Parto } from '../parto/parto.model';
import { Ocorrencia } from '../ocorrencia/ocorrencia.model';
import { Ccs } from '../ccs/ccs.model';

export interface Animal {
  id: string;
  numero: number;
  nome: string;
  nascimento: Date;
  ultimoParto: Parto;
  inseminacoes: Inseminacao[];
  pesagens: Pesagem[];
  pesagensLeite: Pesagem[];
  vacinas: Vacina[];
  partos: Parto[];
  ocorrencias: Ocorrencia[];
  ccsLista: Ccs[];
  diasVida: number;
  estaParaInseminar: boolean;
  estaInseminada: boolean;
  temIdadeParaInseminar: boolean;
  isUltimoPartoAntigo: boolean;
  isObservacaoParto: boolean;
  ultimaInseminacao: Inseminacao;
}

export interface Resposta {
  animal: Animal;
  messages: string[];
}
