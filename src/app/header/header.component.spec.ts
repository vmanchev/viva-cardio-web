import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";

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
import { AuthActions } from '../auth/auth-store/actions';

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
  "use"
]);

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const dispatch: Subject<Action> = new Subject();
  const destroy$ = new Subject();
  let actual: Action[];

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
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: TranslatePipe, useClass: TranslatePipeMock }
      ],
      declarations: [HeaderComponent, TranslatePipeMock]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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

  describe("setLanguage", () => {
    it("should set the language to the code value of passed object", () => {
      // ACT
      component.setLanguage({ code: "en" });

      // ASSERT
      expect(translateServiceMock.use).toHaveBeenCalledWith("en");
    });
  });

  describe('logout', () => {
    it('should dispatch LogoutAction', () => {
      // ACT
      component.logout();

      expect(actual[0].type).toEqual(AuthActions.Logout);
    });
  });
});
