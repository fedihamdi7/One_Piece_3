import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllClubsComponent } from './all-clubs/all-clubs.component';
import { AuthComponent } from './auth/auth.component';
import { ClubComponent } from './club/club.component';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { DashRespoComponent } from './dash-respo/dash-respo.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'auth',component:AuthComponent},
  {path:'',component:HomeComponent},
  {path:'responsable',component:DashRespoComponent},
  {path:'club',component:ClubComponent},
  {path:'allclubs',component:AllClubsComponent},
  {path:'admin',component:DashAdminComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
