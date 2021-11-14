import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashRespoRoutingModule } from './dash-respo-routing.module';
import { DashRespoComponent } from './dash-respo.component';
import { EventsComponent } from './events/events.component';


@NgModule({
  declarations: [
    DashRespoComponent,
    EventsComponent
  ],
  imports: [
    CommonModule,
    DashRespoRoutingModule
  ]
})
export class DashRespoModule { }
