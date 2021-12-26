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


@NgModule({
  declarations: [
    DashRespoComponent,
    EventsComponent,
    TeamComponent,
    EventDetailsComponent,
    TeamDetailsComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    DashRespoRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashRespoModule { }
