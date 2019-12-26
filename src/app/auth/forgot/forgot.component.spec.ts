import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ForgotComponent } from "./forgot.component";
import { MaterialModule } from "src/app/material/material.module";
import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { Observable, of, Subject, throwError } from "rxjs";
import {
  TranslateService,
  TranslatePipe,
  TranslateModule,
  TranslateLoader
} from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { UserService } from "../user.service";
import { MessageService } from "src/app/shared/message-service/message.service";
import { HttpErrorResponse } from "@angular/common/http";

@Pipe({
  name: "translate"
})
export class TranslatePipeMock implements PipeTransform {
  public name = "translate";

  public transform(query: string, ...args: any[]): any {
    return query;
  }
}

@Injectable()
export class TranslateServiceStub {
  public get<T>(key: T): Observable<T> {
    return of(key);
  }
}

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}

const userServiceMock = jasmine.createSpyObj("UserService", ["forgot"]);
userServiceMock.forgot.and.returnValue(of({}));

const messageServiceMock = jasmine.createSpyObj("MessageService", [
  "success",
  "error"
]);

describe("ForgotComponent", () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;
  const destroy = new Subject();
  let routerMock: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        })
      ],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: TranslatePipe, useClass: TranslatePipeMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: MessageService, useValue: messageServiceMock }
      ],
      declarations: [ForgotComponent, TranslatePipeMock]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    routerMock = TestBed.get(Router);
    spyOn(routerMock, "navigate");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create the forgot form", () => {
    expect(component.formService.userForm.controls.email).toBeDefined();
    expect(component.formService.userForm.controls.password).not.toBeDefined();
    expect(
      component.formService.userForm.controls.confirmPassword
    ).not.toBeDefined();
  });

  describe("formHandler", () => {
    describe("when form is invalid", () => {
      it("should not try to reset the user password", () => {
        // ARRANGE
        component.formService.userForm.setValue({
          email: ""
        });
        fixture.detectChanges();

        // ACT
        component.formHandler();

        // ASSERT
        expect(component.formService.userForm.invalid).toBeTrue();
        expect(userServiceMock.forgot).not.toHaveBeenCalled();
      });
    });

    describe("when form is valid", () => {
      it("should try to reset the user password", () => {
        // ARRANGE
        component.formService.userForm.setValue({
          email: "test@example.org"
        });

        // ACT
        component.formHandler();

        // ASSERT
        expect(userServiceMock.forgot).toHaveBeenCalledWith({
          email: "test@example.org"
        });
      });

      describe("when user is unknown", () => {
        it("should show an error message", () => {
          // ARRANGE
          userServiceMock.forgot.and.returnValue(
            throwError(new HttpErrorResponse({ status: 404 }))
          );
          component.formService.userForm.setValue({
            email: "test@example.org"
          });

          // ACT
          component.formHandler();

          // ASSERT
          expect(component.formService.userForm.valid).toBeTrue();
          expect(userServiceMock.forgot).toHaveBeenCalledWith({
            email: "test@example.org"
          });
          expect(messageServiceMock.error).toHaveBeenCalledWith(
            "MESSAGE.ERROR_FORGOT"
          );
        });
      });

      describe("when user is known", () => {
        it("should show success message", () => {
          // ARRANGE
          userServiceMock.forgot.and.returnValue(of({}));
          component.formService.userForm.setValue({
            email: "test@example.org"
          });

          // ACT
          component.formHandler();

          // ASSERT
          expect(messageServiceMock.success).toHaveBeenCalledWith(
            "MESSAGE.SUCCESS_FORGOT"
          );
        });

        it("should navigate to login", () => {
          // ARRANGE
          userServiceMock.forgot.and.returnValue(of({}));
          component.formService.userForm.setValue({
            email: "test@example.org"
          });

          // ACT
          component.formHandler();

          // ASSERT
          expect(routerMock.navigate).toHaveBeenCalledWith(["/login"]);
        });
      });
    });
  });
});
