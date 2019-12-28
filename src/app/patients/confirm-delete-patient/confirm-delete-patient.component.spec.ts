import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeletePatientComponent } from './confirm-delete-patient.component';

describe('ConfirmDeletePatientComponent', () => {
  let component: ConfirmDeletePatientComponent;
  let fixture: ComponentFixture<ConfirmDeletePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeletePatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeletePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
