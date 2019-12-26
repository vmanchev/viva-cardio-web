import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { UserFormService } from "../user-form.service";
import { UserService } from "../user.service";
import { MessageService } from "src/app/shared/message-service/message.service";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"]
})
export class ForgotComponent implements OnDestroy {
  private destroy$ = new Subject();

  constructor(
    public formService: UserFormService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
  }

  formHandler() {
    if (this.formService.userForm.invalid) {
      return;
    }

    this.userService
      .forgot(this.formService.userForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        success => this.successHandler(success),
        error => this.errorHandler(error)
      );
  }

  private successHandler(response: any) {
    this.messageService.success("MESSAGE.SUCCESS_FORGOT");
    this.router.navigate(["/login"]);
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    this.messageService.error("MESSAGE.ERROR_FORGOT");
  }
}
