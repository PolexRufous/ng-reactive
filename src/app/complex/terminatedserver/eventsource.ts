type Callback = (data: any) => void;

export declare class EventSource {
  readyState: number;
  onmessage: Callback;
  onopen: Callback;
  onerror: Callback;
  close: () => void;
  addEventListener(event: string, cb: Callback): void;
  constructor(name: string);
}
