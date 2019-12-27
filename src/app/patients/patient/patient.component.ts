import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { PatientFormService } from "../patient-form.service";
import { Store } from "@ngrx/store";
import { State } from "src/app/app-store";
import { AddPatientAction } from "../patients-store/actions";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PatientCloseModalToken } from "../patients-store/tokens";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.scss"]
})
export class PatientComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<PatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formService: PatientFormService,
    private store: Store<State>,
    @Inject(PatientCloseModalToken)
    private closeModalToken$: Observable<boolean>
  ) {}

  ngOnInit() {
    this.formService.patientForm.reset();

    this.closeModalToken$
      .pipe(takeUntil(this.destroy$))
      .subscribe(closeFlag => {
        if (closeFlag) {
          this.close();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  formHandler() {
    if (this.formService.patientForm.invalid) {
      return;
    }

    this.store.dispatch(
      new AddPatientAction(this.formService.patientForm.value)
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
