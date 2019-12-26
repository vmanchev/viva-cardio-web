import { Component } from "@angular/core";
import { UserFormService } from "../user-form.service";
import { ForgotPasswordRequestAction } from "../auth-store/actions";
import { Store } from "@ngrx/store";
import { State } from "src/app/app-store";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"]
})
export class ForgotComponent {
  constructor(
    public formService: UserFormService,
    private store: Store<State>
  ) {}

  formHandler() {
    if (this.formService.userForm.invalid) {
      return;
    }

    this.store.dispatch(
      new ForgotPasswordRequestAction(this.formService.userForm.value)
    );
  }
}
