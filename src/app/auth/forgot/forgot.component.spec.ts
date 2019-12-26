import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ForgotComponent } from "./forgot.component";
import { MaterialModule } from "src/app/material/material.module";
import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import {
  TranslateService,
  TranslatePipe,
  TranslateModule,
  TranslateLoader
} from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { Action, Store } from "@ngrx/store";
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

describe("ForgotComponent", () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;
  const dispatch: Subject<Action> = new Subject();
  const destroy$ = new Subject();
  let actual: Action[];

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
      declarations: [ForgotComponent, TranslatePipeMock]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    destroy$.next();
    destroy$.complete();
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
        expect(actual.length).toBe(0);
      });
    });

    describe("when form is valid", () => {
      it("should dispatch ForgotPasswordRequestAction", () => {
        // ARRANGE
        component.formService.userForm.setValue({
          email: "test@example.org"
        });

        // ACT
        component.formHandler();

        // ASSERT
        expect(actual[0].type).toBe("[AuthActions] Forgot password request");
      });
    });
  });
});
