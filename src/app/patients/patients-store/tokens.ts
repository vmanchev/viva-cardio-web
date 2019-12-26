import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Patient } from "../patient.model";

export const PatientsToken = new InjectionToken<Observable<Patient[]>>(
  "Provides patients list"
);
