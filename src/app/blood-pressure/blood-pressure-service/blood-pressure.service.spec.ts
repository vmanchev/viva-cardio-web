import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";


import { BloodPressureService } from './blood-pressure.service';


describe('BloodPressureService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [BloodPressureService]
  }));

  it("should be created", inject(
    [HttpTestingController, BloodPressureService],
    (httpMock: HttpTestingController, service: BloodPressureService) => {
      expect(service).toBeTruthy();
    }
  ));
});
