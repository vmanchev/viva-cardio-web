import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { State } from "src/app/app-store";
import { Store } from "@ngrx/store";
import { PatientCloseModalToken } from "../patients-store/tokens";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DeletePatientAction } from "../patients-store/actions";

@Component({
  selector: "app-confirm-delete-patient",
  templateUrl: "./confirm-delete-patient.component.html",
  styleUrls: ["./confirm-delete-patient.component.scss"]
})
export class ConfirmDeletePatientComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeletePatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<State>,
    @Inject(PatientCloseModalToken)
    private closeModalToken$: Observable<boolean>
  ) {}

  ngOnInit() {
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

  confirm() {
    this.store.dispatch(new DeletePatientAction(this.data.id));
  }

  close(): void {
    this.dialogRef.close();
  }
}
