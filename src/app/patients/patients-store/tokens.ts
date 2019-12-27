import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Patient } from "../patient.model";

export const PatientsToken = new InjectionToken<Observable<Patient[]>>(
  "Provides patients list"
);

export const PatientCloseModalToken = new InjectionToken<Observable<Patient[]>>(
  "Provides patient close modal flag"
);
