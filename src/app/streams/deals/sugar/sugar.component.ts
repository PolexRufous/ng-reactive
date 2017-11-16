import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ChartWriter } from '../services/chart.writer';
import { Observable } from 'rxjs/Rx';
import { Deal } from '../../../shared/deal';

@Component({
  selector: 'app-sugar',
  templateUrl: './sugar.component.html',
  styleUrls: ['./sugar.component.scss']
})
export class SugarComponent extends ChartWriter implements OnInit {
  @Input()
  deals: Observable<Deal>;

  constructor(zone: NgZone) {
    super(zone);
    this.initVariables();
  }

  ngOnInit() {
    const clickStream: Observable<any> = Observable.fromEvent(document.getElementById('sugar-click'), 'click');

    const dealsStream: Observable<Array<Deal>> = this.deals
      .filter(deal => deal.productType === 'SUGAR')
      .bufferCount(this.stockLength, this.stockLength);

    const resultStream: Observable<Array<Deal>> = Observable.zip(dealsStream, clickStream)
      .map(array => array[0]);

    super.initChartByArray(resultStream);
  }


  initVariables() {
    this.chartTitle = 'Sugar';
    this.stockLength = 20;
    this.averagePriceLabel = 'Average sugar price';
    this.productPriceLabel = 'Sugar product price';
  }
}
