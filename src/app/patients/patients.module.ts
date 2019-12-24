import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { SearchComponent } from './search/search.component';
import { PatientComponent } from './patient/patient.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [SearchComponent, PatientComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    MaterialModule,
    TranslateModule
  ]
})
export class PatientsModule { }
