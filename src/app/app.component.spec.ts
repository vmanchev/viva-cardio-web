import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { Component } from "@angular/core";

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
import { Action, Store } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";
import { AuthActions } from "./auth/auth-store/actions";
import { StorageService } from "./shared/storage-service/storage.service";
import { PatientActions } from "./patients/patients-store/actions";

@Pipe({
  name: "translate"
})
export class TranslatePipeMock implements PipeTransform {
  public name = "translate";

  public transform(query: string, ...args: any[]): any {
    return query;
  }
}

const translateServiceMock = jasmine.createSpyObj("TranslateService", [
  "get",
  "setDefaultLang"
]);
translateServiceMock.get.and.returnValue(of(""));

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}

@Component({
  selector: "app-header",
  template: ""
})
class HeaderComponentMock {}

@Component({
  selector: "app-footer",
  template: ""
})
class FooterComponentMock {}

const storageServiceMock = jasmine.createSpyObj("StorageService", ["get"]);

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const dispatch: Subject<Action> = new Subject();
  const destroy$ = new Subject();
  let actual: Action[];

  beforeEach(async(() => {
    actual = [];
    dispatch.pipe(takeUntil(destroy$)).subscribe(a => actual.push(a));

    TestBed.configureTestingModule({
      imports: [
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
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: TranslatePipe, useClass: TranslatePipeMock },
        { provide: StorageService, useValue: storageServiceMock }
      ],
      declarations: [
        AppComponent,
        HeaderComponentMock,
        FooterComponentMock,
        TranslatePipeMock
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    destroy$.next();
    destroy$.complete();
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it("should set the default language", () => {
    component.ngOnInit();
    expect(translateServiceMock.setDefaultLang).toHaveBeenCalledWith("bg");
  });

  describe("when auth token is found in local storage", () => {
    it("should dispatch AddTokenAction and FetchPatientsAction", () => {
      // ARRANGE
      storageServiceMock.get.and.returnValue("token");

      // ACT
      component.ngOnInit();

      // ASSERT
      expect(actual[0].type).toEqual(AuthActions.AddToken);
      expect(actual[1].type).toEqual(PatientActions.FetchPatients);
    });
  });
});
