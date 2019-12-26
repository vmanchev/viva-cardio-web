import { Injectable } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import * as _ from "lodash";

@Injectable({
  providedIn: "root"
})
export class PatientFormService {
  public patientForm: FormGroup;

  constructor() {
    this.patientForm = new FormGroup({
      name: new FormControl("", [Validators.required])
    });
  }

  hasRequiredError(name: string): boolean {
    return _.get(this.patientForm.controls[name], "errors.required", false);
  }
}
