import { NgZone, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Deal } from '../../../shared/deal';
import { Subscription } from 'rxjs/Subscription';

export class ChartWriter implements OnInit, OnDestroy {
  constructor(private zone: NgZone) {
  }
  protected averagePriceLabel = 'Average Price';
  protected productPriceLabel = 'Product deal price';
  protected stockLength = 20;
  protected dealsStream: Observable<Deal> | Observable<Array<Deal>>;
  protected dealSubscription: Subscription;
  protected averagePrice = 0;

  protected pricesProduct: Array<number> = [];
  protected averagePrices: Array<number> = [];
  protected pricesGraphicsProduct: Array<number> = [];
  // lineChart
  protected lineChartLegend = true;
  protected lineChartType = 'line';
  protected lineChartData: Array<any> = [
    {data: this.averagePrices, label: this.averagePriceLabel},
    {data: this.pricesGraphicsProduct, label: this.productPriceLabel}
  ];
  protected lineChartLabels: Array<any> = [];
  protected lineChartOptions: any = {
    responsive: true
  };
  protected lineChartColors: Array<any> = [
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

  }

  initChartOneByOne(dealsStream: Observable<Deal>) {
    if (!!this.dealsStream) {
      return;
    } else {
      this.dealsStream = dealsStream;
    }
    for (let i = this.stockLength; i > 0; i--) {
      this.lineChartLabels.push(i);
    }

    this.dealSubscription = this.dealsStream
      .subscribe(deal => {
        this.zone.run(() => {
          this.pricesProduct.push(Math.floor(deal.price));
          this.averagePrice = Math.floor(
            this.pricesProduct.reduce((a, b) => a + b) / this.pricesProduct.length);
          this.averagePrices.push(this.averagePrice);
          if (this.pricesProduct.length > this.stockLength) {
            this.pricesProduct.shift();
            this.averagePrices.shift();
          }
          this.pricesGraphicsProduct = this.pricesProduct;
          this.updateChartData();
        });
      }
    );
  }

  initChartByArray(dealsStream: Observable<Array<Deal>>) {
    if (!!this.dealsStream) {
      return;
    } else {
      this.dealsStream = dealsStream;
    }
    for (let i = 0; i < this.stockLength; i++) {
      this.lineChartLabels.push(i);
    }

    this.dealSubscription = this.dealsStream
      .map(array => array.map(deal => Math.floor(deal.price)))
      .subscribe(
      dealPrices => {
        this.zone.run(() => {
          this.pricesGraphicsProduct = dealPrices;
          this.averagePrices = [];
          let counter = 0;
          dealPrices.forEach((price, index) => {
            counter += price;
            const average = counter / (index + 1);
            this.averagePrices.push(average);
          });
          this.updateChartData();
        });
      }
    );
  }

  updateChartData() {
    this.lineChartData = [
      {data: this.averagePrices, label: this.averagePriceLabel},
      {data: this.pricesGraphicsProduct, label: this.productPriceLabel}
    ];
  }

  ngOnDestroy(): void {
    if (this.dealSubscription) {
      this.dealSubscription.unsubscribe();
    }
  }

}
