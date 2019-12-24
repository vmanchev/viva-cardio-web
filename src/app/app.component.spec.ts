import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { Component } from "@angular/core";

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

@Pipe({
  name: "translate"
})
export class TranslatePipeMock implements PipeTransform {
  public name = "translate";

  public transform(query: string, ...args: any[]): any {
    return query;
  }
}

const translateServiceMock = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
translateServiceMock.get.and.returnValue(of(''));

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

describe("AppComponent", () => {
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
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: TranslatePipe, useClass: TranslatePipeMock }
      ],
      declarations: [
        AppComponent,
        HeaderComponentMock,
        FooterComponentMock,
        TranslatePipeMock
      ]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set the default language', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    expect(translateServiceMock.setDefaultLang).toHaveBeenCalledWith('bg')
  });

});
