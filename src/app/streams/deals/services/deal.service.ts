import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { EventSource } from '../../../complex/terminatedserver/eventsource';
import { Deal } from '../../../shared/deal';
import { config } from '../../../../config/app.config';


@Injectable()
export class DealService {

  static dealStream(): Observable<Deal> {
    return Observable.create(observer => {
      const eventSourceFunc = window['EventSource'];
      const eventSource = new eventSourceFunc(config.host_base + '/deals');
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
