import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashRespoComponent } from './dash-respo.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventsComponent } from './events/events.component';
import { TeamDetailsComponent } from './team/team-details/team-details.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  { path: '', component: DashRespoComponent },
  { path:'events', component:EventsComponent},
  { path:'events/:id', component:EventDetailsComponent},
  { path:'team', component:TeamComponent},
  { path:'team/:id', component:TeamDetailsComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRespoRoutingModule { }
