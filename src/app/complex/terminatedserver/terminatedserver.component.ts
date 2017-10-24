import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { EventSource } from './eventsource';
import { Person } from '../concatevents/person';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';


@Component({
  selector: 'app-terminatedserver',
  templateUrl: './terminatedserver.component.html',
  styleUrls: ['./terminatedserver.component.scss']
})
export class TerminatedserverComponent implements OnInit, OnDestroy {
  private unisexSubscription: Subscription;
  private unisexStream: Observable<Person>;
  private eventSource: EventSource;

  private all: Array<Person> = [];

  constructor(private zone: NgZone) {
  }

  ngOnInit() {
    const EventSourceFunc = window['EventSource'];
    if (EventSourceFunc) {
      this.eventSource = new EventSourceFunc('http://localhost:8071/persons') as EventSource;
      const replyStream = new ReplaySubject(3);

      this.eventSource.onmessage = person => {
        const personParsed: Person = JSON.parse(person.data);
        if (personParsed && personParsed.id) {
          this.zone.run(() => replyStream.next(personParsed));
        } else {
          this.zone.run(() => replyStream.complete());
          this.eventSource.close();
        }
      };
      this.eventSource.onopen = () => console.log('Open source');
       this.unisexStream = replyStream.asObservable();
      this.subscribeAll();
    } else {
      alert('Not supported browser!');
    }
  }

  subscribeAll() {
    this.unisexSubscription = this.unisexStream
      .subscribe(
        person => this.all.push(person),
        error => console.error('Error'),
        () => console.log('Complete')
      );
  }

  ngOnDestroy(): void {
    this.unisexSubscription.unsubscribe();
    if (this.eventSource && this.eventSource.readyState !== 1) {
      this.eventSource.close();
    }
  }
}
