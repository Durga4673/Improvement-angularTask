import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { LandingComponent } from './landing/landing.component';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';

const routes: Routes = [
{
  path: '',
  component: PublicComponent,
  children: [{
    path: '', component : LandingComponent
  }]
},
{
  path:'public',  component: PublicComponent,children: [
  {
  path: "", component: UsersDashboardComponent
  }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
