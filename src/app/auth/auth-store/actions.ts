import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const AuthActions = {
  AddToken: "[AuthActions] Add auth token to the store",
  RegisterNewUser: "[AuthActions] Register a new user",
  AuthenticateUser: "[AuthActions] User authentication",
  ForgotPassword: "[AuthActions] Recover user password",
  SuccessfullRegistration: "[AuthActions] Successfull registration",
  SuccessfullLogin: "[AuthActions] Successfull login",
  FailedLogin: "[AuthActions] Failed login",
  ForgotPasswordRequest: "[AuthActions] Forgot password request",
  ForgotPasswordSuccess: "[AuthActions] Forgot password - success",
  ForgotPasswordFailure: "[AuthActions] Forgot password - failure",
  Logout: "[AuthActions] Logout"
};

export class AddTokenAction implements Action {
  readonly type = AuthActions.AddToken;

  constructor(public payload: string) {}
}

export class RegisterNewUserAction implements Action {
  readonly type = AuthActions.RegisterNewUser;

  constructor(public payload: User) {}
}

export class AuthenticateUserAction implements Action {
  readonly type = AuthActions.AuthenticateUser;

  constructor(public payload: User) {}
}

export class SuccessfullRegistrationAction implements Action {
  readonly type = AuthActions.SuccessfullRegistration;
}

export class SuccessfullLoginAction implements Action {
  readonly type = AuthActions.SuccessfullLogin;
}

export class FailedLoginAction implements Action {
  readonly type = AuthActions.FailedLogin;
}

export class ForgotPasswordRequestAction implements Action {
  readonly type = AuthActions.ForgotPasswordRequest;

  constructor(public payload: Partial<User>) {}
}

export class ForgotPasswordSuccessAction implements Action {
  readonly type = AuthActions.ForgotPasswordSuccess;
}

export class ForgotPasswordFailureAction implements Action {
  readonly type = AuthActions.ForgotPasswordFailure;
}

export class LogoutAction implements Action {
  readonly type = AuthActions.Logout;
}
