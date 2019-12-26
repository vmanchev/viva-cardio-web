import { Action } from "@ngrx/store";
import { Patient } from "../patient.model";

export const PatientActions = {
  AddPatient: "[PatientActions] Add patient",
  AddPatientSuccess: "[PatientActions] Successfully added a new patient",
  UpdatePatient: "[PatientActions] Update patient",
  UpdatePatientSuccess: "[PatientActions] Successfully updated patient",
  DeletePatient: "[PatientActions] Delete patient",
  DeletePatientSuccess: "[PatientActions] Successfully deleted patient"
};

export class AddPatientAction implements Action {
  readonly type = PatientActions.AddPatient;

  constructor(public payload: Patient) {}
}

export class UpdatePatientAction implements Action {
  readonly type = PatientActions.UpdatePatient;

  constructor(public payload: Patient) {}
}

export class DeletePatientAction implements Action {
  readonly type = PatientActions.DeletePatient;

  constructor(public payload: number) {}
}

export class AddPatientSuccessAction implements Action {
  readonly type = PatientActions.AddPatientSuccess;
}

export class UpdatePatientSuccessAction implements Action {
  readonly type = PatientActions.UpdatePatientSuccess;
}

export class DeletePatientSuccessAction implements Action {
  readonly type = PatientActions.DeletePatientSuccess;
}
