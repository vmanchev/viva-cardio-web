import { Component, OnInit } from "@angular/core";
import { UserFormService } from "../user-form.service";
import { Store } from "@ngrx/store";
import { State } from "src/app/app-store";
import { AuthenticateUserAction } from "../auth-store/actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    public formService: UserFormService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.formService.getLoginForm();
    this.formService.userForm.reset();
    this.formService.userForm.setValue({
      email: 'd@d',
      password: 'pppppp'
    });
  }

  formHandler() {
    if (this.formService.userForm.invalid) {
      return;
    }

    this.store.dispatch(
      new AuthenticateUserAction(this.formService.userForm.value)
    );
  }
}
