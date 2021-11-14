import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashRespoComponent } from './dash-respo.component';
import { EventsComponent } from './events/events.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  { path: '', component: DashRespoComponent },
  { path:'events', component:EventsComponent},
  { path:'team', component:TeamComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRespoRoutingModule { }
