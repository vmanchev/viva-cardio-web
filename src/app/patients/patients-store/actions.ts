import { Action } from "@ngrx/store";
import { Patient } from "../patient.model";

export const PatientActions = {
  AddPatient: "[PatientActions] Add patient",
  AddPatientSuccess: "[PatientActions] Successfully added a new patient",
  UpdatePatient: "[PatientActions] Update patient",
  UpdatePatientSuccess: "[PatientActions] Successfully updated patient",
  DeletePatient: "[PatientActions] Delete patient",
  DeletePatientSuccess: "[PatientActions] Successfully deleted patient",
  FetchPatients: "[PatientAction] Fetch patients list",
  StoreBulkPatients: "[PatientAction] Store bulk patients list locally"
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
  constructor(public payload: Patient) {}
}

export class UpdatePatientSuccessAction implements Action {
  readonly type = PatientActions.UpdatePatientSuccess;
}

export class DeletePatientSuccessAction implements Action {
  readonly type = PatientActions.DeletePatientSuccess;
}

export class FetchPatientsAction implements Action {
  readonly type = PatientActions.FetchPatients;
}

export class StoreBulkPatientsAction implements Action {
  readonly type = PatientActions.StoreBulkPatients;

  constructor(public payload: Patient[]) {}
}
