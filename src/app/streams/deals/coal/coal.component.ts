import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ChartWriter } from '../services/chart.writer';
import { DealService } from '../services/deal.service';
import { Deal } from '../../../shared/Deal';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-coal',
  templateUrl: './coal.component.html',
  styleUrls: ['./coal.component.scss']
})
export class CoalComponent extends ChartWriter implements OnInit {
  @Input()
  deals: Observable<Deal>;

  constructor(zone: NgZone) {
    super(zone);
    this.initVariables();
  }

  ngOnInit() {
    this.dealsStream = this.deals
      .filter(deal => deal.productType === 'COAL');

    super.initChart();
  }

  initVariables() {
    this.averagePriceLabel = 'Average coal price';
    this.productPriceLabel = 'Coal deal price';
  }
}
