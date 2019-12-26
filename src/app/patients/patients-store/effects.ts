import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  AddPatientAction,
  PatientActions,
  AddPatientSuccessAction,
  UpdatePatientAction,
  UpdatePatientSuccessAction,
  DeletePatientAction,
  DeletePatientSuccessAction
} from "./actions";
import { switchMap, tap, map, catchError } from "rxjs/operators";
import { MessageService } from "src/app/shared/message-service/message.service";
import { Router } from "@angular/router";
import { from, of } from "rxjs";
import { PatientService } from "../patient.service";

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
        switchMap(__ => {
          return of(new AddPatientSuccessAction());
        })
      );
    })
  );

  @Effect()
  updatePatient$ = this.actions$.pipe(
    ofType<UpdatePatientAction>(PatientActions.UpdatePatient),
    switchMap(action => {
      return this.patientService.update(action.payload).pipe(
        switchMap(__ => {
          return of(new UpdatePatientSuccessAction());
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
          return of(new DeletePatientSuccessAction());
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
      this.router.navigate(["/patients"]);
    })
  );

  @Effect({ dispatch: false })
  deletePatientSuccess$ = this.actions$.pipe(
    ofType<DeletePatientSuccessAction>(PatientActions.DeletePatientSuccess),
    tap(__ => {
      this.messageService.success("MESSAGE.SUCCESS_DELETE_PATIENT");
    })
  );
}
