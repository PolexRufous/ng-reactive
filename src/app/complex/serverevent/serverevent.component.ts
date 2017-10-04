import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { Person } from '../concatevents/person';
import { EventSourcePolyfill } from 'ng-event-source';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Http } from '@angular/http';

@Component({
  selector: 'app-serverevent',
  templateUrl: './serverevent.component.html',
  styleUrls: ['./serverevent.component.scss']
})
export class ServereventComponent implements OnInit, OnDestroy {
  private unisexSubscription: Subscription;
  private unisexStream: Observable<Person>;
  private eventSource: EventSourcePolyfill;

  private all: Array<Person> = [];

  constructor(private http: Http,
              private zone: NgZone) {
  }

  ngOnInit() {
    this.eventSource = new EventSourcePolyfill('http://localhost:8091/persons');
    const replyStream = new ReplaySubject(3);

    this.eventSource.onmessage = person => {
      replyStream.next(JSON.parse(person.data));
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
        person => this.zone.run(() => this.proceedPersonUpdate(person)),
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

  proceedPersonUpdate(person: Person) {
    this.all.push(person);
    this.http.get('http://localhost:8091/persons/' + person.id)
      .map(response => response.json() as Person)
      .subscribe(
        detailedPerson => {
          person.name = detailedPerson.name;
          person.gender = detailedPerson.gender;
        },
        error => {
          console.error(error);
          person.name = 'Undefined';
        },
        () => console.log('Person update finish')
      );
  }

}
