import { Component, OnInit, OnDestroy, Inject, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, Observable, of } from "rxjs";
import { takeUntil, withLatestFrom, switchMap } from "rxjs/operators";
import { PatientsToken } from "../patients-store/tokens";
import { Patient } from "../patient.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  public patient: Patient;

  constructor(
    private route: ActivatedRoute,
    @Inject(PatientsToken) private patientsToken$: Observable<Patient[]>,
    private elRef:ElementRef
  ) {}

  ngOnInit() {
    // get the patientId and find the person name
    this.getCurrentPatient();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fixheight() {
    this.elRef.nativeElement.querySelector('.mat-tab-body-wrapper').style.height = '100%';
  }

  private getCurrentPatient() {
    this.patientsToken$
    .pipe(
      withLatestFrom(this.route.params),
      switchMap(([patients, params]: [Patient[], any]) => {
        return of(patients.find(patient => patient.id === params.id));
      }),
      takeUntil(this.destroy$)
    )
    .subscribe((patient: Patient) => this.patient = patient);
  }
}
