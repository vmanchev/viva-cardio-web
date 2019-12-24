import { Action } from '@ngrx/store';

export const AuthActions = {
  AddToken: '[AuthActions] Add auth token to the store'
};

export class AddTokenAction implements Action {
  readonly type = AuthActions.AddToken;

  constructor(public payload: string) { }
}