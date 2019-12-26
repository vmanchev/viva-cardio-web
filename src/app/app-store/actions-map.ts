import { Action, ActionReducer } from "@ngrx/store";

export const AppActions = {
  VoidAction: "[AppActions] General purpose action"
};

export interface ActionsMap<T> { [actionType: string]: ActionReducer<T>; }

export class VoidAction implements Action {
  readonly type = AppActions.VoidAction;

  constructor() {}
}
