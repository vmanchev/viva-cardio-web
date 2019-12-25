import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ReadingComponent } from './reading/reading.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [{
  path: 'blood-pressure',
  canActivate: [AuthGuard],
  children: [{
    path: ':patientId                                                         ',
    component: SearchComponent
  }, {
    path: ':patientId/reading',
    component: ReadingComponent
  }, {
    path: ':patientId/reading/:readingId',
    component: ReadingComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloodPressureRoutingModule { }
