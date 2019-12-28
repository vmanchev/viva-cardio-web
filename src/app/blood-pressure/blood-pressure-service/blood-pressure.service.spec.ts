import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";


import { BloodPressureService } from './blood-pressure.service';
import { BloodPressureReading } from '../blood-pressure-reading.model';
import { environment } from 'src/environments/environment';

let data: BloodPressureReading = {
  id:  "14",
  patient_id: 22,
  sys: 160,
  dia: 89,
  pulse: 74,
  created_at: '2019-12-28T14:32:18'

}

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

  describe("create", () => {
    it("should perform a POST request to save the data", inject(
      [HttpTestingController, BloodPressureService],
      (httpMock: HttpTestingController, service: BloodPressureService) => {
        // ACT
        service.create(data).subscribe();

        // ASSERT
        const mockReq = httpMock.expectOne(environment.apiUrl + "/blood-pressure");
        expect(mockReq.request.body).toEqual(data)
        httpMock.verify();
      }
    ));
  });

  describe("delete", () => {
    it("should perform a DELETE request to delete the data", inject(
      [HttpTestingController, BloodPressureService],
      (httpMock: HttpTestingController, service: BloodPressureService) => {
        // ACT
        service.delete("17").subscribe();

        // ASSERT
        const mockReq = httpMock.expectOne(environment.apiUrl + "/blood-pressure/17");
        httpMock.verify();
      }
    ));
  });

});
