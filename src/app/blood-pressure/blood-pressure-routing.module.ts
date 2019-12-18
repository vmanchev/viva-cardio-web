import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ReadingComponent } from './reading/reading.component';


const routes: Routes = [{
  path: 'blood-pressure',
  children: [{
    path: '',
    component: SearchComponent
  }, {
    path: 'reading',
    component: ReadingComponent
  }, {
    path: 'reading/:id',
    component: ReadingComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloodPressureRoutingModule { }
