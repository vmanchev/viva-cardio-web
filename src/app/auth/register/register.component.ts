import { Component, OnInit } from "@angular/core";
import { UserFormService } from "../user-form.service";
import { RegisterNewUserAction } from "../auth-store/actions";
import { Store } from "@ngrx/store";
import { State } from "src/app/app-store";


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(
    public formService: UserFormService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.formService.getRegistrationForm();
    this.formService.userForm.reset();
  }

  formHandler() {
    if (this.formService.userForm.invalid) {
      return;
    }

    let { confirmPassword, ...userModel } = this.formService.userForm.value;

    this.store.dispatch(new RegisterNewUserAction(userModel));
  }
}
