import { PatientActions, AddPatientAction } from "./actions";
import { ActionsMap } from "src/app/app-store/actions-map";
import { Patient } from '../patient.model';

export const patientFeatureKey = "patients";

export interface PatientsState {
  patients: Patient[];
}

function addPatient(state: PatientsState, action: AddPatientAction): PatientsState {
  const newState = Object.assign({}, { ...state });
  newState.patients.push(action.payload);
  return newState;
}

const reducerMap: ActionsMap<PatientsState> = {
  [PatientActions.AddPatient]: addPatient
};

export function patientsStateReducer(state = { patients: [] }, action) {
  return reducerMap[action.type] != null
    ? reducerMap[action.type](state, action)
    : state;
}
