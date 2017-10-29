import { ReplaySubject } from 'rxjs/ReplaySubject';
import { EventSource } from '../../../complex/terminatedserver/eventsource';

export class SseSubject<T> extends ReplaySubject<T> {
  private eventSource: EventSource;
  constructor(capacity: number) {
    super(capacity);
  }
  createInst(url: string, params: Object): SseSubject {
    const eventSourceFunc = window['EventSource'];
    this.eventSource = new eventSourceFunc(url, params);
    this.eventSource.onmessage = message => this.next(JSON.parse(message.data));
    this.eventSource.onerror = error => this.error(error);

    return this;
  }
}
