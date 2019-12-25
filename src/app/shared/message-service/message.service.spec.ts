import { TestBed, inject } from "@angular/core/testing";

import { MessageService } from "./message.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";

const MatSnackBarMock = jasmine.createSpyObj("MatSnackBar", ["open"]);
const TranslateServiceMock = jasmine.createSpyObj("TranslateService", [
  "instant"
]);
TranslateServiceMock.instant.and.callFake(a => a);

describe("MessageService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: MatSnackBarMock },
        { provide: TranslateService, useValue: TranslateServiceMock }
      ]
    })
  );

  it("should be created", () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });

  describe("success", () => {
    it("should call open from snackBar service", inject(
      [MessageService],
      (service: MessageService) => {
        // ACT
        service.success("MESSAGE.TEST");

        expect(MatSnackBarMock.open).toHaveBeenCalledWith(
          "MESSAGE.TEST",
          null,
          { panelClass: "snack__success", duration: 2000 }
        );
      }
    ));

    it("should translate the message", inject(
      [MessageService],
      (service: MessageService) => {
        // ACT
        service.success("MESSAGE.TEST");

        expect(TranslateServiceMock.instant).toHaveBeenCalledWith(
          "MESSAGE.TEST"
        );
      }
    ));
  });

  describe("error", () => {
    it("should call open from snackBar service", inject(
      [MessageService],
      (service: MessageService) => {
        // ACT
        service.error("MESSAGE.TEST");

        expect(MatSnackBarMock.open).toHaveBeenCalledWith(
          "MESSAGE.TEST",
          null,
          { panelClass: "snack__error", duration: 2000 }
        );
      }
    ));

    it("should translate the message", inject(
      [MessageService],
      (service: MessageService) => {
        // ACT
        service.error("MESSAGE.TEST");

        expect(TranslateServiceMock.instant).toHaveBeenCalledWith(
          "MESSAGE.TEST"
        );
      }
    ));
  });
});
