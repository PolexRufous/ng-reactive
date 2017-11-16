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
    const dealsStream: Observable<Deal> = this.deals
      .filter(deal => deal.productType === 'SUGAR');

    super.initChartOneByOne(dealsStream);
  }


  initVariables() {
    this.chartTitle = 'Sugar';
    this.stockLength = 20;
    this.averagePriceLabel = 'Average sugar price';
    this.productPriceLabel = 'Sugar product price';
  }
}
