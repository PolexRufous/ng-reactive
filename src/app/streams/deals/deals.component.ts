import { Component, OnDestroy, OnInit } from '@angular/core';
import { DealService } from './services/deal.service';
import { Deal } from '../../shared/deal';
import { Observable } from 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit, OnDestroy {

  dealStream: Observable<Deal>;
  private dealSubscription: Subscription;

  constructor() {
  }

  ngOnInit(): void {
    const subject: ReplaySubject<Deal> = new ReplaySubject(20);
    this.dealSubscription = DealService.dealStream()
      .subscribe(
        deal => subject.next(deal)
      );
    this.dealStream = subject.asObservable();
  }

  ngOnDestroy(): void {
    this.dealSubscription.unsubscribe();
  }

}
