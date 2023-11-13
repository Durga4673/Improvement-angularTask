import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material-service/material.module';
import { UserspageComponent } from './Employee-Dashboard/users-data.component';

const routes: Routes = [
  {path: "", component: AdminComponent, children: [
    { path: '', component:UserspageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, MaterialModule]
})
export class AdminRoutingModule { }
