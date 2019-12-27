import { Component, OnInit, OnDestroy } from "@angular/core";
import { BloodPressureReading } from "../blood-pressure-reading.model";
import { ActivatedRoute } from "@angular/router";
import { first, takeLast, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-blood-pressure-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class BloodPressureSearchComponent implements OnInit, OnDestroy {
  patientId: number;
  private destroy$ = new Subject();

  // fake data
  readings: BloodPressureReading[] = [
    { sys: 160, dia: 85, pulse: 52, created_at: "2019-01-13T12:43:18" }
  ];

  displayedColumns: string[] = ["created_at", "sys", "dia", "pulse"];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => (this.patientId = params.patientId));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
