import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

const externalNames: Array<string> = [
  'Ivan Ivanov',
  'Petr Semenovich',
  'Semen Ivanov',
  'Maria Pavlovna'
];

@Component({
  selector: 'app-fromarray',
  templateUrl: './fromarray.component.html',
  styleUrls: ['./fromarray.component.scss']
})
export class FromarrayComponent implements OnInit {

  names: Array<string> = [];
  private counter = 1;
  constructor() { }

  ngOnInit() {
    Observable.from(externalNames)
      .delayWhen(name => Observable.timer(this.counter++ * 1000))
      .subscribe(
        (name) => this.names.push(name),
        (error) => console.error(error),
        () => this.names.push('---------')
      );
  }

}
