import { AbstractControl } from "@angular/forms";

export class ValidatePassword {
  static MismatchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get("password").value;
    let confirmPassword = abstractControl.get("confirmPassword").value;
    if (password != confirmPassword) {
      abstractControl.get("confirmPassword").setErrors({
        mismatch: true
      });
    } else {
      return null;
    }
  }
}
