import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubComponent } from './club/club.component';
import { AdminComponent } from './admin.component';
import { ClubDetailsComponent } from './club/club-details/club-details.component';
import { UserComponent } from './user/user.component';
import { UserdetailComponent } from './user/userdetail/userdetail.component';

const routes: Routes = [
{ path: '', component: AdminComponent },
{ path:'user', component:UserComponent},
{ path:'user/:id', component:UserdetailComponent},
{ path:'club', component:ClubComponent},
{ path:'club/:id', component:ClubDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
