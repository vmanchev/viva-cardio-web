import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  AuthActions,
  RegisterNewUserAction,
  AddTokenAction,
  AuthenticateUserAction,
  SuccessfullRegistrationAction,
  SuccessfullLoginAction,
  FailedLoginAction,
  ForgotPasswordRequestAction,
  ForgotPasswordSuccessAction,
  ForgotPasswordFailureAction,
  LogoutAction
} from "./actions";
import { switchMap, tap, map, catchError, delay } from "rxjs/operators";
import { UserService } from "../user.service";
import { MessageService } from "src/app/shared/message-service/message.service";
import { Router } from "@angular/router";
import { from, of } from "rxjs";
import { StorageService } from "src/app/shared/storage-service/storage.service";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private storageService: StorageService
  ) {}

  @Effect()
  newUserRegistration$ = this.actions$.pipe(
    ofType<RegisterNewUserAction>(AuthActions.RegisterNewUser),
    switchMap(action => {
      return this.userService.registration(action.payload).pipe(
        switchMap((response: any) => {
          return from([
            new AddTokenAction(response.token),
            new SuccessfullRegistrationAction()
          ]);
        })
      );
    })
  );

  @Effect()
  authenticateUser$ = this.actions$.pipe(
    ofType<AuthenticateUserAction>(AuthActions.AuthenticateUser),
    switchMap(action => {
      return this.userService.login(action.payload).pipe(
        switchMap((response: any) => {
          this.storageService.add("token", response.token);

          return from([
            new AddTokenAction(response.token),
            new SuccessfullLoginAction()
          ]);
        }),
        catchError(__ => {
          return of(new FailedLoginAction());
        })
      );
    })
  );

  @Effect()
  forgotPassword$ = this.actions$.pipe(
    ofType<ForgotPasswordRequestAction>(AuthActions.ForgotPasswordRequest),
    switchMap(action => {
      return this.userService.forgot(action.payload).pipe(
        switchMap(__ => {
          return of(new ForgotPasswordSuccessAction());
        }),
        catchError(__ => {
          return of(new ForgotPasswordFailureAction());
        })
      );
    })
  );

  @Effect({ dispatch: false })
  successfullRegistration$ = this.actions$.pipe(
    ofType<SuccessfullRegistrationAction>(AuthActions.SuccessfullRegistration),
    tap(__ => {
      this.messageService.success("MESSAGE.SUCCESS_REGISTRATION");
      this.router.navigate(["/patients"]);
    })
  );

  @Effect({ dispatch: false })
  successfullLogin$ = this.actions$.pipe(
    ofType<SuccessfullLoginAction>(AuthActions.SuccessfullLogin),
    delay(0), // to make sure translations are loaded
    tap(__ => {
      this.messageService.success("MESSAGE.SUCCESS_LOGIN");
      this.router.navigate(["/patients"]);
    })
  );

  @Effect({ dispatch: false })
  failedLogin$ = this.actions$.pipe(
    ofType<FailedLoginAction>(AuthActions.FailedLogin),
    tap(__ => {
      this.messageService.error("MESSAGE.ERROR_LOGIN");
    })
  );

  @Effect({ dispatch: false })
  forgotPasswordSuccess$ = this.actions$.pipe(
    ofType<ForgotPasswordSuccessAction>(AuthActions.ForgotPasswordSuccess),
    tap(__ => {
      this.messageService.success("MESSAGE.SUCCESS_FORGOT");
      this.router.navigate(["/login"]);
    })
  );

  @Effect({ dispatch: false })
  forgotPasswordFailure$ = this.actions$.pipe(
    ofType<ForgotPasswordFailureAction>(AuthActions.ForgotPasswordFailure),
    tap(__ => {
      this.messageService.error("MESSAGE.ERROR_FORGOT");
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<LogoutAction>(AuthActions.Logout),
    tap(__ => {
      this.storageService.delete('token');
      this.router.navigate(["/"]);
    })
  );
}
