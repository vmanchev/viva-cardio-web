import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { UserFormService } from '../user-form.service';
import { UserService } from '../user.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app-store';
import { MessageService } from 'src/app/shared/message-service/message.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AddTokenAction } from '../auth-store/actions';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  constructor(
    public formService: UserFormService,
    private userService: UserService,
    private store: Store<State>,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formService.getLoginForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  formHandler() {

    if (this.formService.userForm.invalid) {
      return;
    }

    this.userService.login(this.formService.userForm.value)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(
      this.successHandler.bind(this),
      this.errorHandler.bind(this)
    );
  }

  private successHandler(response: any) {
    if (response.token) {
      this.store.dispatch(new AddTokenAction(response.token));
      this.messageService.success('MESSAGE.SUCCESS_LOGIN');
      this.router.navigate(['/patients']);
    }
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    this.messageService.error('MESSAGE.ERROR_LOGIN');
  }
}
