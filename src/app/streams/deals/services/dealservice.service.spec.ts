import { TestBed, inject } from '@angular/core/testing';

import { DealserviceService } from './dealservice.service';

describe('DealserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealserviceService]
    });
  });

  it('should be created', inject([DealserviceService], (service: DealserviceService) => {
    expect(service).toBeTruthy();
  }));
});
