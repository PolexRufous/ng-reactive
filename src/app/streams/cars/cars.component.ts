import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Violation} from '../../shared/violation';
import {Subscription} from 'rxjs/Subscription';
import {CarsService} from './services/cars.service';
import {Http} from '@angular/http';
import {Car} from '../../shared/car';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit, OnDestroy {

  protected violations: Array<Violation> = [];
  private violationSubscription: Subscription;

  constructor(private http: Http,
              private zone: NgZone) { }

  ngOnInit(): void {
    this.violationSubscription = CarsService.violationsStream()
      .subscribe(
        violation => this.zone.run(() => this.proceedViolation(violation))
      );
  }

  proceedViolation(violation: Violation) {
    this.violations.unshift(violation);
    this.http.get('http://localhost:8091/car/' + violation.carNumber)
      .map(response => response.json() as Car)
      .subscribe(
        car => violation.car = car,
        error => console.error(error),
        () => console.log('Car received')
      );
  }

  ngOnDestroy(): void {
    this.violationSubscription.unsubscribe();
  }

}
