import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubComponent } from './club/club.component';
import { AdminComponent } from './admin.component';
import { ClubDetailsComponent } from './club/club-details/club-details.component';
import { UserComponent } from './user/user.component';
import { UserdetailComponent } from './user/userdetail/userdetail.component';
import { RequestComponent } from './request/request.component';
import { MainDashAdminComponent } from './main-dash-admin/main-dash-admin.component';


const routes: Routes = [
{path:'main-dash',component:MainDashAdminComponent},
{ path: '', component: AdminComponent },
{ path:'user', component:UserComponent},
{ path:'user/:id', component:UserdetailComponent},
{ path:'club', component:ClubComponent},
{ path:'club/:id', component:ClubDetailsComponent},
{ path:'request', component:RequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
