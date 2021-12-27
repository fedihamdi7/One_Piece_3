import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashRespoComponent } from './dash-respo.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventsComponent } from './events/events.component';
import { LogoComponent } from './logo/logo.component';
import { MainDashComponent } from './main-dash/main-dash.component';
import { TeamDetailsComponent } from './team/team-details/team-details.component';
import { TeamComponent } from './team/team.component';
import { AboutComponent } from './about/about.component';
const routes: Routes = [
  { path: '', component: DashRespoComponent ,children:[
    {path:'main-dash',component:MainDashComponent},
    { path:'events', component:EventsComponent},
    { path:'events/:id', component:EventDetailsComponent},
    { path :'change_logo', component:LogoComponent},
    { path :'change_about', component:AboutComponent}
  ]},
  { path:'team', component:TeamComponent},
  { path:'team/:id', component:TeamDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRespoRoutingModule { }
