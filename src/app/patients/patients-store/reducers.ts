import {
  PatientActions,
  StoreBulkPatientsAction,
  AddPatientSuccessAction,
  CloseModalAction
} from "./actions";
import { ActionsMap } from "src/app/app-store/actions-map";
import { Patient } from "../patient.model";
import * as _ from "lodash";
import { LogoutAction, AuthActions } from "src/app/auth/auth-store/actions";

export const patientFeatureKey = "patients";

export interface PatientsState {
  items: Patient[];
  closeModal: boolean;
}

function addPatientSuccess(
  state: PatientsState,
  action: AddPatientSuccessAction
): PatientsState {
  let items = [...state.items];
  items.push(action.payload);

  items = _.sortBy(items, "name");

  return {
    ...state,
    items
  };
}

function storeBulkPatients(
  state: PatientsState,
  action: StoreBulkPatientsAction
): PatientsState {
  if (!action.payload.length) {
    return { ...state };
  }

  let items = [...state.items].concat(action.payload);
  items = _.sortBy(items, "name");

  return {
    ...state,
    items
  };
}

function closeModal(
  state: PatientsState,
  action: CloseModalAction
): PatientsState {
  const newState = { ...state };
  newState.closeModal = action.payload;

  return newState;
}

function logout(state: PatientsState, action: LogoutAction): PatientsState {
  return {
    items: [],
    closeModal: false
  };
}

const reducerMap: ActionsMap<PatientsState> = {
  [PatientActions.AddPatientSuccess]: addPatientSuccess,
  [PatientActions.StoreBulkPatients]: storeBulkPatients,
  [PatientActions.CloseModal]: closeModal,
  [AuthActions.Logout]: logout
};

export function patientsStateReducer(
  state = { items: [], closeModal: false },
  action
) {
  return reducerMap[action.type] != null
    ? reducerMap[action.type](state, action)
    : state;
}
