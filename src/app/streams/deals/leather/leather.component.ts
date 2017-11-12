import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ChartWriter } from '../services/chart.writer';
import { DealService } from '../services/deal.service';
import { Observable } from 'rxjs/Observable';
import { Deal } from '../../../shared/Deal';

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
    this.dealsStream = this.deals
      .filter(deal => deal.productType === 'LEATHER')
      .bufferCount(20, 20)
      .mergeMap(deal => deal);

    super.initChart();
  }

  initVariables() {
    this.averagePriceLabel = 'Average leather price';
    this.productPriceLabel = 'Leather deal price';
  }
}
