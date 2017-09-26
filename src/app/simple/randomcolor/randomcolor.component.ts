import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import * as faker from 'faker';

@Component({
  selector: 'app-randomcolor',
  templateUrl: './randomcolor.component.html',
  styleUrls: ['./randomcolor.component.scss']
})
export class RandomcolorComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  color = 'black';

  constructor() {
  }

  ngOnInit() {
    this.subscription =
      Observable.fromEvent(document.getElementById('forClick'), 'click')
        .map((event) => faker.commerce.color())
        .subscribe((color) => this.color = color
        );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
