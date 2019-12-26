import { TestBed } from '@angular/core/testing';

import { PatientFormService } from './patient-form.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('PatientFormService', () => {

  let service: PatientFormService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule
    ]
  }));

  describe('constructor', () => {
    beforeEach(() => {
      service = TestBed.get(PatientFormService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  
    it('should have only name form control', () => {
      expect(service.patientForm.controls.name).toBeDefined();
      expect(Object.keys(service.patientForm.controls).length).toEqual(1);
    });

    it('should add error.required for name when empty', () => {
      expect(service.patientForm.valid).toBeFalse();
      expect(service.patientForm.controls.name.valid).toBeFalse();
      expect(service.patientForm.controls.name.errors.required).toBeTrue();
    });
  });

  describe('hasRequiredError', () => {

    beforeEach(() => {
      service = TestBed.get(PatientFormService);
    });

    it('should return true when a required field is empty', () => {
      // ARRANGE
      service.patientForm.controls.name.setValue('');

      // ASSERT
      expect(service.hasRequiredError('name')).toBeTrue();
    });

    it('should return false when a required field is not empty', () => {
      // ARRANGE
      service.patientForm.controls.name.setValue('test');

      // ASSERT
      expect(service.hasRequiredError('name')).toBeFalse();
    });

  });
});
