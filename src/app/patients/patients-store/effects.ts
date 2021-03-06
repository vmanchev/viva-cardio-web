import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  AddPatientAction,
  PatientActions,
  AddPatientSuccessAction,
  UpdatePatientAction,
  UpdatePatientSuccessAction,
  DeletePatientAction,
  DeletePatientSuccessAction,
  FetchPatientsAction,
  StoreBulkPatientsAction,
  CloseModalAction
} from "./actions";
import { switchMap, tap, map, catchError, delay } from "rxjs/operators";
import { MessageService } from "src/app/shared/message-service/message.service";
import { Router } from "@angular/router";
import { from, of } from "rxjs";
import { PatientService } from "../patient.service";
import { Patient } from "../patient.model";

@Injectable()
export class PatientEffects {
  constructor(
    private actions$: Actions,
    private patientService: PatientService,
    private messageService: MessageService,
    private router: Router
  ) {}

  @Effect()
  addPatient$ = this.actions$.pipe(
    ofType<AddPatientAction>(PatientActions.AddPatient),
    switchMap(action => {
      return this.patientService.create(action.payload).pipe(
        switchMap((response: Patient) => {
          return from([
            new AddPatientSuccessAction(response),
            new CloseModalAction(true)
          ]);
        })
      );
    })
  );

  @Effect()
  updatePatient$ = this.actions$.pipe(
    ofType<UpdatePatientAction>(PatientActions.UpdatePatient),
    switchMap(action => {
      return this.patientService.update(action.payload).pipe(
        switchMap((response: Patient) => {
          return from([
            new UpdatePatientSuccessAction(response),
            new CloseModalAction(true)
          ]);
        })
      );
    })
  );

  @Effect()
  deletePatient$ = this.actions$.pipe(
    ofType<DeletePatientAction>(PatientActions.DeletePatient),
    switchMap(action => {
      return this.patientService.delete(action.payload).pipe(
        switchMap(__ => {
          return from([
            new DeletePatientSuccessAction(action.payload),
            new CloseModalAction(true)
          ]);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  addPatientSuccess$ = this.actions$.pipe(
    ofType<AddPatientSuccessAction>(PatientActions.AddPatientSuccess),
    tap(__ => {
      this.messageService.success("MESSAGE.SUCCESS_ADD_PATIENT");
      this.router.navigate(["/patients"]);
    })
  );

  @Effect({ dispatch: false })
  updatePatientSuccess$ = this.actions$.pipe(
    ofType<UpdatePatientSuccessAction>(PatientActions.UpdatePatientSuccess),
    tap(__ => {
      this.messageService.success("MESSAGE.SUCCESS_UPDATE_PATIENT");
    })
  );

  @Effect({ dispatch: false })
  deletePatientSuccess$ = this.actions$.pipe(
    ofType<DeletePatientSuccessAction>(PatientActions.DeletePatientSuccess),
    tap(__ => {
      this.messageService.success("MESSAGE.SUCCESS_DELETE_PATIENT");
      this.router.navigate(["/patients"]);
    })
  );

  @Effect()
  fetchPatients$ = this.actions$.pipe(
    ofType<FetchPatientsAction>(PatientActions.FetchPatients),
    switchMap(__ => {
      return this.patientService.search().pipe(
        switchMap((response: { patients: Patient[] }) => {
          return of(new StoreBulkPatientsAction(response.patients));
        })
      );
    })
  );
}
