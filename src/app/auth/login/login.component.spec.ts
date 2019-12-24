import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
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


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
        { provide: TranslatePipe, useClass: TranslatePipeMock }
      ],
      declarations: [LoginComponent, TranslatePipeMock]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
