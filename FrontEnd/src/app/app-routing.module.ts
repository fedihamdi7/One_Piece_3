import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllClubsComponent } from './all-clubs/all-clubs.component';
import { AuthComponent } from './auth/auth.component';
import { ClubComponent } from './club/club.component';
import { AuthGuard } from './guards/auth.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsManagerGuard } from './guards/is-manager.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:'auth',component:AuthComponent},
  {path:'',component:HomeComponent},
  {path:'club',component:ClubComponent},
  {path:'club/:id',component:ClubComponent},
  {path:'allclubs',component:AllClubsComponent},
  { path: 'dash-respo', loadChildren: () => import('./dash-respo/dash-respo.module').then(m => m.DashRespoModule) ,canActivate:[AuthGuard , IsManagerGuard]},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[AuthGuard , IsAdminGuard] },
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
