import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import { AuthState } from "../auth/auth-store/reducers";

export interface State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  auth: undefined
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
