import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animal } from '../animal/animal.model';
import { Location } from '@angular/common';
import { PesagemDataFacade } from '../peso/pesagem-data-facade'
import { IDataFacade } from './idata-facade';
import { PesagemLeiteDataFacade } from '../peso/pesagem-leite-data-facade';
import { CcsDataFacade } from '../ccs/ccs-data-facade';

@Component({
  selector: 'app-pesagens-chart',
  templateUrl: './pesagens-chart.component.html',
})
export class PesagensChartComponent implements OnInit {

  public animal: Animal;
  titulo: String;
  dataLabel: String;
  chartName: String;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pesagemDataFacade: PesagemDataFacade,
    private pesagemLeiteDataFacade: PesagemLeiteDataFacade,
    private ccsDataFacade: CcsDataFacade
  ) { }

  public chartLabels: any[] = [];
  public chartData = [
    {data: [], label: ''},
  ];
  public chartOptions: {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
          type: 'time',
          time: {
            format: 'X',
            displayFormats: {round: 'day'},
          }
      }]
    },
    legend: {
      display: false,
    }
  }
  public chartType = 'line';

  getAnimalChartData(): void {
    var id = this.getParams();
    this.getDataFacade().getData(id);
    this.getDataFacade().chartDataSubject.subscribe((data) => {
      this.chartData[0].data = data.dados;
      this.chartData[0].label = data.labelData;
      this.chartLabels = data.labels;
    });
  }

  private getDataFacade(): IDataFacade {
    switch(this.chartName) {
      case 'PesagensAnimal':
        return this.pesagemDataFacade;
      case 'PesagensLeite':
        return this.pesagemLeiteDataFacade;
      case 'CCS':
        return this.ccsDataFacade;
    }
  }

  private getParams() {
    var id = this.route.snapshot.paramMap.get('id');
    this.chartName = this.route.snapshot.queryParamMap.get('chartName');
    return id;
  }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.getAnimalChartData();
  }

}
