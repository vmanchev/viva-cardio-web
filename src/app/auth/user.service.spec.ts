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

const expiredTokenMock = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxMjcuMC4wLjEiLCJzdWIiOiIyOSIsImV4cCI6MTU3NzUxODIyNSwiaWF0IjoiRnJpLCAyNyBEZWMgMjAxOSAyMzozMDoyNSArMDIwMCJ9.hZSY5YNHmoCcVy0GLq74m590GP68S9mowQRnmZ6t2hg";
const nonExpiredTokenMock = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1Nzc1MjAzMTYsImV4cCI6NDc2NDcyOTkxNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.IDz8CCOzhkav-_t40znaxvqtnvvtE6V9KuFuPu4TSwA";

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

  describe("forgot", () => {
    it("should perform a POST request to the forgot endpoint", inject(
      [HttpTestingController, UserService],
      (httpMock: HttpTestingController, service: UserService) => {
        // ACT
        service.forgot(userMock).subscribe();

        // ASSERT
        const mockReq = httpMock.expectOne(environment.apiUrl + "/user/forgot");
        expect(mockReq.request.body).toEqual(userMock)
        httpMock.verify();
      }
    ));
  });

  describe('isValidToken', () => {
    it('should return true when token has not expired yet', inject([UserService], (service: UserService) => {
      expect(service.isValidToken(nonExpiredTokenMock)).toBeTrue();
    }));

    it('should return false when token has expired yet', inject([UserService], (service: UserService) => {
      expect(service.isValidToken(expiredTokenMock)).toBeFalse();
    }));
  });

});
