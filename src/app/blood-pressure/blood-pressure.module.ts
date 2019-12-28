import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BloodPressureRoutingModule } from "./blood-pressure-routing.module";
import { BloodPressureReadingComponent } from "./blood-pressure-reading/blood-pressure-reading.component";
import { BloodPressureSearchComponent } from "./blood-pressure-search/blood-pressure-search.component";
import { MaterialModule } from "../material/material.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [BloodPressureReadingComponent, BloodPressureSearchComponent],
  imports: [
    CommonModule,
    BloodPressureRoutingModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [BloodPressureSearchComponent]
})
export class BloodPressureModule {}
