import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Patient } from "./patient.model";

@Injectable({
  providedIn: "root"
})
export class PatientService {
  private path: string = "/patient";

  constructor(private http: HttpClient) {}

  public create(patient: Patient) {
    return this.http.post(environment.apiUrl + this.path, patient);
  }

  public update(patient: Patient) {
    return this.http.put(
      environment.apiUrl + this.path + "/" + patient.id,
      patient
    );
  }

  public delete(id: string) {
    return this.http.delete(environment.apiUrl + this.path + "/" + id);
  }

  public search() {
    return this.http.get(environment.apiUrl + this.path);
  }
}
