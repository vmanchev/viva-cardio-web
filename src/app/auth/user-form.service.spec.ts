import { TestBed } from '@angular/core/testing';

import { UserFormService } from './user-form.service';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('UserFormService', () => {

  let service: UserFormService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule
    ]
  }));

  describe('constructor', () => {
    beforeEach(() => {
      service = TestBed.get(UserFormService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  
    it('should have only email form control by default', () => {
      expect(service.userForm.controls.email).toBeDefined();
      expect(service.userForm.controls.password).not.toBeDefined();
      expect(service.userForm.controls.confirmPassword).not.toBeDefined();
    });
  });

  describe('getRegistrationForm', () => {

    beforeEach(() => {
      service = TestBed.get(UserFormService);
      service.getRegistrationForm();
    });

    it('should have email, password and confirmPassword', () => {
      expect(service.userForm.controls.email).toBeDefined();
      expect(service.userForm.controls.password).toBeDefined();
      expect(service.userForm.controls.confirmPassword).toBeDefined();
    });

    it('should add error.required for email when empty', () => {
      expect(service.userForm.valid).toBeFalse();
      expect(service.userForm.controls.email.valid).toBeFalse();
      expect(service.userForm.controls.email.errors.required).toBeTrue();
    });

    it('should add error.email for email when not a valid email', () => {
      // ARRANGE
      service.userForm.controls.email.setValue('test');

      // ASSERT
      expect(service.userForm.valid).toBeFalse();
      expect(service.userForm.controls.email.valid).toBeFalse();
      expect(service.userForm.controls.email.errors.required).toBeUndefined();
      expect(service.userForm.controls.email.errors.email).toBeTrue();
    });

    it('should add error.required for password when empty', () => {
      expect(service.userForm.valid).toBeFalse();
      expect(service.userForm.controls.password.valid).toBeFalse();
      expect(service.userForm.controls.password.errors.required).toBeTrue();
    });

    it('should add error.required for confirmPassword when empty', () => {
      expect(service.userForm.valid).toBeFalse();
      expect(service.userForm.controls.confirmPassword.valid).toBeFalse();
      expect(service.userForm.controls.confirmPassword.errors.required).toBeTrue();
    });

    it('should set the form to valid state when valid data is provided', () => {
      // ARRANGE
      service.userForm.controls.email.setValue('test@example.org');
      service.userForm.controls.password.setValue('qwerty');
      service.userForm.controls.confirmPassword.setValue('qwerty');

      // ASSERT
      expect(service.userForm.valid).toBeTrue();
      expect(service.userForm.controls.email.errors).toBeNull();
      expect(service.userForm.controls.password.errors).toBeNull();
      expect(service.userForm.controls.confirmPassword.errors).toBeNull();
      expect(service.userForm.controls.email.valid).toBeTrue();
      expect(service.userForm.controls.password.valid).toBeTrue();
      expect(service.userForm.controls.confirmPassword.valid).toBeTrue();
    });    

  });

  describe('getLoginForm', () => {

    beforeEach(() => {
      service = TestBed.get(UserFormService);
      service.getLoginForm();
    });

    it('should have email, password and confirmPassword', () => {
      expect(service.userForm.controls.email).toBeDefined();
      expect(service.userForm.controls.password).toBeDefined();
      expect(service.userForm.controls.confirmPassword).not.toBeDefined();
    });

    it('should add error.required for email when empty', () => {
      expect(service.userForm.valid).toBeFalse();
      expect(service.userForm.controls.email.valid).toBeFalse();
      expect(service.userForm.controls.email.errors.required).toBeTrue();
    });

    it('should add error.email for email when not a valid email', () => {
      // ARRANGE
      service.userForm.controls.email.setValue('test');

      // ASSERT
      expect(service.userForm.valid).toBeFalse();
      expect(service.userForm.controls.email.valid).toBeFalse();
      expect(service.userForm.controls.email.errors.required).toBeUndefined();
      expect(service.userForm.controls.email.errors.email).toBeTrue();
    });

    it('should add error.required for password when empty', () => {
      expect(service.userForm.valid).toBeFalse();
      expect(service.userForm.controls.password.valid).toBeFalse();
      expect(service.userForm.controls.password.errors.required).toBeTrue();
    });

    it('should set the form to valid state when valid data is provided', () => {
      // ARRANGE
      service.userForm.controls.email.setValue('test@example.org');
      service.userForm.controls.password.setValue('qwerty');

      // ASSERT
      expect(service.userForm.valid).toBeTrue();
      expect(service.userForm.controls.email.errors).toBeNull();
      expect(service.userForm.controls.password.errors).toBeNull();
      expect(service.userForm.controls.email.valid).toBeTrue();
      expect(service.userForm.controls.password.valid).toBeTrue();
    });

  });

  describe('hasRequiredError', () => {

    beforeEach(() => {
      service = TestBed.get(UserFormService);
    });

    it('should return true when a required field is empty', () => {
      // ARRANGE
      service.userForm.controls.email.setValue('');

      // ASSERT
      expect(service.hasRequiredError('email')).toBeTrue();
    });

    it('should return false when a required field is not empty', () => {
      // ARRANGE
      service.userForm.controls.email.setValue('test');

      // ASSERT
      expect(service.hasRequiredError('email')).toBeFalse();
    });

  });

  describe('hasEmailError', () => {

    beforeEach(() => {
      service = TestBed.get(UserFormService);
    });

    it('should return true when an email field does not contains a valid email address', () => {
      // ARRANGE
      service.userForm.controls.email.setValue('test');

      // ASSERT
      expect(service.hasEmailError('email')).toBeTrue();
    });

    it('should return false when an email field contains a valid email address', () => {
      // ARRANGE
      service.userForm.controls.email.setValue('test@test');

      // ASSERT
      expect(service.hasEmailError('email')).toBeFalse();
    });

  });

});
