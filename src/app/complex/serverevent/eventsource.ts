
export class EventSource {
  public onmessage: Function;
  public onerror: Function;
  public close: () => void;
}
