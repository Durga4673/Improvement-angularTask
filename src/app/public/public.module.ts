import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { LandingModule } from './landing/landing.module';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from '../material-service/material.module';


@NgModule({
  declarations: [
    PublicComponent,
    UsersDashboardComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    LandingModule,
    MaterialModule
  ]
})
export class PublicModule { }
