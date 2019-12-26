import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { PatientService } from "./patient.service";
import { Patient } from "./patient.model";
import { environment } from "src/environments/environment";

const patientMock = {
  id: 123,
  name: "John Doe"
} as Patient;

describe("PatientService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientService]
    })
  );

  it("should be created", inject(
    [HttpTestingController, PatientService],
    (httpMock: HttpTestingController, service: PatientService) => {
      expect(service).toBeTruthy();
    }
  ));

  describe("create", () => {
    it("should perform a POST request to the create new patient endpoint", inject(
      [HttpTestingController, PatientService],
      (httpMock: HttpTestingController, service: PatientService) => {
        // ACT
        service.create(patientMock).subscribe();

        // ASSERT
        const mockReq = httpMock.expectOne(environment.apiUrl + "/patient");
        expect(mockReq.request.body).toEqual(patientMock);
        httpMock.verify();
      }
    ));
  });

  describe("update", () => {
    it("should perform a PUT request to the update patient endpoint", inject(
      [HttpTestingController, PatientService],
      (httpMock: HttpTestingController, service: PatientService) => {
        // ACT
        service.update(patientMock).subscribe();

        // ASSERT
        const mockReq = httpMock.expectOne(
          environment.apiUrl + "/patient/" + patientMock.id
        );
        expect(mockReq.request.body).toEqual(patientMock);
        httpMock.verify();
      }
    ));
  });

  describe("delete", () => {
    it("should perform a DELETE request to the delete patient endpoint", inject(
      [HttpTestingController, PatientService],
      (httpMock: HttpTestingController, service: PatientService) => {
        // ACT
        service.delete(patientMock.id).subscribe();

        // ASSERT
        const mockReq = httpMock.expectOne(
          environment.apiUrl + "/patient/" + patientMock.id
        );
        httpMock.verify();
      }
    ));
  });
});
