import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { EventSourcePolyfill } from 'ng-event-source';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Http } from '@angular/http';
import { Hero } from '../../shared/hero';
import { DealService } from '../../streams/deals/services/deal.service';
import { config } from '../../../config/app.config';


@Component({
  selector: 'app-serverevent',
  templateUrl: './serverevent.component.html',
  styleUrls: ['./serverevent.component.scss'],
  providers: [ DealService ]
})
export class ServereventComponent implements OnInit, OnDestroy {
  private heroesSubscription: Subscription;
  private heroesStream: Observable<Hero>;
  private eventSource: EventSourcePolyfill;

  private heroes: Array<Hero> = [];

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.eventSource = new EventSourcePolyfill(config.host_base + '/persons');
    const replyStream = new ReplaySubject(3);

    this.eventSource.onmessage = hero => {
      replyStream.next(JSON.parse(hero.data));
    };
    this.eventSource.onopen = () => console.log('Open source');
    this.eventSource.onerror = error => {
      replyStream.complete();
      error.target.close();
    };
    this.heroesStream = replyStream.asObservable();
    this.subscribeOnHeroes();
  }

  subscribeOnHeroes() {
    this.heroesSubscription = this.heroesStream
      .subscribe(
        hero => this.proceedHeroUpdate(hero),
        error => console.error('Error'),
        () => console.log('Complete')
      );
  }

  ngOnDestroy(): void {
    this.heroesSubscription.unsubscribe();
    if (this.eventSource && this.eventSource.readyState !== EventSourcePolyfill.prototype.CLOSED) {
      this.eventSource.close();
    }
  }

  proceedHeroUpdate(hero: Hero) {
    this.heroes.push(hero);
    this.http.get(config.host_base + '/hero/' + hero.id)
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
        () => console.log('Hero update finish')
      );
  }

}
