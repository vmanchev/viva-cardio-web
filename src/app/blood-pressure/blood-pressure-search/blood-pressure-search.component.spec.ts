import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BloodPressureSearchComponent } from "./blood-pressure-search.component";
import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslatePipe
} from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "src/app/material/material.module";
import { BloodPressureService } from "../blood-pressure-service/blood-pressure.service";

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

const bloodPressureServiceMock = jasmine.createSpyObj("BloodPressureService", [
  "search"
]);
bloodPressureServiceMock.search.and.returnValue(of({items: []}));

describe("BloodPressureSearchComponent", () => {
  let component: BloodPressureSearchComponent;
  let fixture: ComponentFixture<BloodPressureSearchComponent>;

  beforeEach(async(() => {
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
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: TranslatePipe, useClass: TranslatePipeMock },
        { provide: BloodPressureService, useValue: bloodPressureServiceMock }
      ],
      declarations: [BloodPressureSearchComponent, TranslatePipeMock]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPressureSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
