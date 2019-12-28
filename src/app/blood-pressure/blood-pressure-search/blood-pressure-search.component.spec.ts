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
import { MaterialModule } from "src/app/material/material.module";
import { BloodPressureService } from "../blood-pressure-service/blood-pressure.service";
import { RouterTestingModule } from "@angular/router/testing";
import { BloodPressureReading } from "../blood-pressure-reading.model";

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
bloodPressureServiceMock.search.and.returnValue(of({ items: [] }));

const resultsMock: BloodPressureReading[] = [
  {
    id: "12",
    patient_id: 22,
    dia: 120,
    sys: 80,
    pulse: 76,
    created_at: "2019-12-24T18:45:12"
  },
  {
    id: "18",
    patient_id: 22,
    dia: 142,
    sys: 95,
    pulse: 67,
    created_at: "2019-12-24T22:01:18"
  }
];

describe("BloodPressureSearchComponent", () => {
  let component: BloodPressureSearchComponent;
  let fixture: ComponentFixture<BloodPressureSearchComponent>;

  beforeEach(async(() => {
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
    component.readings = [];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should search for patients blood pressure readings", () => {
      // ARRANGE
      component.readings = [];
      component.patientId = "15";

      // ACT
      component.ngOnInit();

      // ASSERT
      expect(component.readings.length).toBe(0);
      expect(bloodPressureServiceMock.search).toHaveBeenCalledWith({
        patientId: component.patientId
      });
    });

    it("should assign the results to a component property when there are results", () => {
      // ARRANGE
      component.patientId = "15";
      bloodPressureServiceMock.search.and.returnValue(
        of({ items: resultsMock })
      );

      // ACT
      component.ngOnInit();

      // ASSERT
      expect(component.readings.length).toBe(2);
      expect(component.readings).toEqual(resultsMock);
    });
  });
});
