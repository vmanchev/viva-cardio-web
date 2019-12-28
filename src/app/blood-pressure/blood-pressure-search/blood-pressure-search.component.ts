import { Component, OnInit, OnDestroy } from "@angular/core";
import { BloodPressureReading } from "../blood-pressure-reading.model";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { BloodPressureService } from "../blood-pressure-service/blood-pressure.service";

@Component({
  selector: "app-blood-pressure-search",
  templateUrl: "./blood-pressure-search.component.html",
  styleUrls: ["./blood-pressure-search.component.scss"]
})
export class BloodPressureSearchComponent implements OnInit, OnDestroy {
  patientId: number;
  private destroy$ = new Subject();

  // fake data
  readings: BloodPressureReading[] = [];

  displayedColumns: string[] = ["created_at", "sys", "dia", "pulse"];

  constructor(
    private route: ActivatedRoute,
    private bloodPressureService: BloodPressureService
  ) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.patientId = params.id;
      this.search();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private search() {
    this.bloodPressureService
      .search({
        patientId: this.patientId
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (results: { items: BloodPressureReading[] }) =>
          (this.readings = results.items.length ? results.items : [])
      );
  }
}
