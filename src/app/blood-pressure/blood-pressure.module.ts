import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BloodPressureRoutingModule } from "./blood-pressure-routing.module";
import { ReadingComponent } from "./reading/reading.component";
import { BloodPressureSearchComponent } from "./search/search.component";
import { MaterialModule } from "../material/material.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [ReadingComponent, BloodPressureSearchComponent],
  imports: [
    CommonModule,
    BloodPressureRoutingModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [BloodPressureSearchComponent]
})
export class BloodPressureModule {}
