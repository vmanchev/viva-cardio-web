import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  public userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  getRegistrationForm() {
    this.userForm.addControl(
      'password',
      new FormControl('', Validators.required)
    );

    this.userForm.addControl(
      'confirmPassword',
      new FormControl('', Validators.required)
    );
  }

  getLoginForm() {
    this.userForm.addControl(
      'password',
      new FormControl('', Validators.required)
    );
  }

  hasRequiredError(name: string): boolean {
    return _.get(this.userForm.controls[name], 'errors.required', false);
  }

  hasEmailError(name: string): boolean {
    return _.get(this.userForm.controls[name], 'errors.email', false);
  }
}
