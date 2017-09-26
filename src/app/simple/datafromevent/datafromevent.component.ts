import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-datafromevent',
  templateUrl: './datafromevent.component.html',
  styleUrls: ['./datafromevent.component.scss']
})
export class DatafromeventComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  x: number = null;
  y: number = null;

  constructor() {
  }

  ngOnInit() {
    this.subscription =
      Observable.fromEvent(document.getElementById('eventDiv'), 'click')
        .subscribe((event) => {
            this.x = event['clientX'];
            this.y = event['clientY'];
          }
        );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
