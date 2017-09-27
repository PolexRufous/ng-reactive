import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import * as faker from 'faker';
import { Person } from './person';
import { ReplaySubject } from 'rxjs/Rx';

@Component({
  selector: 'app-concatevents',
  templateUrl: './concatevents.component.html',
  styleUrls: ['./concatevents.component.scss']
})
export class ConcateventsComponent implements OnInit, OnDestroy {
  private maleSubscription: Subscription;
  private femaleSubscription: Subscription;
  private unisexSubscription: Subscription;
  private replySubscription: Subscription;
  private unisexStream: Observable<Person>;

  males: Array<Person> = [];
  females: Array<Person> = [];
  all: Array<Person> = [];

  constructor() {
  }

  ngOnInit() {
    const maleStream = Observable.fromEvent(document.getElementById('malesButton'), 'click');
    const femaleStream = Observable.fromEvent(document.getElementById('femalesButton'), 'click');
    const replyStream = new ReplaySubject(3);
    this.replySubscription = maleStream.merge(femaleStream)
      .map((event) => event['target'].textContent)
      .map((gender) => {
        const person: Person = new Person();
        person.name = faker.name.findName();
        person.gender = gender;
        return person;
      }).subscribe((person) => replyStream.next(person));
    this.unisexStream = replyStream.asObservable();
    this.subscribeAll();
  }

  subscribeAll() {
    this.maleSubscription = this.unisexStream
      .filter((person) => person['gender'] === 'Male')
      .subscribe((maleName) => this.males.push(maleName));
    this.femaleSubscription = this.unisexStream
      .filter((person) => person['gender'] === 'Female')
      .subscribe((femaleName) => this.females.push(femaleName));
    this.unisexSubscription = this.unisexStream
      .subscribe((name) => this.all.push(name));
  }

  ngOnDestroy(): void {
    this.maleSubscription.unsubscribe();
    this.femaleSubscription.unsubscribe();
    this.unisexSubscription.unsubscribe();
    this.replySubscription.unsubscribe();
  }
}
