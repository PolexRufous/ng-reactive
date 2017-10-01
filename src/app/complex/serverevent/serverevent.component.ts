import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { Person } from '../concatevents/person';
import { EventSourcePolyfill } from 'ng-event-source';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
  selector: 'app-serverevent',
  templateUrl: './serverevent.component.html',
  styleUrls: ['./serverevent.component.scss']
})
export class ServereventComponent implements OnInit, OnDestroy {
  private unisexSubscription: Subscription;
  private unisexStream: Observable<Person>;
  private eventSource: EventSourcePolyfill;

  all: Array<Person> = [];

  constructor(private zone: NgZone) {
  }

  ngOnInit() {
    this.eventSource = new EventSourcePolyfill('http://localhost:8081/persons');
    const replyStream = new ReplaySubject(3);

    this.eventSource.onmessage = person => {
      replyStream.next(JSON.parse(person.data));
    };
    this.eventSource.onopen = () => console.log('Source open');
    this.unisexStream = replyStream.asObservable();
    this.subscribeAll();
  }

  subscribeAll() {
    this.unisexSubscription = this.unisexStream
      .map(data => {
        const person: Person = new Person();
        person.id = data['id'];
        person.name = data.name;
        return person;
      })
      .subscribe(person => {this.all.push(person); console.log(person); },
        error => console.error('Error'),
        () => console.log('Complete')
        );
  }

  ngOnDestroy(): void {
    this.unisexSubscription.unsubscribe();
  }
}
