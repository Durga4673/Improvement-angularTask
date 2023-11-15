import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserspageComponent } from './Employee-Dashboard/users-data.component';
import { ErrorMessagesComponent } from "../error-messages/error-messages.component";


@NgModule({
    declarations: [
        AdminComponent,
        CreateEmployeeComponent,
        UserspageComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ErrorMessagesComponent
    ]
})
export class AdminModule { }
