import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloodPressureSearchComponent } from './blood-pressure-search/blood-pressure-search.component';
import { BloodPressureReadingComponent } from './blood-pressure-reading/blood-pressure-reading.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [{
  path: 'blood-pressure',
  canActivate: [AuthGuard],
  children: [{
    path: ':patientId                                                         ',
    component: BloodPressureSearchComponent
  }, {
    path: ':patientId/reading',
    component: BloodPressureReadingComponent
  }, {
    path: ':patientId/reading/:readingId',
    component: BloodPressureReadingComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloodPressureRoutingModule { }
