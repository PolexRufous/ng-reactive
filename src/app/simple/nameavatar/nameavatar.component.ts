import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import * as faker from 'faker';

@Component({
  selector: 'app-nameavatar',
  templateUrl: './nameavatar.component.html',
  styleUrls: ['./nameavatar.component.scss']
})
export class NameavatarComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  name: string = null;
  avatarUrl: string = null;

  constructor() {
  }

  ngOnInit() {
    this.subscription =
      Observable.fromEvent(document.getElementById('forClick'), 'click')
        .map((event) => faker.name.findName())
        .subscribe((name) => {
            this.name = name;
            this.avatarUrl = faker.image.avatar();
          }
        );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
