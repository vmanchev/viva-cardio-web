import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TranslateLoader, TranslateModule, TranslateService, TranslatePipe } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';

@Pipe({
  name: "translate"
})
export class TranslatePipeMock implements PipeTransform {
  public name = "translate";

  public transform(query: string, ...args: any[]): any {
    return query;
  }
}

const translateServiceMock = jasmine.createSpyObj('TranslateService', ['get', 'use']);

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setLanguage', () => {
    it('should set the language to the code value of passed object', () => {
      // ACT
      component.setLanguage({code: 'en'});

      // ASSERT
      expect(translateServiceMock.use).toHaveBeenCalledWith('en');
    });
  });
});
