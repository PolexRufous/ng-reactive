import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { EventSourcePolyfill } from 'ng-event-source';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Http } from '@angular/http';
import { Hero } from '../../shared/Hero';

@Component({
  selector: 'app-serverevent',
  templateUrl: './serverevent.component.html',
  styleUrls: ['./serverevent.component.scss']
})
export class ServereventComponent implements OnInit, OnDestroy {
  private unisexSubscription: Subscription;
  private unisexStream: Observable<Hero>;
  private eventSource: EventSourcePolyfill;

  private all: Array<Hero> = [];

  constructor(private http: Http,
              private zone: NgZone) {
  }

  ngOnInit() {
    this.eventSource = new EventSourcePolyfill('http://localhost:8091/persons');
    const replyStream = new ReplaySubject(3);

    this.eventSource.onmessage = hero => {
      replyStream.next(JSON.parse(hero.data));
    };
    this.eventSource.onopen = () => console.log('Open source');
    this.eventSource.onerror = error => {
      replyStream.complete();
      error.target.close();
    };
    this.unisexStream = replyStream.asObservable();
    this.subscribeAll();
  }

  subscribeAll() {
    this.unisexSubscription = this.unisexStream
      .subscribe(
        hero => this.zone.run(() => this.proceedHeroUpdate(hero)),
        error => console.error('Error'),
        () => console.log('Complete')
      );
  }

  ngOnDestroy(): void {
    this.unisexSubscription.unsubscribe();
    if (this.eventSource && this.eventSource.readyState !== EventSourcePolyfill.prototype.CLOSED) {
      this.eventSource.close();
    }
  }

  proceedHeroUpdate(hero: Hero) {
    this.all.push(hero);
    this.http.get('http://localhost:8091/hero/' + hero.id)
      .map(response => response.json() as Hero)
      .subscribe(
        detailedHero => {
          hero.name = detailedHero.name;
          hero.power = detailedHero.power;
          hero.descriptor = detailedHero.descriptor;
        },
        error => {
          console.error(error);
          hero.name = 'Undefined';
        },
        () => console.log('Person update finish')
      );
  }

}
