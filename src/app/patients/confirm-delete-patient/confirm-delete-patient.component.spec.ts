import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConfirmDeletePatientComponent } from "./confirm-delete-patient.component";
import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslatePipe
} from "@ngx-translate/core";
import { Action, Store } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/material/material.module";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PatientCloseModalToken } from "../patients-store/tokens";
import { PatientActions } from '../patients-store/actions';

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

describe("ConfirmDeletePatientComponent", () => {
  let component: ConfirmDeletePatientComponent;
  let fixture: ComponentFixture<ConfirmDeletePatientComponent>;
  const dispatch: Subject<Action> = new Subject();
  const destroy$ = new Subject();
  let actual: Action[];
  let patientCloseModalTokenMock = of({});

  beforeEach(async(() => {
    actual = [];
    dispatch.pipe(takeUntil(destroy$)).subscribe(a => actual.push(a));


    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
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
      declarations: [ConfirmDeletePatientComponent, TranslatePipeMock]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeletePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  describe("close", () => {
    it("should close the modal", () => {
      // ACT
      component.close();

      // ASSERT
      expect(matDialogRefMock.close).toHaveBeenCalled();
    });
  });

  describe('confirm', () => {
    it('should dispatch DeletePatientAction with patient id', () => {
      // ARRANGE
      component.data = {
        id: "15"
      }
      // ACT
      component.confirm();

      // ASSERT
      expect(actual[0].type).toEqual(PatientActions.DeletePatient);
      expect(actual[0]['payload']).toEqual("15");
    });
  });
});
