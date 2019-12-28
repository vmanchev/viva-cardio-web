import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PatientComponent } from "./patient.component";

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
import { Action, Store } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PatientCloseModalToken } from "../patients-store/tokens";
import { PatientActions } from "../patients-store/actions";

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

const matDialogRefMock = jasmine.createSpyObj("MatDialogRef", ["close"]);

let matDialogDataMock = {};

describe("PatientComponent", () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;
  const dispatch: Subject<Action> = new Subject();
  const destroy$ = new Subject();
  let actual: Action[];
  let resetSpy;
  let patientCloseModalTokenMock = of({});

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
        { provide: TranslatePipe, useClass: TranslatePipeMock },
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: matDialogDataMock },
        {
          provide: PatientCloseModalToken,
          useValue: patientCloseModalTokenMock
        }
      ],
      declarations: [PatientComponent, TranslatePipeMock]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    resetSpy = spyOn(component.formService.patientForm, "reset");
  });

  afterAll(() => {
    destroy$.next();
    destroy$.complete();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should close the modal when close flag is true", () => {
      // ARRANGE
      patientCloseModalTokenMock = of(true);

      // ACT
      component.ngOnInit();

      // ASSERT
      expect(matDialogRefMock.close).toHaveBeenCalled();
    });
  });

  describe("formHandler", () => {
    describe("when form is invalid", () => {
      it("should not try to add a new patient", () => {
        // ARRANGE
        component.formService.patientForm.setValue({
          name: ""
        });
        fixture.detectChanges();

        // ACT
        component.formHandler();

        // ASSERT
        expect(component.formService.patientForm.invalid).toBeTrue();
        expect(actual.length).toBe(0);
      });
    });

    describe("when form is valid", () => {
      describe("and a new patient was added", () => {
        it("should dispatch AddPatientAction", () => {
          // ARRANGE
          component.formService.patientForm.setValue({
            name: "John"
          });

          // ACT
          component.formHandler();

          // ASSERT
          expect(actual[0].type).toBe(PatientActions.AddPatient);
        });
      });

      describe("and an existing patient was updated", () => {
        it("should dispatch UpdatePatientAction", () => {
          // ARRANGE
          component.data = {
            id: 1,
            name: "John",
            user_id: 23
          };
          fixture.detectChanges();

          component.formService.patientForm.setValue({
            name: component.data.name
          });

          // ACT
          component.formHandler();

          // ASSERT
          expect(actual[0].type).toBe(PatientActions.UpdatePatient);
        });
      });
    });
  });
});
