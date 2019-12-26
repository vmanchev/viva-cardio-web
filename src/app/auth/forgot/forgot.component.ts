import { Component, OnInit } from "@angular/core";
import { UserFormService } from "../user-form.service";
import { ForgotPasswordRequestAction } from "../auth-store/actions";
import { Store } from "@ngrx/store";
import { State } from "src/app/app-store";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"]
})
export class ForgotComponent implements OnInit {
  constructor(
    public formService: UserFormService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.formService.userForm.reset();
  }

  formHandler() {
    if (this.formService.userForm.invalid) {
      return;
    }

    this.store.dispatch(
      new ForgotPasswordRequestAction(this.formService.userForm.value)
    );
  }
}
