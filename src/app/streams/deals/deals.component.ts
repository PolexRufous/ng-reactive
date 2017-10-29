import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Deal} from './services/deal';
import {SseSubject} from './services/SseSubject';
import {Subscription} from 'rxjs/Subscription';
const maxValue = 1900000;
const stockLength = 20;

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit, OnDestroy {
  constructor(private zone: NgZone) {
  }

  dealsStream: Observable<Deal>;
  dealSubscription: Subscription;
  averagePrice = 0;
  progressValue = 0;

  pricesCoal: Array<number> = [];
  averagePrices: Array<number> = [];
  pricesGraphicsCoal: Array<number> = [];
  // lineChart
  public lineChartData: Array<any> = [
    {data: this.pricesGraphicsCoal, label: 'Prices Coal'},
    {data: this.averagePrices, label: 'Average Price'}
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: '#e4003a',
      pointBackgroundColor: '#e4003a',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#e4003a'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: '#009fe3',
      pointBackgroundColor: '#009fe3',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#009fe3'
    }
  ];
  ngOnInit() {
    for (let i = stockLength; i > 0; i--) {
      this.lineChartLabels.push(i);
    }
    this.dealsStream = new SseSubject<Deal>(100).createInst(
      'http://localhost:8091/deals'
    ).asObservable().filter(
      deal => {
        console.log(deal);
        return deal.productType === 'COAL';
      });
    this.dealSubscription = this.dealsStream.subscribe(
      deal => {
        this.zone.run(() => {
          this.pricesCoal.push(Math.floor(deal.price));
          this.averagePrice = Math.floor(
            this.pricesCoal.reduce((a, b) => a + b) / this.pricesCoal.length);
          this.averagePrices.push(this.averagePrice);
          if (this.pricesCoal.length > stockLength) {
            this.pricesCoal.shift();
            this.averagePrices.shift();
          }
          this.averagePrice = Math.round(this.averagePrice / maxValue * 100);
          this.progressValue = this.averagePrice;
          this.pricesGraphicsCoal = this.pricesCoal;
          this.lineChartData = [
            {data: this.averagePrices, label: 'Average price'},
            {data: this.pricesGraphicsCoal, label: 'Prices coal'}
          ];
        });
      }

  );
  }
  public lineChartLegend = true;

  public lineChartType = 'line';

  ngOnDestroy(): void {
    this.dealSubscription.unsubscribe();
  }

}
