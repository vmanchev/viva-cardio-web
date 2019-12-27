import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchComponent } from "./search.component";

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
import { Store, Action } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";
import { PatientsToken } from "../patients-store/tokens";
import { MatDialog } from "@angular/material/dialog";

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

const matDialogMock = jasmine.createSpyObj("MatDialog", ["open"]);

describe("SearchComponent", () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const dispatch: Subject<Action> = new Subject();
  const destroy$ = new Subject();
  let actual: Action[];
  let patientsTokenMock = new Subject();

  beforeEach(async(() => {
    actual = [];
    dispatch.pipe(takeUntil(destroy$)).subscribe(a => actual.push(a));

    TestBed.configureTestingModule({
      imports: [
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
        {
          provide: PatientsToken,
          useValue: patientsTokenMock
        },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: TranslatePipe, useClass: TranslatePipeMock },
        { provide: MatDialog, useValue: matDialogMock }
      ],
      declarations: [SearchComponent, TranslatePipeMock]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
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
    it("should dispatch FetchPatientsAction when there are no patients in the store", () => {
      // ARRANGE
      patientsTokenMock.next([]);

      // ACT
      component.ngOnInit();

      // ASSERT
      expect(actual[0].type).toBe("[PatientAction] Fetch patients list");
      expect(component.patients.length).toBe(0);
    });

    it("should not dispatch FetchPatientsAction when there are patients in the store", () => {
      // ARRANGE
      patientsTokenMock.next([{ name: "test" }]);

      // ACT
      component.ngOnInit();

      // ASSERT
      expect(actual.length).toBe(0);
      expect(component.patients).toEqual([{ name: "test" }]);
    });
  });

  describe("addNewPatientDialog", () => {
    it('should open a dialog', () => {
      // ACT
      component.addNewPatientDialog();

      // ASSERT
      expect(matDialogMock.open).toHaveBeenCalled();
    });
  });
});
