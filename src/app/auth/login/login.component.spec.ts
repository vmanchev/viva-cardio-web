import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { Observable, of, Subject, defer, throwError } from "rxjs";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslatePipe
} from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/material/material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Store, Action } from "@ngrx/store";
import { UserService } from "../user.service";
import { MessageService } from "src/app/shared/message-service/message.service";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { HttpErrorResponse } from '@angular/common/http';

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

const userServiceMock = jasmine.createSpyObj("UserService", ["login"]);
userServiceMock.login.and.returnValue(of({}));

const messageServiceMock = jasmine.createSpyObj("MessageService", ["success", "error"]);

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const dispatch: Subject<Action> = new Subject();
  const destroy = new Subject();
  let actual: Action[];
  let routerMock: Router;

  beforeEach(async(() => {
    actual = [];
    dispatch.pipe(takeUntil(destroy)).subscribe(a => actual.push(a));

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
        {
          provide: Store,
          useValue: {
            dispatch: action => dispatch.next(action),
            select: data => of(data)
          }
        },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: TranslatePipe, useClass: TranslatePipeMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: MessageService, useValue: messageServiceMock }
      ],
      declarations: [LoginComponent, TranslatePipeMock]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    routerMock = TestBed.get(Router);
    spyOn(routerMock, 'navigate');
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should create the login form", () => {
      expect(component.formService.userForm.controls.email).toBeDefined();
      expect(component.formService.userForm.controls.password).toBeDefined();
      expect(
        component.formService.userForm.controls.confirmPassword
      ).not.toBeDefined();
    });
  });

  describe("formHandler", () => {
    describe("when form is invalid", () => {
      it("should not try to authenticate the user", () => {
        // ARRANGE
        component.formService.userForm.setValue({
          email: "",
          password: ""
        });
        fixture.detectChanges();

        // ACT
        component.formHandler();

        // ASSERT
        expect(component.formService.userForm.invalid).toBeTrue();
        expect(userServiceMock.login).not.toHaveBeenCalled();
      });
    });

    describe("when form is valid", () => {
      it("should try to authenticate the user", () => {
        // ARRANGE
        component.formService.userForm.setValue({
          email: "test@example.org",
          password: "test"
        });

        // ACT
        component.formHandler();

        // ASSERT
        expect(userServiceMock.login).toHaveBeenCalledWith({
          email: "test@example.org",
          password: "test"
        });
      });

      describe('when user is not authenticated', () => {
        it('should show an error message', () => {
          // ARRANGE
          userServiceMock.login.and.returnValue(throwError(new HttpErrorResponse({status: 404})));
          component.formService.userForm.setValue({
            email: "test@example.org",
            password: "test"
          });

          // ACT
          component.formHandler();

          // ASSERT
          expect(component.formService.userForm.valid).toBeTrue();
          expect(userServiceMock.login).toHaveBeenCalledWith({
            email: "test@example.org",
            password: "test"
          });
          expect(messageServiceMock.error).toHaveBeenCalledWith(
            "MESSAGE.ERROR_LOGIN"
          );
        })
      });

      describe("when user is authenticated", () => {

        it("should dispatch the token", () => {
          // ARRANGE
          userServiceMock.login.and.returnValue(
            of({
              token: "qwerty"
            })
          );
          component.formService.userForm.setValue({
            email: "test@example.org",
            password: "test"
          });

          // ACT
          component.formHandler();

          // ASSERT
          expect(actual[0].type).toBe(
            "[AuthActions] Add auth token to the store"
          );
        });

        it("should show success message", () => {
          // ARRANGE
          userServiceMock.login.and.returnValue(
            of({
              token: "qwerty"
            })
          );
          component.formService.userForm.setValue({
            email: "test@example.org",
            password: "test"
          });

          // ACT
          component.formHandler();

          // ASSERT
          expect(messageServiceMock.success).toHaveBeenCalledWith(
            "MESSAGE.SUCCESS_LOGIN"
          );
        });

        it("should navigate to patients", () => {
          // ARRANGE
          userServiceMock.login.and.returnValue(
            of({
              token: "qwerty"
            })
          );
          component.formService.userForm.setValue({
            email: "test@example.org",
            password: "test"
          });

          // ACT
          component.formHandler();

          // ASSERT
          expect(routerMock.navigate).toHaveBeenCalledWith(["/patients"]);
        });
      });
    });
  });
});
