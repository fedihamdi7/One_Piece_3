import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashRespoRoutingModule } from './dash-respo-routing.module';

import { DashRespoComponent } from './dash-respo.component';
import { EventsComponent } from './events/events.component';
import { TeamComponent } from './team/team.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { TeamDetailsComponent } from './team/team-details/team-details.component';
import { LogoComponent } from './logo/logo.component';
import { MainDashComponent } from './main-dash/main-dash.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    DashRespoComponent,
    EventsComponent,
    TeamComponent,
    EventDetailsComponent,
    TeamDetailsComponent,
    LogoComponent,
    AboutComponent,
    MainDashComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    DashRespoRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashRespoModule { }
