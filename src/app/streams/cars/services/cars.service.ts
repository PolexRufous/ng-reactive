import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Violation} from '../../../shared/violation';

@Injectable()
export class CarsService {

  constructor() { }


  static violationsStream(): Observable<Violation> {
    return Observable.create(observer => {
      const eventSourceFunc = window['EventSource'];
      const eventSource = new eventSourceFunc('http://localhost:8091/violations');
      eventSource.onmessage = violation => observer.next(JSON.parse(violation.data));
      eventSource.onerror = error => {
        observer.complete();
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
