import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { UserService } from "./user.service";
import { User } from "./user.model";
import { environment } from "src/environments/environment";

const userMock = {
  email: "test@example.org",
  password: "qwerty"
} as User;

describe("UserService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    })
  );

  it("should be created", inject(
    [HttpTestingController, UserService],
    (httpMock: HttpTestingController, service: UserService) => {
      expect(service).toBeTruthy();
    }
  ));

  describe("registration", () => {
    it("should perform a POST request to the registration endpoint", inject(
      [HttpTestingController, UserService],
      (httpMock: HttpTestingController, service: UserService) => {
        // ACT
        service.registration(userMock).subscribe();

        // ASSERT
        const mockReq = httpMock.expectOne(environment.apiUrl + "/user");
        expect(mockReq.request.body).toEqual(userMock)
        httpMock.verify();
      }
    ));
  });

  describe("login", () => {
    it("should perform a POST request to the login endpoint", inject(
      [HttpTestingController, UserService],
      (httpMock: HttpTestingController, service: UserService) => {
        // ACT
        service.login(userMock).subscribe();

        // ASSERT
        const mockReq = httpMock.expectOne(environment.apiUrl + "/user/login");
        expect(mockReq.request.body).toEqual(userMock)
        httpMock.verify();
      }
    ));
  });
});
