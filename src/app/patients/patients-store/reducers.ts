import { PatientActions, AddPatientAction } from "./actions";
import { ActionsMap } from "src/app/app-store/actions-map";
import { Patient } from "../patient.model";

export const patientFeatureKey = "patients";

export interface PatientsState {
  items: Patient[];
}

function addPatient(
  state: PatientsState,
  action: AddPatientAction
): PatientsState {
  let items = [...state.items];
  items.push(action.payload);

  return {
    ...state,
    items
  };
}

const reducerMap: ActionsMap<PatientsState> = {
  [PatientActions.AddPatient]: addPatient
};

export function patientsStateReducer(state = { items: [] }, action) {
  return reducerMap[action.type] != null
    ? reducerMap[action.type](state, action)
    : state;
}
