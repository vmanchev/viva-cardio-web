import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { PatientComponent } from './patient/patient.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [{
  path: 'patients',
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: SearchComponent
  }, {
    path: 'patient',
    component: PatientComponent
  }, {
    path: 'patient/:id',
    component: PatientComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
