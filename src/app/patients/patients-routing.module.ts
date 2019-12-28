import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SearchComponent } from "./search/search.component";
import { PatientComponent } from "./patient/patient.component";
import { AuthGuard } from "../auth/auth.guard";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  {
    path: "patients",
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "patient/:id",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "patient/:id/:tab",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {}
