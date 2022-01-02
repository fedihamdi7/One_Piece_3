import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user/user.component';
import { UserdetailComponent } from './user/userdetail/userdetail.component';
import { ClubComponent } from './club/club.component';
import { ClubDetailsComponent } from './club/club-details/club-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestComponent } from './request/request.component';
import { MainDashAdminComponent } from './main-dash-admin/main-dash-admin.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    UserdetailComponent,
    ClubComponent,
    ClubDetailsComponent,
    RequestComponent,
    MainDashAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
