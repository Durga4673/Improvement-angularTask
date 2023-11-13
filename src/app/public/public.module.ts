import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { LandingModule } from './landing/landing.module';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';


@NgModule({
  declarations: [
    PublicComponent,
    UsersDashboardComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    LandingModule
  ]
})
export class PublicModule { }
