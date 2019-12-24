import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RegisterComponent } from "./register.component";
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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "../user.service";

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

const userServiceMock = jasmine.createSpyObj("UserService", ["registration"]);
userServiceMock.registration.and.returnValue(of({}));

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
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
        { provide: UserService, useValue: userServiceMock }
      ],
      declarations: [RegisterComponent, TranslatePipeMock]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should create the registration form', () => {
      expect(component.formService.userForm.controls.email).toBeDefined();
      expect(component.formService.userForm.controls.password).toBeDefined();
      expect(component.formService.userForm.controls.confirmPassword).toBeDefined();
    });
  });

  describe('formHandler', () => {
    describe('when form is invalid', () => {
      it('should not try to register the user', () => {
        // ARRANGE
        component.formService.userForm.setValue({
          email: '',
          password: '',
          confirmPassword: ''
        });

        // ACT
        component.formHandler();

        // ASSERT
        expect(userServiceMock.registration).not.toHaveBeenCalled();
      });
    });

    describe('when form is valid', () => {
      it('should try to register the new user', () => {
        // ARRANGE
        component.formService.userForm.setValue({
          email: 'test@example.org',
          password: 'test',
          confirmPassword: 'test'
        });

        // ACT
        component.formHandler();

        // ASSERT
        expect(userServiceMock.registration).toHaveBeenCalledWith({
          email: 'test@example.org',
          password: 'test'
        });
      });
    });

  });
});
