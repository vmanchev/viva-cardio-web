import { AuthActions, AddTokenAction, LogoutAction } from "./actions";
import { ActionsMap } from "src/app/app-store/actions-map";

export const authFeatureKey = "auth";

export interface AuthState {
  token: string;
}

function addToken(state: AuthState, action: AddTokenAction): AuthState {
  return Object.assign({}, { ...state }, { token: action.payload });
}

function logout(state: AuthState, action: LogoutAction): AuthState {
  return Object.assign({}, { ...state }, { token: null });
}

const reducerMap: ActionsMap<AuthState> = {
  [AuthActions.AddToken]: addToken,
  [AuthActions.Logout]: logout
};

export function authStateReducer(state = { token: null }, action) {
  return reducerMap[action.type] != null
    ? reducerMap[action.type](state, action)
    : state;
}
