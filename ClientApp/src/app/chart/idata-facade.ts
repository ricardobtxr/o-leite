import { Subject } from 'rxjs';
import { AnimalChartData } from './chart-data.model';

export interface IDataFacade {
  getData(id: any): void;
  chartDataSubject: Subject<AnimalChartData>;
}
