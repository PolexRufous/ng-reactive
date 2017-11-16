import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ChartWriter } from '../services/chart.writer';
import { Observable } from 'rxjs/Observable';
import { Deal } from '../../../shared/deal';

@Component({
  selector: 'app-leather',
  templateUrl: './leather.component.html',
  styleUrls: ['./leather.component.scss']
})
export class LeatherComponent extends ChartWriter implements OnInit {
  @Input()
  deals: Observable<Deal>;

  constructor(zone: NgZone) {
    super(zone);
    this.initVariables();
  }

  ngOnInit() {
    const dealsStream: Observable<Array<Deal>> = this.deals
      .filter(deal => deal.productType === 'LEATHER')
      .bufferCount(this.stockLength, this.stockLength);

    super.initChartByArray(dealsStream);
  }

  initVariables() {
    this.chartTitle = 'Leather';
    this.stockLength = 20;
    this.averagePriceLabel = 'Average leather price';
    this.productPriceLabel = 'Leather deal price';
  }
}
