import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PatientsRoutingModule } from "./patients-routing.module";
import { SearchComponent } from "./search/search.component";
import { PatientComponent } from "./patient/patient.component";
import { MaterialModule } from "../material/material.module";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { StoreModule, Store } from "@ngrx/store";
import * as fromPatients from "./patients-store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { PatientEffects } from "./patients-store/effects";
import { PatientsToken } from './patients-store/tokens';
import { patientsSelector } from './patients-store/selectors';

@NgModule({
  declarations: [SearchComponent, PatientComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    StoreModule.forFeature(
      fromPatients.patientFeatureKey,
      fromPatients.patientsStateReducer
    ),
    EffectsModule.forFeature([PatientEffects])
  ],
  providers: [
    {
      provide: PatientsToken,
      useFactory: store => store.select(patientsSelector),
      deps: [Store]
    }
  ]
})
export class PatientsModule {}
