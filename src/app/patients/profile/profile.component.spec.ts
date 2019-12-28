import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslatePipe
} from "@ngx-translate/core";
import { ProfileComponent } from "./profile.component";
import { MaterialModule } from "src/app/material/material.module";
import {
  Component,
  PipeTransform,
  Injectable,
  Pipe,
  Input
} from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PatientsToken } from "../patients-store/tokens";
import { Action, Store } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

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

@Component({
  selector: "app-blood-pressure-search",
  template: ""
})
class BloodPressureSearch {
  @Input() patientId: any;
}

let patientsTokenMock = of([{id: "15"}, {id: "20"}]);

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const dispatch: Subject<Action> = new Subject();
  const destroy$ = new Subject();
  let actual: Action[];

  beforeEach(async(() => {
    actual = [];
    dispatch.pipe(takeUntil(destroy$)).subscribe(a => actual.push(a));

    TestBed.configureTestingModule({
      declarations: [ProfileComponent, BloodPressureSearch, TranslatePipeMock],
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
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: TranslatePipe, useClass: TranslatePipeMock },
        { provide: PatientsToken, useValue: patientsTokenMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: "15" }),
            url: of([{ path: "special" }])
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
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
});
