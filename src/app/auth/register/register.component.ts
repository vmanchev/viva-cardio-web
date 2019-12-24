import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { UserFormService } from '../user-form.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddTokenAction } from '../auth-store/actions';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app-store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  constructor(
    public formService: UserFormService,
    private userService: UserService,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.formService.getRegistrationForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  formHandler() {

    if (this.formService.userForm.invalid) {
      return;
    }

    this.userService.registration({
      email: this.formService.userForm.controls.email.value,
      password: this.formService.userForm.controls.password.value,
    })
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((response: any) => {
      if (response.token) {
        this.store.dispatch(new AddTokenAction(response.token))
      }
    });
  }

}
