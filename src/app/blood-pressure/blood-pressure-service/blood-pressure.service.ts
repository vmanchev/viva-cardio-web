import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BloodPressureReading } from "../blood-pressure-reading.model";
import { environment } from "../../../environments/environment";
import { BloodPressureSearch } from "../blood-pressure-search.model";

@Injectable({
  providedIn: "root"
})
export class BloodPressureService {
  private path: string = "/blood-pressure";

  constructor(private http: HttpClient) {}

  public create(reading: BloodPressureReading) {
    return this.http.post(environment.apiUrl + this.path, reading);
  }

  public delete(id: string) {
    return this.http.delete(environment.apiUrl + this.path + "/" + id);
  }

  public search(params: BloodPressureSearch) {
    return this.http.get(environment.apiUrl + this.path + '?' + this.toQueryString(params));
  }

  private toQueryString(params: Object): string {
    return Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join("&");
  }
}
