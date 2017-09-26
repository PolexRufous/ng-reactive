import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-clickevent',
  templateUrl: './clickevent.component.html',
  styleUrls: ['./clickevent.component.scss']
})
export class ClickeventComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private clickTimes: number;

  constructor() {
  }

  ngOnInit() {
    this.clickTimes = 0;
    this.subscription =
      Observable.fromEvent(document.getElementById('forClick'), 'click')
        .subscribe((event) => this.clickTimes++);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
