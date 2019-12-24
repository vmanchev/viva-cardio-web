import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ForgotComponent } from "./forgot.component";
import { MaterialModule } from "src/app/material/material.module";
import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {
  TranslateService,
  TranslatePipe,
  TranslateModule,
  TranslateLoader
} from "@ngx-translate/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        })
      ],
      providers: [
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

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
