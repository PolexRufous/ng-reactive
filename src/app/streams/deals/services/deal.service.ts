import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { EventSource } from '../../../complex/terminatedserver/eventsource';
import { Deal } from '../../../shared/deal';

@Injectable()
export class DealService {

  static dealStream(): Observable<Deal> {
    return Observable.create(observer => {
      const eventSourceFunc = window['EventSource'];
      const eventSource = new eventSourceFunc('http://localhost:8091/deals');
      eventSource.onmessage = deal => observer.next(JSON.parse(deal.data));
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
