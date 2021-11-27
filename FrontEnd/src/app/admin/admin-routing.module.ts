import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user/user.component';
import { UserdetailComponent } from './user/userdetail/userdetail.component';

const routes: Routes = [
{ path: '', component: AdminComponent },
{ path:'user', component:UserComponent},
{ path:'user/:id', component:UserdetailComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
