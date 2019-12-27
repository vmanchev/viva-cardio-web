import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { Patient } from "../patient.model";
import { PatientsToken } from "../patients-store/tokens";
import { Observable, Subject } from "rxjs";
import { takeUntil, take } from "rxjs/operators";
import { State } from "src/app/app-store";
import { Store } from "@ngrx/store";
import { FetchPatientsAction, CloseModalAction } from "../patients-store/actions";
import { MatDialog } from "@angular/material/dialog";
import { PatientComponent } from "../patient/patient.component";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  // fake data
  patients: Patient[] = [];

  displayedColumns: string[] = ["name", "actions"];

  constructor(
    public dialog: MatDialog,
    @Inject(PatientsToken) private itemsToken$: Observable<Patient[]>,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.itemsToken$
      .pipe(takeUntil(this.destroy$))
      .subscribe((patients: Patient[]) => {
        if (!patients.length) {
          this.store.dispatch(new FetchPatientsAction());
        } else {
          this.patients = patients;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addNewPatientDialog(): void {
    this.store.dispatch(new CloseModalAction(false));
    const dialogRef = this.dialog.open(PatientComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
    });
  }
}
