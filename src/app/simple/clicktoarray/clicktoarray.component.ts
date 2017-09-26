import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import * as faker from 'faker';

@Component({
  selector: 'app-clicktoarray',
  templateUrl: './clicktoarray.component.html',
  styleUrls: ['./clicktoarray.component.scss']
})
export class ClicktoarrayComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  names: Array<string> = [];

  constructor() {
  }

  ngOnInit() {
    this.subscription =
      Observable.fromEvent(document.getElementById('forClick'), 'click')
        .map((event) => faker.name.findName())
        .subscribe((name) => this.names.push(name));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
