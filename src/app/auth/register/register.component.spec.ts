import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RegisterComponent } from "./register.component";
import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslatePipe
} from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "src/app/material/material.module";
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

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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
        RouterTestingModule,
        MaterialModule,
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
      declarations: [RegisterComponent, TranslatePipeMock]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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

    it("should create the registration form", () => {
      expect(component.formService.userForm.controls.email).toBeDefined();
      expect(component.formService.userForm.controls.password).toBeDefined();
      expect(
        component.formService.userForm.controls.confirmPassword
      ).toBeDefined();
    });

    it("should reset the form", () => {
      // ASSERT
      expect(resetSpy).toHaveBeenCalled();
    });
  });

  describe("formHandler", () => {
    describe("when form is invalid", () => {
      it("should not try to register the user", () => {
        // ARRANGE
        component.formService.userForm.setValue({
          email: "",
          password: "",
          confirmPassword: ""
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
      it("should dispatch RegisterNewUserAction", () => {
        // ARRANGE
        component.formService.userForm.setValue({
          email: "test@example.org",
          password: "test123",
          confirmPassword: "test123"
        });

        // ACT
        component.formHandler();

        // ASSERT
        expect(actual[0].type).toBe("[AuthActions] Register a new user");
      });
    });
  });
});
