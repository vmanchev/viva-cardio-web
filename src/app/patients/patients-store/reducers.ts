import {
  PatientActions,
  StoreBulkPatientsAction,
  AddPatientSuccessAction
} from "./actions";
import { ActionsMap } from "src/app/app-store/actions-map";
import { Patient } from "../patient.model";

export const patientFeatureKey = "patients";

export interface PatientsState {
  items: Patient[];
}

function addPatientSuccess(
  state: PatientsState,
  action: AddPatientSuccessAction
): PatientsState {
  let items = [...state.items];
  items.push(action.payload);

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
    return {...state};
  }

  let items = [...state.items].concat(action.payload);

  return {
    ...state,
    items
  };
}

const reducerMap: ActionsMap<PatientsState> = {
  [PatientActions.AddPatientSuccess]: addPatientSuccess,
  [PatientActions.StoreBulkPatients]: storeBulkPatients
};

export function patientsStateReducer(state = { items: [] }, action) {
  return reducerMap[action.type] != null
    ? reducerMap[action.type](state, action)
    : state;
}
