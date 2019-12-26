import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
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
import { takeUntil } from "rxjs/operators";

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

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const dispatch: Subject<Action> = new Subject();
  const destroy$ = new Subject();
  let actual: Action[];
  let resetSpy;

  beforeEach(async(() => {
    actual = [];
    dispatch.pipe(takeUntil(destroy$)).subscribe(a => actual.push(a));

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
        { provide: TranslatePipe, useClass: TranslatePipeMock }
      ],
      declarations: [LoginComponent, TranslatePipeMock]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    resetSpy = spyOn(component.formService.userForm, "reset");
  });

  afterEach(() => {
    destroy$.next();
    destroy$.complete();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    
    it("should create the login form", () => {
      expect(component.formService.userForm.controls.email).toBeDefined();
      expect(component.formService.userForm.controls.password).toBeDefined();
      expect(
        component.formService.userForm.controls.confirmPassword
      ).not.toBeDefined();
    });

    it("should reset the form", () => {
      // ASSERT
      expect(resetSpy).toHaveBeenCalled();
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
        expect(actual.length).toBe(0);
      });
    });

    describe("when form is valid", () => {
      it("should dispatch AuthenticateUserAction", () => {
        // ARRANGE
        component.formService.userForm.setValue({
          email: "test@example.org",
          password: "test"
        });

        // ACT
        component.formHandler();

        // ASSERT
        expect(actual[0].type).toBe("[AuthActions] User authentication");
      });
    });
  });
});
